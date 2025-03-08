(function () {
    'use strict';

    // 统一状态管理
    const state = {
        isRunning: false,
        // 默认以工作模式开始
        mode: 'work', // work | shortBreak | longBreak
        // 根据当前模式的时长（单位：秒）
        timeLeft: 25 * 60,
        timerId: null,
        completedSessions: 0,
        settings: {
            workDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15
        }
    };

    // DOM 元素引用
    const elements = {
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        startBtn: document.getElementById('startBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        settingsBtn: document.getElementById('settingsBtn'),
        settingsModal: document.getElementById('settingsModal'),
        saveSettings: document.getElementById('saveSettings'),
        closeSettings: document.getElementById('closeSettings'),
        completedSessions: document.getElementById('completedSessions'),
        resetSessionsBtn: document.getElementById('resetSessionsBtn'),
        celebration: document.getElementById('celebration'),
        workDuration: document.getElementById('workDuration'),
        shortBreakDuration: document.getElementById('shortBreakDuration'),
        longBreakDuration: document.getElementById('longBreakDuration')
    };

    // 更新显示：倒计时、会话计数、统计（今日专注）
    function updateDisplay() {
        const minutes = Math.floor(state.timeLeft / 60);
        const seconds = state.timeLeft % 60;
        elements.minutes.textContent = minutes.toString().padStart(2, '0');
        elements.seconds.textContent = seconds.toString().padStart(2, '0');
        elements.completedSessions.textContent = state.completedSessions;

        // 更新统计：今日专注分钟数（简单按完成的工作时长计算）
        const dailyFocusElem = document.getElementById('dailyFocus');
        if (dailyFocusElem) {
            dailyFocusElem.textContent = (state.completedSessions * state.settings.workDuration) + " 分钟";
        }

        // 根据模式更新背景样式
        document.body.className = state.mode === 'work' ? 'work-mode' : 'break-mode';
    }

    // 启动计时器（基于时间戳更新，避免后台节流影响）
    function startTimer() {
        if (!state.isRunning) {
            state.isRunning = true;
            elements.startBtn.disabled = true;
            elements.pauseBtn.disabled = false;
            let startTimestamp = Date.now();
            let initialTimeLeft = state.timeLeft;

            state.timerId = setInterval(() => {
                let elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                state.timeLeft = initialTimeLeft - elapsed;
                updateDisplay();
                if (state.timeLeft <= 0) {
                    completeSession();
                }
            }, 200);
        }
    }

    // 暂停计时器
    function pauseTimer() {
        if (state.isRunning) {
            clearInterval(state.timerId);
            state.isRunning = false;
            elements.startBtn.disabled = false;
            elements.pauseBtn.disabled = true;
        }
    }

    // 重置计时器（根据当前模式重置到初始值）
    function resetTimer() {
        clearInterval(state.timerId);
        state.isRunning = false;
        if (state.mode === 'work') {
            state.timeLeft = state.settings.workDuration * 60;
        } else if (state.mode === 'shortBreak') {
            state.timeLeft = state.settings.shortBreakDuration * 60;
        } else if (state.mode === 'longBreak') {
            state.timeLeft = state.settings.longBreakDuration * 60;
        }
        elements.startBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        updateDisplay();
    }

    // 完成一个番茄钟周期
    function completeSession() {
        clearInterval(state.timerId);
        state.isRunning = false;
        // 定义提醒信息
        const message = state.mode === 'work'
            ? '恭喜完成一个番茄钟！该休息一下了。'
            : '休息结束，开始新的番茄钟吧！';

        // 调用通知和页面内提示（保持原有逻辑）
        showNotification();
        showCelebration();

        // 计算弹窗窗口尺寸和居中位置
        const popupWidth = 800;
        const popupHeight = 600;
        const left = (screen.availWidth - popupWidth) / 2;
        const top = (screen.availHeight - popupHeight) / 2;

        // 弹出窗口显示提醒信息，显示在屏幕正中央
        window.open(
            'popup.html?msg=' + encodeURIComponent(message),
            'reminderPopup',
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
        );


        if (state.mode === 'work') {
            state.completedSessions++;
            saveSessions();
            if (state.completedSessions % 4 === 0) {
                state.mode = 'longBreak';
                state.timeLeft = state.settings.longBreakDuration * 60;
            } else {
                state.mode = 'shortBreak';
                state.timeLeft = state.settings.shortBreakDuration * 60;
            }
        } else {
            state.mode = 'work';
            state.timeLeft = state.settings.workDuration * 60;
        }
        elements.startBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        updateDisplay();
    }




    // 设置管理：加载与保存设置
    function loadSettings() {
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            state.settings = JSON.parse(savedSettings);
            elements.workDuration.value = state.settings.workDuration;
            elements.shortBreakDuration.value = state.settings.shortBreakDuration;
            elements.longBreakDuration.value = state.settings.longBreakDuration;
        }
    }

    function saveSettings() {
        state.settings = {
            workDuration: parseInt(elements.workDuration.value),
            shortBreakDuration: parseInt(elements.shortBreakDuration.value),
            longBreakDuration: parseInt(elements.longBreakDuration.value)
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(state.settings));
        elements.settingsModal.style.display = 'none';
        if (!state.isRunning && state.mode === 'work') {
            state.timeLeft = state.settings.workDuration * 60;
            updateDisplay();
        }
    }

    // 会话记录管理
    function loadSessions() {
        const savedSessions = localStorage.getItem('completedSessions');
        if (savedSessions) {
            state.completedSessions = parseInt(savedSessions);
        }
    }

    function saveSessions() {
        localStorage.setItem('completedSessions', state.completedSessions.toString());
    }

    function resetSessions() {
        state.completedSessions = 0;
        saveSessions();
        updateDisplay();
    }

    // 显示通知
    function showNotification() {
        const message = state.mode === 'work'
            ? '恭喜完成一个番茄钟！该休息一下了。'
            : '休息结束，开始新的番茄钟吧！';

        if (Notification.permission !== 'granted') {
            console.warn('未获得通知权限，无法显示通知');
            return;
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(function (registration) {
                if (registration) {
                    registration.showNotification('晨曦番茄时钟', {
                        body: message,
                        icon: '/favicon.ico'
                    }).catch(function (error) {
                        console.error('显示通知时出错：', error);
                    });
                }
            });
        } else if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('晨曦番茄时钟', {
                body: message,
                icon: '/favicon.ico'
            });
        }
    }

    // 显示弹窗提示（额外视觉提醒）
    function showPopupAlert(message) {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.textContent = message;
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }
    }

    // 庆祝动画：生成粒子效果
    function showCelebration() {
        elements.celebration.innerHTML = createParticles();
        elements.celebration.classList.add('active');
        setTimeout(() => {
            elements.celebration.classList.remove('active');
            elements.celebration.innerHTML = '';
        }, 2000);
    }

    function createParticles() {
        const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#40C4FF'];
        let particlesHTML = '';
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particlesHTML += `
          <div class="particle"
               style="--x: ${Math.random() * 100}%;
                      --y: ${Math.random() * 100}%;
                      --color: ${color};
                      --size: ${size}px;
                      --duration: ${Math.random() * 0.5 + 0.5}s">
          </div>
        `;
        }
        return particlesHTML;
    }

    // 设置按钮与其他事件监听器
    function setupEventListeners() {
        elements.startBtn.addEventListener('click', function () {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        startTimer();
                    } else {
                        console.warn('通知权限未授予，无法显示通知');
                        startTimer();
                    }
                });
            } else {
                startTimer();
            }
        });
        elements.pauseBtn.addEventListener('click', pauseTimer);
        elements.resetBtn.addEventListener('click', resetTimer);
        elements.settingsBtn.addEventListener('click', () => {
            elements.settingsModal.style.display = 'block';
        });
        elements.closeSettings.addEventListener('click', () => {
            elements.settingsModal.style.display = 'none';
        });
        elements.saveSettings.addEventListener('click', saveSettings);
        elements.resetSessionsBtn.addEventListener('click', resetSessions);
    }

    // Canvas 动态背景动画系统
    class CanvasAnimation {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.resize();
            document.body.appendChild(this.canvas);
            window.addEventListener('resize', () => this.resize());
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.canvas.className = 'background-canvas';
        }

        animate() {
            const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
            if (state.mode === 'work') {
                gradient.addColorStop(0, '#FFE5E5');
                gradient.addColorStop(1, '#FFC3C3');
            } else {
                gradient.addColorStop(0, '#E5FFE5');
                gradient.addColorStop(1, '#C3FFC3');
            }
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.01;
                this.ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            }
            requestAnimationFrame(() => this.animate());
        }

        addParticles(x, y) {
            for (let i = 0; i < 20; i++) {
                this.particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    size: Math.random() * 3 + 2,
                    color: "150,150,150",
                    alpha: 1
                });
            }
        }
    }

    // 初始化应用
    function init() {
        loadSettings();
        loadSessions();
        if (state.mode === 'work') {
            state.timeLeft = state.settings.workDuration * 60;
        } else if (state.mode === 'shortBreak') {
            state.timeLeft = state.settings.shortBreakDuration * 60;
        } else {
            state.timeLeft = state.settings.longBreakDuration * 60;
        }
        updateDisplay();
        setupEventListeners();
    }

    const canvasAnim = new CanvasAnimation();
    init();
})();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('Service Worker 注册成功：', registration.scope);
            })
            .catch(function (error) {
                console.error('Service Worker 注册失败：', error);
            });
    });
}
