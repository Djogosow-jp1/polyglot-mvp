# Polyglot MVP

A multilingual application platform built with Next.js, TypeScript, and Tailwind CSS. Features real-time audio transcription, translation, and text-to-speech synthesis.

## Features

- 🚀 Next.js 14 with TypeScript
- 🎨 Tailwind CSS for styling
- 📝 ESLint and Prettier for code quality
- 🔌 WebSocket server support for Twilio call streaming
- 🌐 API routes for backend functionality
- 📱 Responsive design
- 🎤 Audio transcription with Whisper (OpenAI or Hugging Face)
- 🧹 Transcript cleaning with GPT (optional)
- 🌍 Translation with DeepL
- 🔊 Text-to-speech with ElevenLabs

## Prerequisites

- Node.js 18+
- npm or yarn
- API keys (see API Key Setup section)

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

## API Key Setup

The application requires API keys for various services. Configure these through the `/api/settings` endpoint or the settings UI.

### Required API Keys

#### 1. Whisper (Transcription) - Choose one:
- **OpenAI API Key** (Recommended)
  - Get it at: https://platform.openai.com/api-keys
  - Model used: `whisper-1`
  - Best accuracy and speed

- **Hugging Face API Key** (Fallback)
  - Get it at: https://huggingface.co/settings/tokens
  - Model used: `openai/whisper-large-v3`
  - Free tier available

#### 2. GPT (Optional - Transcript Cleaning)
- **OpenAI API Key**
  - Same key as Whisper if using OpenAI
  - Model used: `gpt-3.5-turbo`
  - Cleans transcripts by removing filler words and fixing grammar

#### 3. DeepL (Translation) - Required
- **DeepL API Key**
  - Get it at: https://www.deepl.com/pro-api
  - Free tier: 500,000 characters/month
  - Supports 30+ languages

#### 4. ElevenLabs (Text-to-Speech) - Required
- **ElevenLabs API Key**
  - Get it at: https://elevenlabs.io/
  - Free tier: 10,000 characters/month
  - High-quality voice synthesis

### Setting API Keys

**Option 1: Via API**

```bash
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "openaiKey": "sk-...",
    "huggingFaceKey": "hf_...",
    "deeplKey": "...",
    "elevenLabsKey": "..."
  }'
```

**Option 2: Via Settings UI**

Navigate to `/settings` in the application and enter your API keys.

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
│       └── process.ts    # Audio processing endpoint
├── server/
│   └── websocket.ts      # WebSocket server for Twilio
├── styles/
│   └── globals.css       # Global styles with Tailwind
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

Retrieve application settings with masked API keys.

**Response:**
```json
{
  "success": true,
  "openaiKey": "sk-1***abc",
  "huggingFaceKey": "hf_1***xyz",
  "deeplKey": "abc1***xyz",
  "elevenLabsKey": "def1***uvw"
}
```

### POST /api/settings

Update application settings and API keys.

**Request Body:**
```json
{
  "openaiKey": "sk-...",
  "huggingFaceKey": "hf_...",
  "deeplKey": "...",
  "elevenLabsKey": "..."
}
```

### POST /api/process

Process audio through the full pipeline: transcribe → clean → translate → synthesize.

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `audio`: Audio file (WAV, MP3, etc.)
  - `targetLang`: Target language code (e.g., "EN", "ES", "FR")

**Response:**
```json
{
  "success": true,
  "transcript": "Hello, how are you?",
  "cleaned": "Hello, how are you?",
  "translated_text": "Hola, ¿cómo estás?",
  "tts_url": "data:audio/mpeg;base64,..."
}
```

## Testing the Audio Processing Pipeline

### Test 1: Using cURL

```bash
# First, set your API keys
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "openaiKey": "your-openai-key",
    "deeplKey": "your-deepl-key",
    "elevenLabsKey": "your-elevenlabs-key"
  }'

# Then process an audio file
curl -X POST http://localhost:3000/api/process \
  -F "audio=@/path/to/your/audio.wav" \
  -F "targetLang=ES"
```

### Test 2: Using JavaScript

```javascript
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('targetLang', 'ES');

const response = await fetch('http://localhost:3000/api/process', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result);
```

### Test 3: Using the Dashboard UI

1. Navigate to `/dashboard`
2. Upload an audio file
3. Select target language
4. Click "Process"
5. View transcription, translation, and play synthesized audio

## WebSocket Server for Twilio

The WebSocket server handles real-time audio streaming from Twilio calls.

### Starting the WebSocket Server

```bash
node server/websocket.ts
```

### Twilio Configuration

Configure your Twilio phone number to stream audio to:

```
wss://your-domain.com:8080
```

### WebSocket Event Flow

1. **connected** - Connection established
2. **start** - Stream metadata received
3. **media** - Audio chunks received (base64 μ-law)
4. **stop** - Stream ended

## Supported Languages

### DeepL Translation

**Source Languages:** Auto-detect, BG, CS, DA, DE, EL, EN, ES, ET, FI, FR, HU, ID, IT, JA, KO, LT, LV, NB, NL, PL, PT, RO, RU, SK, SL, SV, TR, UK, ZH

**Target Languages:** BG, CS, DA, DE, EL, EN-GB, EN-US, ES, ET, FI, FR, HU, ID, IT, JA, KO, LT, LV, NB, NL, PL, PT-BR, PT-PT, RO, RU, SK, SL, SV, TR, UK, ZH

## Security Notes

⚠️ **Important:** The current implementation stores API keys in memory. For production:

1. Use environment variables or a secure key management system
2. Encrypt API keys in database storage
3. Implement proper authentication and authorization
4. Use HTTPS for all API communications
5. Rate limit API endpoints
6. Sanitize all user inputs

## Troubleshooting

### "No Whisper API key configured"
- Ensure you've set either `openaiKey` or `huggingFaceKey` via `/api/settings`

### "DeepL API key not configured"
- Set your DeepL API key via `/api/settings`
- Verify the key is valid at https://www.deepl.com/account/summary

### "ElevenLabs API key not configured"
- Set your ElevenLabs API key via `/api/settings`
- Check your quota at https://elevenlabs.io/

### Audio transcription fails
- Ensure audio file is in a supported format (WAV, MP3, M4A, etc.)
- Check file size (OpenAI Whisper limit: 25MB)
- Verify API key has sufficient credits

### Translation returns empty
- Check target language code is valid (use uppercase: "EN", "ES", etc.)
- Ensure source text is not empty
- Verify DeepL API quota

## License

MIT
