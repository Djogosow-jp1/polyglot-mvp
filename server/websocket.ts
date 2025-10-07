import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';

interface TwilioMediaMessage {
  event: string;
  streamSid?: string;
  media?: {
    payload: string;
    timestamp?: string;
  };
  start?: {
    streamSid: string;
    accountSid: string;
    callSid: string;
    tracks: string[];
    mediaFormat: {
      encoding: string;
      sampleRate: number;
      channels: number;
    };
  };
}

interface ClientInfo {
  streamSid: string;
  callSid: string;
  audioBuffer: Buffer[];
}

const WS_PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;

export function startWebSocketServer() {
  const wss = new WebSocketServer({ port: WS_PORT });

  console.log(`WebSocket server started on port ${WS_PORT}`);

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    const clientInfo: ClientInfo = {
      streamSid: '',
      callSid: '',
      audioBuffer: [],
    };

    ws.on('message', async (message: Buffer) => {
      try {
        const data: TwilioMediaMessage = JSON.parse(message.toString());

        switch (data.event) {
          case 'connected':
            console.log('Twilio connected event received');
            break;

          case 'start':
            if (data.start) {
              clientInfo.streamSid = data.start.streamSid;
              clientInfo.callSid = data.start.callSid;
              console.log(`Stream started: ${clientInfo.streamSid}`);
              console.log(`Media format: ${JSON.stringify(data.start.mediaFormat)}`);
            }
            break;

          case 'media':
            if (data.media && data.media.payload) {
              // Receive audio data from Twilio (base64-encoded μ-law)
              const audioChunk = Buffer.from(data.media.payload, 'base64');
              clientInfo.audioBuffer.push(audioChunk);

              // TODO: Implement real-time audio processing
              // 1. Accumulate audio chunks until speech pause detected
              // 2. Convert μ-law to PCM/WAV format
              // 3. Send to Whisper for transcription
              // 4. Process through GPT for cleaning (optional)
              // 5. Translate with DeepL
              // 6. Generate TTS with ElevenLabs
              // 7. Convert back to μ-law and stream to Twilio
            }
            break;

          case 'stop':
            console.log(`Stream stopped: ${clientInfo.streamSid}`);
            // Process any remaining audio in buffer
            if (clientInfo.audioBuffer.length > 0) {
              console.log(`Processing ${clientInfo.audioBuffer.length} audio chunks`);
              // TODO: Final processing of accumulated audio
              clientInfo.audioBuffer = [];
            }
            break;

          default:
            console.log(`Unknown event: ${data.event}`);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return wss;
}

// Helper function to send audio back to Twilio
export function sendAudioToTwilio(ws: WebSocket, audioPayload: string, streamSid: string) {
  const mediaMessage = {
    event: 'media',
    streamSid: streamSid,
    media: {
      payload: audioPayload, // base64-encoded μ-law audio
    },
  };
  ws.send(JSON.stringify(mediaMessage));
}

// Start the server if this file is run directly
if (require.main === module) {
  startWebSocketServer();
}
