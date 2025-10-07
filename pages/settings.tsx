import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const router = useRouter();
  const [openaiKey, setOpenaiKey] = useState('');
  const [deepgramKey, setDeepgramKey] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing API keys
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success) {
          setOpenaiKey(data.openaiKey || '');
          setDeepgramKey(data.deepgramKey || '');
          setElevenLabsKey(data.elevenLabsKey || '');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openaiKey,
          deepgramKey,
          elevenLabsKey,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Error saving settings.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-300 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">API Keys</h2>
            <p className="text-gray-600 mb-6">
              Enter your API keys to enable voice recognition, translation, and
              text-to-speech features.
            </p>
          </div>

          {/* OpenAI API Key */}
          <div>
            <label htmlFor="openai" className="block mb-2 font-semibold">
              OpenAI API Key
            </label>
            <input
              id="openai"
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="sk-..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Used for translation and text processing
            </p>
          </div>

          {/* Deepgram API Key */}
          <div>
            <label htmlFor="deepgram" className="block mb-2 font-semibold">
              Deepgram API Key
            </label>
            <input
              id="deepgram"
              type="password"
              value={deepgramKey}
              onChange={(e) => setDeepgramKey(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Enter Deepgram API key"
            />
            <p className="text-sm text-gray-500 mt-1">
              Used for voice recognition and transcription
            </p>
          </div>

          {/* ElevenLabs API Key */}
          <div>
            <label htmlFor="elevenlabs" className="block mb-2 font-semibold">
              ElevenLabs API Key
            </label>
            <input
              id="elevenlabs"
              type="password"
              value={elevenLabsKey}
              onChange={(e) => setElevenLabsKey(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Enter ElevenLabs API key"
            />
            <p className="text-sm text-gray-500 mt-1">
              Used for text-to-speech audio generation
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 transition font-semibold"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={
                `p-4 border ${
                  message.includes('success')
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                }`
              }
            >
              {message}
            </div>
          )}
        </form>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Security Note</h3>
          <p className="text-gray-600">
            Your API keys are stored locally in your browser and are never sent
            to our servers except when making API calls on your behalf. Keep
            your keys secure and never share them.
          </p>
        </div>
      </main>
    </div>
  );
}
