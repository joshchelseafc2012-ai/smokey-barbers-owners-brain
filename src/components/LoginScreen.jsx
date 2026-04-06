import { useState } from 'react'
import '../styles/LoginScreen.css'

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simple owner authentication
    if (email === 'owner@smokey.com' && password === 'demo123') {
      setTimeout(() => {
        onLogin({ email, name: 'Owner' })
        setIsLoading(false)
      }, 500)
    } else {
      setError('Invalid credentials. Use owner@smokey.com / demo123')
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="login-header">
          <h1>Smokey Barbers</h1>
          <p className="subtitle">Owner Brain</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@smokey.com"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Signing in...' : 'Access Owner Brain'}
          </button>
        </form>

        <div className="login-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: <code>owner@smokey.com</code></p>
          <p>Password: <code>demo123</code></p>
        </div>
      </div>
    </div>
  )
}
