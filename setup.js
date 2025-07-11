const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createDefaultIcon() {
  const iconPath = path.join(__dirname, 'assets', 'icons');
  if (!fs.existsSync(iconPath)) {
    fs.mkdirSync(iconPath, { recursive: true });
  }

  const svgIcon = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="128" cy="128" r="120" fill="url(#grad1)"/>
  <circle cx="128" cy="128" r="80" fill="none" stroke="white" stroke-width="8"/>
  <circle cx="128" cy="128" r="40" fill="white"/>
  <path d="M 90 128 Q 128 90 166 128 Q 128 166 90 128" fill="#667eea"/>
</svg>`;

  fs.writeFileSync(path.join(iconPath, 'icon.svg'), svgIcon);
  
  console.log('Created default app icon');
}

function createDefaultWallpapers() {
  const wallpaperPath = path.join(__dirname, 'assets', 'wallpapers');
  if (!fs.existsSync(wallpaperPath)) {
    fs.mkdirSync(wallpaperPath, { recursive: true });
  }

  console.log('Wallpaper directory created. Add your break wallpapers here.');
}

function createReadme() {
  const readme = `# GoodRest - Eye Protection Software

A cross-platform eye protection application built with Electron, featuring blue light filtering and pomodoro timer functionality.

## Features

- **Blue Light Filter**: Adjustable color temperature and brightness control
- **Multiple Modes**: Normal, Office, Game, Night, Reading, and Custom modes
- **Pomodoro Timer**: Work/break cycles with visual break reminders
- **System Tray**: Quick access and control from system tray
- **Global Shortcuts**: 
  - \`Ctrl+Alt+E\`: Toggle protection on/off
  - \`Ctrl+Alt+M\`: Cycle through protection modes
- **Cross-platform**: Supports Windows, macOS, and Linux

## Installation

### From Release
Download the latest release for your platform from the [releases page](https://github.com/yourusername/goodrest/releases).

### From Source
\`\`\`bash
git clone https://github.com/yourusername/goodrest.git
cd goodrest
npm install
npm start
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for current platform
npm run build

# Build for specific platforms
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
\`\`\`

## Protection Modes

- **Normal**: 6500K color temperature, 100% brightness
- **Office**: 5000K color temperature, 95% brightness
- **Game**: 6000K color temperature, 90% brightness
- **Night**: 3000K color temperature, 80% brightness
- **Reading**: 4000K color temperature, 85% brightness
- **Custom**: User-defined settings

## Pomodoro Timer

The built-in pomodoro timer helps maintain healthy work habits:
- Configurable work and break durations
- Full-screen break notifications with relaxing wallpapers
- Visual countdown during breaks
- Desktop notifications

## License

MIT License - see LICENSE file for details.
`;

  fs.writeFileSync(path.join(__dirname, 'README.md'), readme);
  console.log('Created README.md');
}

// Run setup
createDefaultIcon();
createDefaultWallpapers();
createReadme();

console.log('Project setup complete!');
console.log('\\nNext steps:');
console.log('1. Add app icons to assets/icons/ (icon.png, tray.png)');
console.log('2. Add break wallpapers to assets/wallpapers/');
console.log('3. Run: npm install');
console.log('4. Run: npm start');