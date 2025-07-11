# GoodRest - Eye Protection Software

A comprehensive cross-platform eye protection application inspired by CareUEyes, built with Electron. Features blue light filtering, brightness control, multiple protection modes, and an integrated pomodoro timer for healthy work habits.

## 🌟 Features

### Eye Protection
- **Blue Light Filter**: Advanced color temperature adjustment (2000K-8000K)
- **Brightness Control**: Precise brightness adjustment (20%-100%)
- **5 Protection Modes**: Normal, Office, Game, Night, Reading + Custom mode
- **Multi-Monitor Support**: Independent settings for each display
- **Global Shortcuts**: Quick toggle and mode switching

### Pomodoro Timer
- **Customizable Work/Break Cycles**: Set your preferred work and break durations
- **Full-Screen Break Reminders**: Immersive break screens with relaxing wallpapers
- **Visual Countdown**: Clear timer display during breaks
- **Desktop Notifications**: Stay informed about work/break transitions

### User Interface
- **System Tray Integration**: Quick access from system tray
- **Modern UI**: Clean, intuitive interface with glass morphism design
- **Minimal Resource Usage**: Lightweight background operation
- **Auto-start Support**: Launch with system startup

## Installation

### From Release
Download the latest release for your platform from the [releases page](https://github.com/yourusername/goodrest/releases).

### From Source
```bash
git clone https://github.com/yourusername/goodrest.git
cd goodrest
npm install
npm start
```

## Development

```bash
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
```

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
