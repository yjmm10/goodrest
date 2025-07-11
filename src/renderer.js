const { ipcRenderer } = require('electron');

let currentMode = 'normal';
let isEnabled = true;
let pomodoroTimer = null;
let pomodoroState = 'stopped'; // stopped, work, break
let timeLeft = 25 * 60; // 25 minutes in seconds
let workDuration = 25 * 60;
let breakDuration = 5 * 60;

const statusIndicator = document.getElementById('statusIndicator');
const toggleBtn = document.getElementById('toggleBtn');
const modeButtons = document.getElementById('modeButtons');
const customControls = document.getElementById('customControls');
const tempSlider = document.getElementById('tempSlider');
const brightnessSlider = document.getElementById('brightnessSlider');
const tempValue = document.getElementById('tempValue');
const brightnessValue = document.getElementById('brightnessValue');
const timerDisplay = document.getElementById('timerDisplay');
const startTimer = document.getElementById('startTimer');
const pauseTimer = document.getElementById('pauseTimer');
const resetTimer = document.getElementById('resetTimer');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');

async function initialize() {
    currentMode = await ipcRenderer.invoke('get-current-mode');
    isEnabled = await ipcRenderer.invoke('get-enabled');
    
    updateUI();
    updateModeButtons();
}

function updateUI() {
    statusIndicator.className = `status-indicator ${isEnabled ? '' : 'disabled'}`;
    toggleBtn.textContent = isEnabled ? 'Disable Protection' : 'Enable Protection';
    toggleBtn.className = `toggle-btn ${isEnabled ? '' : 'disabled'}`;
}

function updateModeButtons() {
    const buttons = modeButtons.querySelectorAll('.mode-btn');
    buttons.forEach(btn => {
        btn.className = btn.dataset.mode === currentMode ? 'mode-btn active' : 'mode-btn';
    });
    
    customControls.style.display = currentMode === 'custom' ? 'block' : 'none';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startPomodoro() {
    if (pomodoroState === 'stopped') {
        pomodoroState = 'work';
        timeLeft = workDuration;
    }
    
    pomodoroTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(pomodoroTimer);
            
            if (pomodoroState === 'work') {
                pomodoroState = 'break';
                timeLeft = breakDuration;
                showBreakNotification();
                startPomodoro();
            } else {
                pomodoroState = 'work';
                timeLeft = workDuration;
                hideBreakNotification();
                pomodoroTimer = null;
            }
        }
    }, 1000);
}

function pausePomodoro() {
    if (pomodoroTimer) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
    }
}

function resetPomodoro() {
    if (pomodoroTimer) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
    }
    
    pomodoroState = 'stopped';
    timeLeft = workDuration;
    updateTimerDisplay();
    hideBreakNotification();
}

function showBreakNotification() {
    ipcRenderer.send('show-break', breakDuration);
    
    new Notification('Time for a break!', {
        body: `Take a ${Math.floor(breakDuration / 60)} minute break to rest your eyes.`,
        icon: '../assets/icons/icon.png'
    });
}

function hideBreakNotification() {
    ipcRenderer.send('hide-break');
}

// Event Listeners
toggleBtn.addEventListener('click', async () => {
    isEnabled = await ipcRenderer.invoke('toggle-enabled');
    updateUI();
});

modeButtons.addEventListener('click', async (e) => {
    if (e.target.classList.contains('mode-btn')) {
        const mode = e.target.dataset.mode;
        await ipcRenderer.invoke('set-mode', mode);
        currentMode = mode;
        updateModeButtons();
    }
});

tempSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    tempValue.textContent = `${value}K`;
    
    if (currentMode === 'custom') {
        updateCustomSettings();
    }
});

brightnessSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    brightnessValue.textContent = `${value}%`;
    
    if (currentMode === 'custom') {
        updateCustomSettings();
    }
});

function updateCustomSettings() {
    const settings = {
        temperature: parseInt(tempSlider.value),
        brightness: parseInt(brightnessSlider.value)
    };
    
    ipcRenderer.invoke('set-custom-settings', settings);
}

startTimer.addEventListener('click', () => {
    workDuration = parseInt(workTimeInput.value) * 60;
    breakDuration = parseInt(breakTimeInput.value) * 60;
    
    if (pomodoroState === 'stopped') {
        timeLeft = workDuration;
        updateTimerDisplay();
    }
    
    startPomodoro();
});

pauseTimer.addEventListener('click', () => {
    pausePomodoro();
});

resetTimer.addEventListener('click', () => {
    resetPomodoro();
});

// IPC Event Listeners
ipcRenderer.on('status-changed', (event, enabled) => {
    isEnabled = enabled;
    updateUI();
});

ipcRenderer.on('mode-changed', (event, mode) => {
    currentMode = mode;
    updateModeButtons();
});

// Request notification permission
if (Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize the app
initialize();
updateTimerDisplay();