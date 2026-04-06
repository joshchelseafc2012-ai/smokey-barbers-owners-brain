import '../styles/Sidebar.css'

export default function Sidebar({ onQuickAction }) {
  const quickActions = [
    {
      id: 1,
      label: 'Unit Economics',
      prompt: 'Walk me through the unit economics for a Smokey location. What are the key levers for profitability?'
    },
    {
      id: 2,
      label: 'Growth Strategy',
      prompt: 'What\'s the best strategy for opening a new Smokey location? Site selection, staffing, launch timeline?'
    },
    {
      id: 3,
      label: 'Pricing Strategy',
      prompt: 'Should we increase prices at any of our locations? What\'s the right pricing strategy for Smokey?'
    },
    {
      id: 4,
      label: 'Marketing',
      prompt: 'How should we position Smokey Barbers in the market? What\'s our brand story and marketing strategy?'
    },
    {
      id: 5,
      label: 'Operations',
      prompt: 'What\'s the biggest operational bottleneck limiting our growth? How do we fix it?'
    },
    {
      id: 6,
      label: 'Staff Management',
      prompt: 'How should I think about barber compensation and retention? What\'s competitive?'
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Quick Actions</h3>
      </div>

      <div className="quick-actions">
        {quickActions.map(action => (
          <button
            key={action.id}
            className="action-btn"
            onClick={() => onQuickAction(action.prompt)}
            title={action.prompt}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <p className="help-text">Tap any button to start a conversation.</p>
      </div>
    </div>
  )
}
