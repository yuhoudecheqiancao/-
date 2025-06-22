// 时间管理模块
class TimeManager {
    constructor() {
        this.currentTimeSlot = null;
        this.timeSlotNames = {
            breakfast: '早餐时间',
            lunch: '午餐时间', 
            dinner: '晚餐时间',
            snacks: '夜宵时间'
        };
        
        this.greetings = {
            breakfast: '早上好！新的一天从美味早餐开始吧~ ☀️',
            lunch: '中午好！是时候来一顿丰盛的午餐了！ 🌞',
            dinner: '晚上好！今晚想吃点什么呢？ 🌙',
            snacks: '深夜了，来点夜宵或零食吧~ ✨'
        };
        
        this.backgrounds = {
            breakfast: 'linear-gradient(135deg, #FFE5B7 0%, #FFD93D 100%)',
            lunch: 'linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)',
            dinner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            snacks: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)'
        };
    }

    // 获取当前时间段
    getCurrentTimeSlot() {
        const hour = new Date().getHours();
        
        if (hour >= 6 && hour < 11) {
            this.currentTimeSlot = 'breakfast';
        } else if (hour >= 11 && hour < 15) {
            this.currentTimeSlot = 'lunch';
        } else if (hour >= 17 && hour < 22) {
            this.currentTimeSlot = 'dinner';
        } else {
            this.currentTimeSlot = 'snacks';
        }
        
        return this.currentTimeSlot;
    }

    // 格式化当前时间
    getCurrentTimeString() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // 获取时间段名称
    getTimeSlotName(timeSlot = null) {
        const slot = timeSlot || this.currentTimeSlot;
        return this.timeSlotNames[slot] || '用餐时间';
    }

    // 获取问候语
    getGreeting(timeSlot = null) {
        const slot = timeSlot || this.currentTimeSlot;
        return this.greetings[slot] || '让我来帮你决定吃什么吧！';
    }

    // 获取背景样式
    getBackgroundStyle(timeSlot = null) {
        const slot = timeSlot || this.currentTimeSlot;
        return this.backgrounds[slot] || this.backgrounds['snacks'];
    }

    // 更新页面时间显示
    updateTimeDisplay() {
        const currentTime = this.getCurrentTimeString();
        const timeSlot = this.getCurrentTimeSlot();
        const timeSlotName = this.getTimeSlotName();
        
        const currentTimeElement = document.getElementById('currentTime');
        const timeSlotElement = document.getElementById('timeSlot');
        
        if (currentTimeElement) {
            currentTimeElement.textContent = currentTime;
        }
        
        if (timeSlotElement) {
            timeSlotElement.textContent = timeSlotName;
        }
        
        this.updateBackground();
        this.updateGreeting();
    }

    // 更新背景
    updateBackground() {
        // 保持背景图片，不进行背景更新
        // const backgroundElement = document.querySelector('.background-animation');
        // if (backgroundElement) {
        //     backgroundElement.style.background = this.getBackgroundStyle();
        // }
    }

    // 更新问候语
    updateGreeting() {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.textContent = this.getGreeting();
        }
    }

    // 手动切换时间段
    switchTimeSlot() {
        const timeSlots = ['breakfast', 'lunch', 'dinner', 'snacks'];
        const currentIndex = timeSlots.indexOf(this.currentTimeSlot);
        const nextIndex = (currentIndex + 1) % timeSlots.length;
        
        this.currentTimeSlot = timeSlots[nextIndex];
        this.updateTimeDisplay();
        
        // 触发自定义事件
        const event = new CustomEvent('timeSlotChanged', {
            detail: { timeSlot: this.currentTimeSlot }
        });
        document.dispatchEvent(event);
        
        return this.currentTimeSlot;
    }

    // 初始化时间管理器
    init() {
        this.getCurrentTimeSlot();
        this.updateTimeDisplay();
        
        // 每分钟更新一次时间显示
        setInterval(() => {
            this.updateTimeDisplay();
        }, 60000);
        
        // 绑定切换时间段按钮
        const changeTimeSlotBtn = document.getElementById('changeTimeSlot');
        if (changeTimeSlotBtn) {
            changeTimeSlotBtn.addEventListener('click', () => {
                this.switchTimeSlot();
                
                // 显示切换提示
                this.showTimeSlotChangeNotification();
            });
        }
    }

    // 显示时间段切换通知
    showTimeSlotChangeNotification() {
        const notification = document.createElement('div');
        notification.className = 'time-slot-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⏰</span>
                <span class="notification-text">已切换到 ${this.getTimeSlotName()}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 获取时间段图标
    getTimeSlotIcon(timeSlot = null) {
        const slot = timeSlot || this.currentTimeSlot;
        const icons = {
            breakfast: '🌅',
            lunch: '☀️',
            dinner: '🌙',
            snacks: '✨'
        };
        return icons[slot] || '🍽️';
    }

    // 获取详细的时间信息
    getDetailedTimeInfo() {
        const now = new Date();
        const hour = now.getHours();
        
        let period = '';
        let nextMealTime = '';
        
        if (hour >= 6 && hour < 11) {
            period = '早晨';
            nextMealTime = '11:00 (午餐)';
        } else if (hour >= 11 && hour < 15) {
            period = '中午';
            nextMealTime = '17:00 (晚餐)';
        } else if (hour >= 17 && hour < 22) {
            period = '傍晚';
            nextMealTime = '次日 06:00 (早餐)';
        } else {
            period = '深夜';
            nextMealTime = '06:00 (早餐)';
        }
        
        return {
            period,
            timeSlot: this.currentTimeSlot,
            timeSlotName: this.getTimeSlotName(),
            nextMealTime,
            currentTime: this.getCurrentTimeString(),
            icon: this.getTimeSlotIcon()
        };
    }
}

// 创建全局时间管理器实例
const timeManager = new TimeManager(); 