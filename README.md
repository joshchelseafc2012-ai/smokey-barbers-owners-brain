# Smokey Barbers — Owner Brain

Strategic AI assistant for Smokey Barbers business owner. Chat interface for real-time business decisions on strategy, operations, finance, marketing, and growth.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Netlify Functions
- **AI**: Claude API (Anthropic)
- **Hosting**: Netlify

## Local Development

### Prerequisites
- Node.js 18+
- Netlify CLI (`npm install -g netlify-cli`)
- Anthropic API key

### Setup

1. **Clone the repo and install dependencies:**
```bash
cd smokey-barbers-owner-brain
npm install
```

2. **Create `.env` file with API key:**
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

3. **Run locally:**
```bash
npm run dev
```

Visit `http://localhost:3000` and login with:
- Email: `owner@smokey.com`
- Password: `demo123`

The Vite dev server will auto-proxy API calls to Netlify Functions running on `localhost:9999`.

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder, ready for Netlify deployment.

## Deployment to Netlify

### Option 1: Connect GitHub (Recommended)

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repo
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Add environment variable `ANTHROPIC_API_KEY`
8. Deploy

### Option 2: Manual Deploy

```bash
netlify deploy --prod
```

## Project Structure

```
src/
├── components/
│   ├── LoginScreen.jsx       # Owner login form
│   ├── ChatInterface.jsx     # Main chat interface
│   ├── TopBar.jsx           # Header with logout
│   ├── Sidebar.jsx          # Quick action buttons
│   ├── ChatThread.jsx       # Message display
│   └── MessageInput.jsx     # Text input field
├── styles/
│   ├── main.css            # Global styles & color scheme
│   ├── LoginScreen.css
│   ├── ChatInterface.css
│   ├── TopBar.css
│   ├── Sidebar.css
│   ├── ChatThread.css
│   └── MessageInput.css
└── App.jsx                 # Main app component

netlify/functions/
└── owner-chat.js          # Chat API endpoint

index.html                 # Entry point
vite.config.js            # Vite configuration
netlify.toml              # Netlify deployment config
```

## Features

- **Secure Login**: Simple owner authentication
- **Streaming Chat**: Real-time message streaming from Claude
- **Quick Actions**: Sidebar buttons for common business topics
- **Conversation Memory**: Full chat history within session
- **Responsive Design**: Dark theme with gold accents (Smokey brand)
- **Netlify Functions**: Serverless backend for API calls

## Owner Brain Capabilities

The Owner Brain is an expert on:
- **Unit Economics**: Revenue drivers, margins, profitability analysis
- **Growth Strategy**: Expansion, site selection, new locations
- **Pricing**: Price strategy, upsells, margins optimization
- **Operations**: Efficiency, labor productivity, scheduling
- **Finance**: KPIs, cash flow, EBITDA, ROI
- **Marketing**: Brand positioning, customer acquisition
- **Team Management**: Compensation, retention, hiring

Responses always end with **"Next move:"** — one specific action to take this week.

## Environment Variables

- `ANTHROPIC_API_KEY` - Your Claude API key (required for Netlify Functions)

## Styling

The app uses a consistent Smokey brand dark theme:
- **Primary Color**: `#C9A84C` (Gold)
- **Background**: `#070707` (Void black)
- **Surface**: `#0f0f0f` (Dark gray)
- **Font**: Bebas Neue (headings), Barlow (body)

## License

Internal use only — Smokey Barbers
