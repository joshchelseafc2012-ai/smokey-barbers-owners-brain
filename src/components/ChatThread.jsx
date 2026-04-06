import '../styles/ChatThread.css'

export default function ChatThread({ messages, isLoading, onQuickAction }) {
  const prompts = [
    { icon: '📊', title: 'Unit Economics', desc: 'Understand your profitability model' },
    { icon: '📈', title: 'Growth Strategy', desc: 'How to expand locations' },
    { icon: '💰', title: 'Pricing Strategy', desc: 'Optimize your pricing' },
    { icon: '📢', title: 'Marketing', desc: 'Brand positioning & growth' },
    { icon: '⚙️', title: 'Operations', desc: 'Efficiency & bottlenecks' },
    { icon: '👥', title: 'Team Management', desc: 'Compensation & retention' }
  ]

  const promptTexts = {
    'Unit Economics': 'Walk me through the unit economics for a Smokey location. What are the key levers for profitability?',
    'Growth Strategy': 'What\'s the best strategy for opening a new Smokey location? Site selection, staffing, launch timeline?',
    'Pricing Strategy': 'Should we increase prices at any of our locations? What\'s the right pricing strategy for Smokey?',
    'Marketing': 'How should we position Smokey Barbers in the market? What\'s our brand story and marketing strategy?',
    'Operations': 'What\'s the biggest operational bottleneck limiting our growth? How do we fix it?',
    'Team Management': 'How should I think about barber compensation and retention? What\'s competitive?'
  }

  if (messages.length === 0) {
    return (
      <div className="chat-thread welcome">
        <div className="welcome-logo">⚜</div>
        <h2 className="welcome-title">Owner Brain</h2>
        <p className="welcome-sub">
          Your strategic thinking partner for Smokey Barbers. Ask about growth, profitability, operations, or anything else.
        </p>
        <div className="prompt-grid">
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-card"
              onClick={() => onQuickAction(promptTexts[prompt.title])}
            >
              <div className="pc-icon">{prompt.icon}</div>
              <div className="pc-title">{prompt.title}</div>
              <div className="pc-desc">{prompt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="chat-thread">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message-${msg.role}`}>
          <div className="msg-label">{msg.role === 'user' ? 'You' : 'Owner Brain'}</div>
          <div className="message-content">
            {msg.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="message message-assistant">
          <div className="msg-label">Owner Brain</div>
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
}
