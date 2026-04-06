import '../styles/ChatThread.css'

export default function ChatThread({ messages, isLoading }) {
  return (
    <div className="chat-thread">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message-${msg.role}`}>
          <div className="message-content">
            {msg.content}
          </div>
          {msg.role === 'assistant' && msg.content && (
            <div className="message-indicator">Next move: ...</div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="message message-assistant loading">
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
