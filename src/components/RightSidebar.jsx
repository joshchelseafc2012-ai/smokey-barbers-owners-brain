import '../styles/RightSidebar.css'

export default function RightSidebar() {
  return (
    <div className="sidebar-right">
      <div className="ctx-section">
        <div className="ctx-section-title">Session Context</div>
        <div className="ctx-card">
          <div className="ctx-card-title">Current Focus</div>
          <div className="ctx-card-body">Business strategy decisions for growth and profitability.</div>
        </div>
      </div>

      <div className="ctx-section">
        <div className="ctx-section-title">Quick Notes</div>
        <div className="priority-list">
          <div className="priority-item">
            <span className="priority-dot p-high"></span>
            <div className="priority-text"><strong>Unit economics</strong> — understand your numbers</div>
          </div>
          <div className="priority-item">
            <span className="priority-dot p-med"></span>
            <div className="priority-text"><strong>Scaling strategy</strong> — how to expand</div>
          </div>
          <div className="priority-item">
            <span className="priority-dot p-low"></span>
            <div className="priority-text"><strong>Operations</strong> — day-to-day efficiency</div>
          </div>
        </div>
      </div>
    </div>
  )
}
