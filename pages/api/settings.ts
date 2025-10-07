import type { NextApiRequest, NextApiResponse } from 'next';

type SettingsData = {
  success: boolean;
  openaiKey?: string;
  deepgramKey?: string;
  elevenLabsKey?: string;
  message?: string;
};

// In-memory storage for demo purposes
// In production, use a database or secure storage
let apiKeys = {
  openaiKey: '',
  deepgramKey: '',
  elevenLabsKey: '',
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SettingsData>
) {
  if (req.method === 'GET') {
    // Return masked API keys (only first 4 and last 4 characters)
    const maskApiKey = (key: string) => {
      if (!key || key.length < 8) return '';
      return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
    };

    res.status(200).json({
      success: true,
      openaiKey: maskApiKey(apiKeys.openaiKey),
      deepgramKey: maskApiKey(apiKeys.deepgramKey),
      elevenLabsKey: maskApiKey(apiKeys.elevenLabsKey),
    });
  } else if (req.method === 'POST') {
    // Store API keys
    const { openaiKey, deepgramKey, elevenLabsKey } = req.body;

    if (openaiKey !== undefined) apiKeys.openaiKey = openaiKey;
    if (deepgramKey !== undefined) apiKeys.deepgramKey = deepgramKey;
    if (elevenLabsKey !== undefined) apiKeys.elevenLabsKey = elevenLabsKey;

    res.status(200).json({
      success: true,
      message: 'Settings saved successfully',
    });
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }
}
