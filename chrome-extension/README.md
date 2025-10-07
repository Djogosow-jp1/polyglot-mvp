# Polyglot Chrome Extension

A Chrome browser extension for real-time voice translation with tone adjustment, integrated with the Polyglot MVP web application.

## 📦 Download & Installation

### Method 1: Download ZIP (Recommended)

1. **Download the extension package**:
   - Visit the [Releases page](https://github.com/Djogosow-jp1/polyglot-mvp/releases) for the latest packaged version
   - Or download directly: [chrome-extension.zip](https://github.com/Djogosow-jp1/polyglot-mvp/archive/refs/heads/main.zip)
   - Extract the ZIP file to a location on your computer
   - Navigate to the `chrome-extension` folder inside the extracted files

2. **Open Chrome Extensions page**:
   - In Chrome, navigate to `chrome://extensions/`
   - Or click the three-dot menu (⋮) → More Tools → Extensions
   - Or use keyboard shortcut: `Ctrl+Shift+E` (Windows/Linux) or `Cmd+Shift+E` (Mac)

3. **Enable Developer Mode**:
   - Look for the "Developer mode" toggle in the **top-right corner**
   - Click to enable it (it should turn blue/green)

4. **Load the unpacked extension**:
   - Click the **"Load unpacked"** button (appears after enabling Developer Mode)
   - Navigate to and select the `chrome-extension` directory
   - Click "Select Folder" or "Open"

5. **Verify successful installation**:
   - The extension should now appear in your extensions list
   - Look for "Polyglot Voice Translator" with version information
   - Click the puzzle piece icon in Chrome toolbar and pin the extension for easy access

### Method 2: Clone from Git

```bash
# Clone the repository
git clone https://github.com/Djogosow-jp1/polyglot-mvp.git

# Navigate to the extension directory
cd polyglot-mvp/chrome-extension

# Follow steps 2-5 from Method 1 above
```

## 🚀 Features

- ✅ Real-time voice translation
- ✅ Multiple language support (30+ languages via DeepL)
- ✅ Tone adjustment (neutral, formal, casual, professional, friendly)
- ✅ Simple and minimal interface
- ✅ Integration with Polyglot web application backend
- ✅ Browser-based audio processing

## 📖 Step-by-Step Usage Guide

### First Time Setup

1. **Ensure the backend is running**:
   - The Polyglot web application must be running (default: `http://localhost:3000`)
   - See the [main README](../README.md) for backend setup instructions
   - Configure your API keys via `/settings` or `/api/settings` endpoint

2. **Open the extension**:
   - Click the Polyglot icon in your Chrome toolbar
   - If you don't see it, click the puzzle piece icon and pin Polyglot

### Using the Extension

1. **Select your languages**:
   - **Source Language**: Choose the language you'll speak/type in
   - **Target Language**: Choose the language you want to translate to

2. **Choose translation tone** (optional):
   - Neutral (default)
   - Formal (business communications)
   - Casual (friendly conversations)
   - Professional (workplace communications)
   - Friendly (warm, approachable tone)

3. **Input your content**:
   - **Voice Input**: Click the microphone button and speak clearly
   - **Text Input**: Type or paste text directly into the input field

4. **Get translation**:
   - Click the "Translate" button
   - View the translated text
   - Play the audio output (if available)

5. **Copy or use translation**:
   - Use the copy button to copy translated text
   - Audio can be played back directly in the extension

## 🎥 Recording a Walkthrough Video

To create a demonstration video of the extension:

### Recommended Tools
- **Windows**: OBS Studio, ShareX, or Windows Game Bar (`Win + G`)
- **Mac**: QuickTime Player (File → New Screen Recording) or OBS Studio
- **Linux**: OBS Studio, SimpleScreenRecorder, or Kazam
- **Browser-based**: Loom, Screencastify (Chrome extension)

### Video Recording Checklist

1. **Pre-recording setup**:
   - [ ] Close unnecessary tabs and applications
   - [ ] Ensure backend server is running
   - [ ] Test the extension functionality beforehand
   - [ ] Prepare a script or talking points
   - [ ] Set screen resolution to 1920x1080 or 1280x720

2. **What to demonstrate**:
   - [ ] Opening Chrome Extensions page (`chrome://extensions/`)
   - [ ] Enabling Developer Mode
   - [ ] Loading the unpacked extension
   - [ ] Pinning the extension to toolbar
   - [ ] Opening the extension popup
   - [ ] Selecting source and target languages
   - [ ] Choosing a tone (demonstrate at least 2 different tones)
   - [ ] Voice input demonstration (record a sentence)
   - [ ] Text input demonstration (paste or type text)
   - [ ] Viewing translation results
   - [ ] Playing back audio translation
   - [ ] Copying translated text

3. **Recording tips**:
   - Keep the video between 3-5 minutes
   - Speak clearly and at a moderate pace
   - Highlight important UI elements with cursor
   - Show both successful operations and how to handle errors
   - Use sample phrases: "Hello, how are you?" or "Welcome to our meeting"

4. **Post-recording**:
   - Trim any mistakes or dead air
   - Add title slide and end screen (optional)
   - Export in MP4 format (H.264 codec)
   - Upload to YouTube, Vimeo, or include in repository

## 📁 Extension Files

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - Content script that runs on web pages
- `popup.html` - Extension popup interface (to be implemented)
- `popup.js` - Popup functionality (to be implemented)
- `background.js` - Service worker for background tasks (to be implemented)
- `icons/` - Extension icons (to be added)
- `README.md` - This file

## 🔧 Troubleshooting

### Extension Won't Load

**Problem**: "Load unpacked" button is grayed out
- **Solution**: Make sure Developer Mode is enabled (toggle in top-right)

**Problem**: Error: "Cannot load extension. Manifest file is missing or unreadable"
- **Solution**: 
  - Verify you selected the `chrome-extension` folder, not the parent folder
  - Check that `manifest.json` exists in the directory
  - Ensure the file isn't corrupted (re-download if necessary)

**Problem**: "This extension may have been corrupted"
- **Solution**: 
  - Remove the extension
  - Delete the folder and re-extract from ZIP
  - Try loading again

### Extension Icon Not Showing

**Problem**: Can't find the extension in toolbar
- **Solution**:
  - Click the puzzle piece icon in Chrome toolbar
  - Find "Polyglot Voice Translator"
  - Click the pin icon to pin it to toolbar

### Translation Not Working

**Problem**: "Backend not responding" or "Connection error"
- **Solution**:
  - Verify the Polyglot web app is running at `http://localhost:3000`
  - Check that API keys are configured in the backend
  - Open browser console (F12) to check for CORS errors

**Problem**: No audio output
- **Solution**:
  - Verify ElevenLabs API key is configured
  - Check browser audio permissions
  - Ensure you haven't exceeded API quota

**Problem**: Microphone not working
- **Solution**:
  - Check Chrome's microphone permissions: `chrome://settings/content/microphone`
  - Grant permission when prompted
  - Verify microphone works in other applications

### Performance Issues

**Problem**: Extension is slow or unresponsive
- **Solution**:
  - Close unused tabs to free up memory
  - Check backend server performance
  - Verify internet connection for API calls

**Problem**: Voice recording cuts off
- **Solution**:
  - Speak more slowly
  - Check microphone sensitivity settings
  - Ensure adequate silence at end of speech

## ⚠️ Known Limitations

### Current Version Limitations

1. **Backend Dependency**:
   - Extension requires the Polyglot web application to be running locally
   - No standalone operation without backend server
   - Network connectivity required for API calls

2. **Manifest V3 Restrictions**:
   - Limited background processing capabilities
   - Service workers have execution time limits
   - Some APIs restricted compared to V2

3. **Audio Processing**:
   - File size limits apply (25MB for Whisper API)
   - Recording duration may be limited by browser
   - Real-time streaming not yet implemented

4. **API Rate Limits**:
   - Subject to OpenAI/DeepL/ElevenLabs rate limits
   - Free tier quotas may be exhausted quickly
   - No built-in rate limiting or queuing

5. **Language Support**:
   - Limited to languages supported by DeepL API
   - Speech recognition quality varies by language
   - Tone adjustment may not work equally well for all languages

6. **Browser Compatibility**:
   - Chrome/Chromium browsers only (version 88+)
   - Not compatible with Firefox, Safari, or Edge Legacy
   - Some features may not work in incognito mode

7. **UI/UX**:
   - Basic popup interface (no advanced settings UI yet)
   - No conversation history or saved translations
   - Limited customization options

### Planned Improvements

- [ ] Standalone mode with direct API integration
- [ ] Conversation history and favorites
- [ ] Custom keyboard shortcuts
- [ ] Dark mode support
- [ ] Offline mode with cached translations
- [ ] Support for more translation providers
- [ ] Real-time streaming translation
- [ ] Context menu integration
- [ ] Better error handling and user feedback

## 🛠️ Development & Contributing

### Making Changes

1. Edit the extension files
2. Go to `chrome://extensions/`
3. Find the Polyglot extension
4. Click the refresh icon (🔄) to reload
5. Test your changes

### File Structure

```
chrome-extension/
├── manifest.json       # Extension manifest (v3)
├── content.js         # Content script
├── popup.html         # Popup UI (TODO)
├── popup.js           # Popup logic (TODO)
├── background.js      # Service worker (TODO)
├── styles/            # CSS files (TODO)
│   └── popup.css
├── icons/             # Extension icons (TODO)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # This file
```

### Requirements

- Chrome browser (version 88 or higher for Manifest V3 support)
- Polyglot web application backend running (for API access)
- Active API keys for:
  - OpenAI (Whisper) or Hugging Face
  - DeepL (required)
  - ElevenLabs (required)

## 📞 Support & Contact

### Getting Help

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/Djogosow-jp1/polyglot-mvp/issues)
- **Discussions**: Join conversations on [GitHub Discussions](https://github.com/Djogosow-jp1/polyglot-mvp/discussions)
- **Documentation**: See the [main README](../README.md) for backend setup and API documentation

### Before Reporting Issues

Please check:
1. This troubleshooting section
2. Existing GitHub issues
3. Backend server is running and configured correctly
4. Browser console for error messages (F12)

### When Reporting Issues

Include:
- Chrome version (`chrome://version`)
- Extension version
- Operating system
- Error messages or screenshots
- Steps to reproduce
- Browser console logs (if relevant)

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details

## 🔗 Related Resources

- [Main Project README](../README.md)
- [API Documentation](../README.md#api-routes)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

**Note**: This extension is part of the Polyglot MVP project. It requires the backend web application to function. For a complete setup, please refer to the [main project documentation](../README.md).
