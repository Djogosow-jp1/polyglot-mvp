# Polyglot MVP

A multilingual application platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 with TypeScript
- 🎨 Tailwind CSS for styling
- 📝 ESLint and Prettier for code quality
- 🔌 WebSocket server support
- 🌐 API routes for backend functionality
- 📱 Responsive design

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WebSocket Server
WS_PORT=8080

# API Configuration
API_SECRET=your-secret-key-here
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
polyglot-mvp/
├── pages/
│   ├── _app.tsx          # App wrapper with global styles
│   ├── index.tsx         # Landing page
│   ├── dashboard.tsx     # Dashboard page
│   ├── settings.tsx      # Settings page
│   └── api/              # API routes
│       ├── settings.ts   # Settings API endpoint
│       └── process.ts    # Process API endpoint
├── styles/
│   └── globals.css       # Global styles with Tailwind
├── server/
│   └── websocket.ts      # WebSocket server
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Routes

### GET /api/settings
Retrieve application settings

### POST /api/settings
Update application settings

### POST /api/process
Process data through the application

## WebSocket Server

The WebSocket server runs on port 8080 (configurable via `WS_PORT` environment variable) and handles real-time communication.

## License

MIT
