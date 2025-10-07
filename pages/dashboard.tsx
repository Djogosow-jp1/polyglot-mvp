import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('es');
  const [tone, setTone] = useState('neutral');
  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // TODO: Implement recording logic
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement file upload logic
      console.log('File uploaded:', file.name);
    }
  };

  const handleTranslate = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transcript,
          inputLanguage,
          outputLanguage,
          tone,
        }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText || '');
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setTranscript(text);
  };

  const handlePlayAudio = () => {
    // TODO: Implement audio playback
    console.log('Playing audio...');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-300 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Polyglot Dashboard</h1>
          <button
            onClick={() => router.push('/settings')}
            className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
          >
            Settings
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-semibold">Input Language</label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Output Language</label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>

        {/* Tone Selector */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 border border-gray-300"
          >
            <option value="neutral">Neutral</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>

        {/* Transcript Area */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Transcript</label>
            <div className="flex gap-2">
              <button
                onClick={handlePaste}
                className="px-3 py-1 border border-black hover:bg-black hover:text-white transition text-sm"
              >
                Paste
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 border border-black hover:bg-black hover:text-white transition text-sm"
              >
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept="audio/*"
                className="hidden"
              />
            </div>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300"
            placeholder="Your transcript will appear here..."
          />
        </div>

        {/* Translate Button */}
        <div className="mb-6 text-center">
          <button
            onClick={handleTranslate}
            disabled={isProcessing || !transcript}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 transition font-semibold"
          >
            {isProcessing ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {/* Translation Output */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Translation</label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!translatedText}
                className="px-3 py-1 border border-black hover:bg-black hover:text-white transition text-sm disabled:border-gray-300 disabled:text-gray-300"
              >
                Copy
              </button>
              <button
                onClick={handlePlayAudio}
                disabled={!translatedText}
                className="px-3 py-1 border border-black hover:bg-black hover:text-white transition text-sm disabled:border-gray-300 disabled:text-gray-300"
              >
                Play Audio
              </button>
            </div>
          </div>
          <textarea
            value={translatedText}
            readOnly
            className="w-full h-40 p-3 border border-gray-300 bg-gray-50"
            placeholder="Translation will appear here..."
          />
        </div>
      </main>

      {/* Floating Record Button */}
      <button
        onClick={handleRecord}
        className={
          `fixed bottom-8 right-8 w-16 h-16 rounded-full border-2 border-black flex items-center justify-center transition ${
            isRecording ? 'bg-red-600 text-white' : 'bg-white hover:bg-black hover:text-white'
          }`
        }
        aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        <span className="text-2xl">{isRecording ? '■' : '●'}</span>
      </button>
    </div>
  );
}
