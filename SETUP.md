# GoodRest - Eye Protection Software Setup Guide

## Project Overview
GoodRest is a comprehensive cross-platform eye protection application inspired by CareUEyes. It provides blue light filtering, brightness control, and pomodoro timer functionality.

## Project Structure
```
goodrest/
├── src/
│   ├── main.js           # Main Electron process
│   ├── renderer.js       # UI logic and interactions
│   ├── index.html        # Main application interface
│   └── overlay.html      # Filter overlay for screen protection
├── assets/
│   ├── icons/            # Application icons
│   │   ├── icon.svg      # Main app icon
│   │   └── tray.svg      # System tray icon
│   └── wallpapers/       # Break screen wallpapers
├── test/
│   ├── app.test.js       # Application tests
│   └── setup.js          # Test setup
├── .github/workflows/
│   └── build.yml         # GitHub Actions CI/CD
├── package.json          # Dependencies and scripts
├── jest.config.js        # Test configuration
├── setup.js              # Project setup script
├── README.md             # Documentation
└── LICENSE               # MIT License
```

## Features Implemented

### 1. Blue Light Filter System
- **Color Temperature Control**: 2000K - 8000K range
- **Brightness Control**: 20% - 100% range
- **Real-time Overlay**: Transparent overlay on all screens
- **Multi-monitor Support**: Independent settings per display

### 2. Protection Modes
- **Normal Mode**: 6500K, 100% brightness
- **Office Mode**: 5000K, 95% brightness
- **Game Mode**: 6000K, 90% brightness
- **Night Mode**: 3000K, 80% brightness
- **Reading Mode**: 4000K, 85% brightness
- **Custom Mode**: User-defined settings

### 3. Pomodoro Timer
- **Configurable Work/Break Cycles**: Default 25/5 minutes
- **Full-screen Break Notifications**: Immersive break screens
- **Visual Countdown**: Real-time timer display
- **Desktop Notifications**: System notifications for transitions

### 4. User Interface
- **System Tray Integration**: Quick access and controls
- **Modern UI**: Glass morphism design with gradients
- **Global Shortcuts**: Keyboard shortcuts for quick actions
- **Settings Persistence**: Saves user preferences

### 5. Cross-platform Support
- **Windows**: NSIS installer
- **macOS**: DMG package
- **Linux**: AppImage and DEB packages

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm 8+
- Git

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd goodrest

# Install dependencies
npm install

# Run the application
npm start
```

### Development Commands
```bash
# Run in development mode
npm run dev

# Build for current platform
npm run build

# Build for specific platforms
npm run build:win     # Windows
npm run build:mac     # macOS
npm run build:linux   # Linux

# Run tests
npm test
```

## Key Features Explanation

### Blue Light Filtering
The application uses a color temperature algorithm to convert Kelvin values to RGB colors, creating a warm overlay that reduces blue light emission. The overlay is applied using CSS mix-blend-mode for natural color filtering.

### Pomodoro Integration
The timer integrates with the eye protection system, showing full-screen break reminders with relaxing wallpapers during break periods. This encourages users to rest their eyes regularly.

### Global Shortcuts
- `Ctrl+Alt+E` (Windows/Linux) or `Cmd+Alt+E` (macOS): Toggle protection
- `Ctrl+Alt+M` (Windows/Linux) or `Cmd+Alt+M` (macOS): Cycle modes

### System Tray
The application runs in the system tray for minimal interference with workflow while providing quick access to all features.

## GitHub Actions CI/CD

The project includes automated building and testing:
- **Test Phase**: Runs Jest tests on all platforms
- **Build Phase**: Creates distribution packages for Windows, macOS, and Linux
- **Release Phase**: Automatically creates releases when tags are pushed

## Architecture

### Main Process (main.js)
- Handles window creation and management
- Manages system tray and global shortcuts
- Coordinates between renderer and overlay windows
- Stores user preferences

### Renderer Process (renderer.js)
- Handles UI interactions
- Manages pomodoro timer logic
- Communicates with main process via IPC

### Overlay System (overlay.html)
- Creates transparent overlay windows
- Applies color temperature filtering
- Shows break screen notifications

## Next Steps

1. **Add Icons**: Replace SVG icons with PNG versions for better compatibility
2. **Add Wallpapers**: Include break screen wallpapers in assets/wallpapers/
3. **Test Build**: Run `npm run build` to create distribution packages
4. **Setup CI/CD**: Configure GitHub Actions for automated building

## Troubleshooting

### Electron Installation Issues
If Electron fails to install:
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### Build Issues
Ensure all dependencies are installed and try building for specific platforms:
```bash
npm run build:linux  # For Linux
```

### Runtime Issues
Check the console for error messages and ensure all required files are present in the assets directory.

## License
MIT License - see LICENSE file for details.