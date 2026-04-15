import type { APIContext } from 'astro'
import { SITE, TAP_LIST, EVENTS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a craft brewery and taproom in Greenville, SC.

BUSINESS INFO:
- Address: ${SITE.address}
- Phone: ${SITE.phone}
- Hours: Tue-Wed 4pm-10pm, Thu 4pm-11pm, Fri 2pm-12am, Sat 12pm-12am, Sun 12pm-8pm, Mon Closed
- Dogs welcome on patio. Kids welcome until 8pm.
- Private events: capacity 80 seated, 120 standing. Email ${SITE.email} or use the form on our website.

CURRENT TAP LIST:
${TAP_LIST.map(b => `- ${b.name} (${b.style}, ${b.abv})${b.status === 'low' ? ' — LAST KEG' : ''}`).join('\n')}

UPCOMING EVENTS:
${EVENTS.map(e => `- ${e.name}: ${e.day} at ${e.time} — ${e.description}`).join('\n')}

MERCH: Logo Tee $28, Snapback Hat $32, Pint Glass $12, Pullover Hoodie $48. Available in taproom. Online ordering coming soon.

RULES:
- Be friendly, casual, and knowledgeable about craft beer
- Keep answers concise (2-3 sentences max)
- If asked about food: "We don't have a kitchen, but we have a rotating food truck schedule — usually a truck on Thu-Sun. Check our events for this week's lineup."
- If asked about something you don't know: "I'm not sure about that — give us a call at ${SITE.phone} or email ${SITE.email} and we'll help you out."
- Never make up information about beers, events, or policies
- For private event inquiries, direct them to the booking form on the website`

export async function POST({ request, locals }: APIContext) {
  try {
    const body = await request.json()
    const message = body.message || ''
    const history: Array<{role: string; content: string}> = body.history || []
    if (!message) {
      return Response.json({ reply: 'What can I help you with?' })
    }

    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY

    if (!apiKey) {
      // Fallback: keyword-based responses when API key not configured
      const lower = message.toLowerCase()
      if (lower.includes('tap') || lower.includes('beer') || lower.includes('ipa') || lower.includes('stout')) {
        return Response.json({ reply: `We've got ${TAP_LIST.length} beers on tap right now! Highlights: ${TAP_LIST[0].name} (${TAP_LIST[0].style}, ${TAP_LIST[0].abv}) and ${TAP_LIST[4].name} (${TAP_LIST[4].style}, ${TAP_LIST[4].abv}). Come taste them!` })
      }
      if (lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
        return Response.json({ reply: 'We\'re open Tue-Wed 4-10pm, Thu 4-11pm, Fri 2pm-12am, Sat 12pm-12am, Sun 12pm-8pm. Closed Mondays.' })
      }
      if (lower.includes('event') || lower.includes('trivia') || lower.includes('music') || lower.includes('live')) {
        return Response.json({ reply: 'Trivia every Thursday at 7pm, live music Fri & Sat at 8pm, and Sunday Brunch & Brews at noon. Plus we\'ve got a Midnight Express release on April 26!' })
      }
      if (lower.includes('private') || lower.includes('book') || lower.includes('party') || lower.includes('rent')) {
        return Response.json({ reply: 'We host private events! 80 seated, 120 standing. Fill out the booking form on our website or email us at ' + SITE.email })
      }
      if (lower.includes('food') || lower.includes('eat') || lower.includes('kitchen')) {
        return Response.json({ reply: 'We don\'t have a kitchen, but we have rotating food trucks Thu-Sun. Check our events section for this week\'s lineup!' })
      }
      if (lower.includes('merch') || lower.includes('shirt') || lower.includes('hat') || lower.includes('glass')) {
        return Response.json({ reply: 'We\'ve got Logo Tees ($28), Snapback Hats ($32), Pint Glasses ($12), and Hoodies ($48). Available in the taproom!' })
      }
      return Response.json({ reply: `Hey! I can help with what's on tap, our hours, events, or booking the taproom. What would you like to know?` })
    }

    // Live Anthropic API call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: SYSTEM_PROMPT,
        messages: [...history.slice(-18).map((h: {role: string; content: string}) => ({ role: h.role, content: h.content })), { role: 'user', content: message }],
      }),
    })

    const data = await response.json() as { content?: { text: string }[] }
    const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t process that. Try asking about our tap list or events!'

    return Response.json({ reply })
  } catch {
    return Response.json({ reply: 'Something went wrong. Give us a call at ' + SITE.phone + '!' })
  }
}
