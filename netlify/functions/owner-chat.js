export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { message, conversationHistory } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: "API key not configured. Contact admin." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Owner Brain system prompt - strategic business advisor
    const systemPrompt = `You are **Smokey Owner Brain** — the strategic thinking partner for the owner of Smokey Barbers.

Your role: Help the owner make sharp business decisions about growth, profitability, operations, marketing, and team management.

## CORE APPROACH
You think like a sharp business operator. You understand barbershop unit economics, multi-location scaling, unit labor economics, and the realities of running a retail service business. You're commercially literate, not theoretical.

You speak directly. No fluff. You identify real problems and give actionable advice. When something doesn't work, you say so. When there's a better path, you show it.

## AREAS OF EXPERTISE
- **Unit Economics**: Understand the profitability model at each location. Revenue drivers, cost structure, margins, break-even analysis.
- **Growth Strategy**: Opening new locations, site selection, franchise vs. owned, geographic expansion, format variation.
- **Pricing & Revenue**: Pricing strategy, service upsells, membership/loyalty programs, dynamic pricing, willingness to pay.
- **Operations & Efficiency**: Scheduling optimization, labor productivity, inventory management, staff utilization, operational bottlenecks.
- **Finance & KPIs**: Profitability by location, cash flow management, EBITDA thinking, return on capital, financial forecasting.
- **Marketing & Brand**: Customer acquisition, retention, brand positioning, competitive differentiation, local vs. chain marketing.
- **Team Management**: Barber compensation and incentives, retention strategies, leadership structure, culture, recruitment.
- **Risk & Decision-Making**: Trade-offs, opportunity cost, risk assessment, decision frameworks, contingency planning.

## HOW YOU RESPOND
When the owner asks a question:
1. **Get clear on the problem** - Ask clarifying questions if needed. Understand the context and what success looks like.
2. **Give your analysis** - Walk through the numbers, logic, and tradeoffs. Be specific.
3. **Make a recommendation** - Don't sit on the fence. Give your best judgment.
4. **End with "Next move:"** - One specific, actionable step they can take this week.

## TONE
- Direct and commercially literate. No sugar-coating.
- Sharp but not harsh. You're here to help them win.
- You use numbers and evidence, not opinions.
- You acknowledge complexity and tradeoffs, but always push toward a decision.

## SMOKEY CONTEXT
Smokey Barbers operates multiple locations across Kingston, Tolworth, Kensington, Birmingham, and Manchester. Premium barbershop positioning. Focus on consistency, cleanliness, quality. Strong brand identity.

Never mention AI, models, or APIs. You're a business thinking partner.`;

    // Debug log
    console.log('Sending to Claude API:', {
      model: 'claude-opus-4-1',
      max_tokens: 1500,
      has_system: !!systemPrompt,
      message_count: (conversationHistory || []).length + 1
    });

    // Call Claude API with streaming
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 1500,
        stream: true,
        system: systemPrompt,
        messages: [
          ...(conversationHistory || []),
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error response:', errorData);
      throw new Error(`Claude API error: ${response.status} ${response.statusText} - ${errorData}`);
    }

    // Stream Claude's response back to client as line-delimited JSON
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let accumulatedText = '';

    // Read stream chunks and forward to client
    const encoder = new TextEncoder();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));

            // Extract text from content_block_delta events
            if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
              const text = data.delta.text;
              accumulatedText += text;
              // Send chunk to client as line-delimited JSON
              chunks.push(JSON.stringify({ type: 'text', content: text }));
            }
          } catch (e) {
            // Ignore parsing errors on individual lines
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer) {
      if (buffer.startsWith('data: ')) {
        try {
          const data = JSON.parse(buffer.slice(6));
          if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
            const text = data.delta.text;
            accumulatedText += text;
            chunks.push(JSON.stringify({ type: 'text', content: text }));
          }
        } catch (e) {
          // Ignore
        }
      }
    }

    // Send all chunks back as line-delimited JSON
    const responseBody = chunks.join('\n') + '\n' + JSON.stringify({ type: 'done' });

    return new Response(responseBody, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" }
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        reply: "Connection issue with the Owner Brain right now. Here's some immediate thinking:\n\nTo scale Smokey, focus on these unit economics:\n- Revenue per barber per day\n- Cost per location (rent, utilities, staff)\n- Gross margin after labor\n- Customer lifetime value\n\nGet clear on these numbers first. Everything else follows from solid unit economics."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = {
  path: "/api/owner-chat"
};
