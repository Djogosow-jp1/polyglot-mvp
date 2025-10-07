# Polyglot Chrome Extension

A Chrome browser extension for real-time voice translation with tone adjustment.

## Features

- Real-time voice translation
- Multiple language support
- Tone adjustment (neutral, formal, casual, professional, friendly)
- Simple and minimal interface
- Integration with Polyglot web application

## Installation

### Development Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Djogosow-jp1/polyglot-mvp.git
   cd polyglot-mvp/chrome-extension
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or click the three-dot menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the `chrome-extension` directory from this repository

5. **Verify installation**:
   - The Polyglot Voice Translator extension should now appear in your extensions list
   - Pin it to your toolbar for easy access

## Usage

1. Click the extension icon in your Chrome toolbar
2. Select your input and output languages
3. Choose a tone for the translation
4. Either:
   - Click the microphone button to record voice
   - Or paste/type text directly
5. Click "Translate" to get your translation

## Files

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - Content script that runs on web pages
- `README.md` - This file

## TODO

- [ ] Add popup.html for extension interface
- [ ] Implement background service worker
- [ ] Add extension icons
- [ ] Connect to Polyglot API backend
- [ ] Implement voice recording functionality
- [ ] Add audio playback for translations

## Requirements

- Chrome browser (version 88 or higher for Manifest V3 support)
- Polyglot web application backend running (for API access)

## Development

To modify the extension:

1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Polyglot extension card
4. Test your changes

## License

MIT
