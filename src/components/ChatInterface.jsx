import { useState, useRef, useEffect } from 'react'
import TopBar from './TopBar'
import ChatThread from './ChatThread'
import Sidebar from './Sidebar'
import MessageInput from './MessageInput'
import '../styles/ChatInterface.css'

export default function ChatInterface({ user, onLogout }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Welcome to Owner Brain. I\'m here to help you make sharp business decisions for Smokey Barbers.\n\nWhat\'s on your mind? Growth strategy, unit economics, operational challenges, or something else?',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setError('')
    setIsLoading(true)

    try {
      // Send to API
      const response = await fetch('/api/owner-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      // Handle streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line)
              if (data.type === 'text') {
                assistantMessage.content += data.content
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { ...assistantMessage }
                  return updated
                })
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (err) {
      setError('Failed to get response. Check the API connection.')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action)
  }

  return (
    <div className="chat-interface">
      <TopBar user={user} onLogout={onLogout} />

      <div className="main-content">
        <Sidebar onQuickAction={handleQuickAction} />

        <div className="chat-area">
          <ChatThread messages={messages} isLoading={isLoading} />
          <div ref={messagesEndRef} />

          {error && <div className="error-banner">{error}</div>}

          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask me about strategy, operations, finance, marketing, or anything else..."
          />
        </div>
      </div>
    </div>
  )
}
