const TOTAL_KEY = 'portfolio:visitors:total'
const COUNTRY_KEY = 'portfolio:visitors:countries'

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

async function redis(commands, endpoint = 'pipeline') {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url) {
    throw new Error('UPSTASH_REDIS_REST_URL is missing')
  }

  if (!token) {
    throw new Error('UPSTASH_REDIS_REST_TOKEN is missing')
  }

  const response = await fetch(`${url.replace(/\/$/, '')}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Upstash HTTP ${response.status}: ${result?.error ?? JSON.stringify(result)}`)
  }

  // /multi-exec may return a single error object
  if (!Array.isArray(result)) {
    if (result?.error) {
      throw new Error(`Upstash: ${result.error}`)
    }

    throw new Error(`Unexpected Upstash response: ${JSON.stringify(result)}`)
  }

  const failed = result.find((item) => item?.error)

  if (failed) {
    throw new Error(`Upstash: ${failed.error}`)
  }

  return result.map((item) => item.result)
}

function countryName(code) {
  if (code === 'XX') return 'Unknown'

  try {
    return (
      new Intl.DisplayNames(['en'], {
        type: 'region',
      }).of(code) || code
    )
  } catch {
    return code
  }
}

function shapeAnalytics(total, countryHash) {
  const countries = []

  for (let i = 0; i < (countryHash?.length ?? 0); i += 2) {
    const code = countryHash[i]

    countries.push({
      code,
      name: countryName(code),
      visits: Number(countryHash[i + 1] ?? 0),
    })
  }

  countries.sort((a, b) => b.visits - a.visits)

  return {
    total: Number(total ?? 0),
    countries: countries.slice(0, 6),
  }
}

function isLikelyBot(request) {
  const userAgent = request.headers.get('user-agent') || ''

  return (
    !userAgent ||
    /bot|crawler|spider|slurp|bingpreview|googleother|lighthouse|headlesschrome|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|uptimerobot|pingdom/i.test(
      userAgent,
    )
  )
}

async function readAnalytics() {
  const [total, countries] = await redis([
    ['GET', TOTAL_KEY],
    ['HGETALL', COUNTRY_KEY],
  ])

  return shapeAnalytics(total, countries)
}

export default async (request, context) => {
  if (!['GET', 'POST'].includes(request.method)) {
    return json({ error: 'Method not allowed' }, 405)
  }

  try {
    if (request.method === 'POST' && !isLikelyBot(request)) {
      const countryCode = context.geo?.country?.code?.toUpperCase() || 'XX'

      const [total, , countries] = await redis(
        [
          ['INCR', TOTAL_KEY],
          ['HINCRBY', COUNTRY_KEY, countryCode, 1],
          ['HGETALL', COUNTRY_KEY],
        ],
        'multi-exec',
      )

      return json(shapeAnalytics(total, countries))
    }

    return json(await readAnalytics())
  } catch (error) {
    console.error('Visitor analytics failed:', error)

    return json(
      {
        error: 'Visitor analytics unavailable',
      },
      503,
    )
  }
}

export const config = {
  path: '/api/visitors',
}
