import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import { getApiKeys } from './settings';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessResponse = {
  success: boolean;
  transcript?: string;
  cleaned?: string;
  translated_text?: string;
  tts_url?: string;
  message?: string;
};

// Transcribe audio using Whisper (OpenAI or Hugging Face)
async function transcribeAudio(audioPath: string, apiKeys: any): Promise<string> {
  try {
    // Try OpenAI Whisper first if key is available
    if (apiKeys.openaiKey) {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(audioPath));
      formData.append('model', 'whisper-1');

      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${apiKeys.openaiKey}`,
          },
        }
      );
      return response.data.text;
    }
    // Fallback to Hugging Face Whisper if available
    else if (apiKeys.huggingFaceKey) {
      const audioBuffer = fs.readFileSync(audioPath);
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/openai/whisper-large-v3',
        audioBuffer,
        {
          headers: {
            Authorization: `Bearer ${apiKeys.huggingFaceKey}`,
            'Content-Type': 'audio/wav',
          },
        }
      );
      return response.data.text;
    } else {
      throw new Error('No Whisper API key configured');
    }
  } catch (error: any) {
    console.error('Transcription error:', error.response?.data || error.message);
    throw new Error(`Transcription failed: ${error.message}`);
  }
}

// Clean transcript with GPT (optional)
async function cleanTranscript(transcript: string, apiKeys: any): Promise<string> {
  if (!apiKeys.openaiKey) {
    return transcript; // Skip cleaning if no OpenAI key
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a transcript cleaning assistant. Remove filler words, fix grammar, and improve clarity while maintaining the original meaning.',
          },
          {
            role: 'user',
            content: `Clean this transcript: ${transcript}`,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKeys.openaiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Cleaning error:', error.response?.data || error.message);
    return transcript; // Return original if cleaning fails
  }
}

// Translate text using DeepL
async function translateText(
  text: string,
  targetLang: string,
  apiKeys: any
): Promise<string> {
  if (!apiKeys.deeplKey) {
    throw new Error('DeepL API key not configured');
  }

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      new URLSearchParams({
        auth_key: apiKeys.deeplKey,
        text: text,
        target_lang: targetLang.toUpperCase(),
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.translations[0].text;
  } catch (error: any) {
    console.error('Translation error:', error.response?.data || error.message);
    throw new Error(`Translation failed: ${error.message}`);
  }
}

// Synthesize speech using ElevenLabs
async function synthesizeSpeech(text: string, apiKeys: any): Promise<string> {
  if (!apiKeys.elevenLabsKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  try {
    // Using a default voice ID - users should configure their preferred voice
    const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          'xi-api-key': apiKeys.elevenLabsKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert audio buffer to base64 data URL
    const audioBase64 = Buffer.from(response.data).toString('base64');
    return `data:audio/mpeg;base64,${audioBase64}`;
  } catch (error: any) {
    console.error('TTS error:', error.response?.data || error.message);
    throw new Error(`TTS synthesis failed: ${error.message}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcessResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const apiKeys = getApiKeys();

  try {
    // Parse multipart form data
    const form = new IncomingForm();

    const { fields, files } = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    const audioFile = files.audio?.[0] || files.audio;
    const targetLang = fields.targetLang?.[0] || fields.targetLang || 'EN';

    if (!audioFile) {
      return res.status(400).json({
        success: false,
        message: 'No audio file provided',
      });
    }

    const audioPath = audioFile.filepath;

    // Step 1: Transcribe audio with Whisper
    console.log('Step 1: Transcribing audio...');
    const transcript = await transcribeAudio(audioPath, apiKeys);
    console.log('Transcript:', transcript);

    // Step 2: Clean transcript with GPT (optional)
    console.log('Step 2: Cleaning transcript...');
    const cleaned = await cleanTranscript(transcript, apiKeys);
    console.log('Cleaned:', cleaned);

    // Step 3: Translate with DeepL
    console.log('Step 3: Translating text...');
    const translated_text = await translateText(cleaned, targetLang, apiKeys);
    console.log('Translated:', translated_text);

    // Step 4: Synthesize TTS with ElevenLabs
    console.log('Step 4: Synthesizing speech...');
    const tts_url = await synthesizeSpeech(translated_text, apiKeys);
    console.log('TTS generated');

    // Clean up uploaded file
    fs.unlinkSync(audioPath);

    return res.status(200).json({
      success: true,
      transcript,
      cleaned,
      translated_text,
      tts_url,
    });
  } catch (error: any) {
    console.error('Process error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}
