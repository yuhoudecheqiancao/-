// 主应用程序入口
class FoodApp {
    constructor() {
        this.initialized = false;
        this.version = '1.0.0';
        
        this.init();
    }

    // 初始化应用
    async init() {
        if (this.initialized) return;

        try {
            // 显示欢迎动画
            this.showWelcomeAnimation();
            
            // 初始化各个模块
            await this.initializeModules();
            
            // 设置全局事件监听
            this.setupGlobalEvents();
            
            // 应用准备就绪
            this.onAppReady();
            
            this.initialized = true;
            
            console.log('🍽️ 吃什么？应用已成功启动！');
            
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.showErrorMessage('应用启动失败，请刷新页面重试');
        }
    }

    // 显示欢迎动画
    showWelcomeAnimation() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.8s ease-out';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // 初始化各个模块
    async initializeModules() {
        // 初始化时间管理器
        if (typeof timeManager !== 'undefined') {
            timeManager.init();
        }
        
        // 等待DOM完全加载后初始化抽奖模块
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // 初始化抽奖模块
        if (typeof FoodLottery !== 'undefined') {
            window.foodLottery = new FoodLottery();
        }
        
        console.log('所有模块初始化完成');
    }

    // 设置全局事件监听
    setupGlobalEvents() {
        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 监听页面可见性变化
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // 监听键盘事件
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // 监听在线状态
        window.addEventListener('online', this.handleOnlineStatus.bind(this));
        window.addEventListener('offline', this.handleOnlineStatus.bind(this));
        
        // 监听时间段变化事件
        document.addEventListener('timeSlotChanged', this.handleTimeSlotChange.bind(this));
    }

    // 处理窗口大小变化
    handleResize() {
        // 可以在这里添加响应式处理逻辑
        console.log('窗口大小已改变');
    }

    // 处理页面可见性变化
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('页面已隐藏');
        } else {
            console.log('页面已显示');
            // 页面重新显示时更新时间
            if (timeManager) {
                timeManager.updateTimeDisplay();
            }
        }
    }

    // 处理键盘事件
    handleKeyPress(event) {
        // 空格键开始抽奖
        if (event.code === 'Space' && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            if (foodLottery && !foodLottery.isSpinning) {
                foodLottery.startLottery();
            }
        }
        
        // ESC键关闭模态框
        if (event.code === 'Escape') {
            this.closeAllModals();
        }
        
        // Ctrl+H 显示历史记录
        if (event.ctrlKey && event.code === 'KeyH') {
            event.preventDefault();
            if (foodLottery) {
                foodLottery.showHistory();
            }
        }
    }

    // 处理在线状态变化
    handleOnlineStatus() {
        const isOnline = navigator.onLine;
        console.log('网络状态:', isOnline ? '在线' : '离线');
        
        // 可以显示网络状态提示
        this.showNetworkStatus(isOnline);
    }

    // 处理时间段变化
    handleTimeSlotChange(event) {
        const { timeSlot } = event.detail;
        console.log('时间段已切换到:', timeSlot);
        
        // 可以在这里添加时间段变化后的处理逻辑
        this.updateUIForTimeSlot(timeSlot);
    }

    // 应用准备就绪
    onAppReady() {
        // 隐藏加载动画
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // 显示快捷键提示（可选）
        setTimeout(() => {
            this.showQuickTips();
        }, 2000);
    }

    // 显示快捷键提示
    showQuickTips() {
        const tips = [
            '💡 小贴士：按空格键快速开始抽奖',
            '💡 小贴士：按Ctrl+H查看历史记录',
            '💡 小贴士：按ESC关闭弹窗'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        // 创建提示元素
        const tipElement = document.createElement('div');
        tipElement.className = 'quick-tip';
        tipElement.textContent = randomTip;
        
        document.body.appendChild(tipElement);
        
        // 显示动画
        setTimeout(() => {
            tipElement.classList.add('show');
        }, 10);
        
        // 5秒后隐藏
        setTimeout(() => {
            tipElement.classList.remove('show');
            setTimeout(() => {
                if (tipElement.parentNode) {
                    tipElement.parentNode.removeChild(tipElement);
                }
            }, 300);
        }, 5000);
    }

    // 显示网络状态
    showNetworkStatus(isOnline) {
        const statusElement = document.createElement('div');
        statusElement.className = `network-status ${isOnline ? 'online' : 'offline'}`;
        statusElement.innerHTML = `
            <span class="status-icon">${isOnline ? '🟢' : '🔴'}</span>
            <span class="status-text">${isOnline ? '网络已连接' : '网络已断开'}</span>
        `;
        
        document.body.appendChild(statusElement);
        
        // 显示动画
        setTimeout(() => {
            statusElement.classList.add('show');
        }, 10);
        
        // 3秒后隐藏
        setTimeout(() => {
            statusElement.classList.remove('show');
            setTimeout(() => {
                if (statusElement.parentNode) {
                    statusElement.parentNode.removeChild(statusElement);
                }
            }, 300);
        }, 3000);
    }

    // 关闭所有模态框
    closeAllModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // 更新时间段UI
    updateUIForTimeSlot(timeSlot) {
        // 可以添加时间段特定的UI更新逻辑
        console.log('为时间段更新UI:', timeSlot);
    }

    // 显示错误消息
    showErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <div class="error-content">
                <span class="error-icon">❌</span>
                <span class="error-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorElement);
        
        // 显示动画
        setTimeout(() => {
            errorElement.classList.add('show');
        }, 10);
        
        // 5秒后隐藏
        setTimeout(() => {
            errorElement.classList.remove('show');
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.parentNode.removeChild(errorElement);
                }
            }, 300);
        }, 5000);
    }

    // 获取应用状态
    getAppStatus() {
        return {
            initialized: this.initialized,
            version: this.version,
            modules: {
                timeManager: typeof timeManager !== 'undefined',
                foodLottery: typeof foodLottery !== 'undefined'
            },
            performance: {
                loadTime: performance.now()
            }
        };
    }

    // 重置应用
    reset() {
        if (confirm('确定要重置应用吗？这将清除所有数据。')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// 等待DOM加载完成后启动应用
document.addEventListener('DOMContentLoaded', () => {
    // 创建全局应用实例
    window.foodApp = new FoodApp();
});

// 防止页面意外关闭时丢失数据
window.addEventListener('beforeunload', (e) => {
    // 如果有正在进行的抽奖，提示用户
    if (typeof foodLottery !== 'undefined' && foodLottery.isSpinning) {
        e.preventDefault();
        e.returnValue = '抽奖正在进行中，确定要离开吗？';
        return e.returnValue;
    }
});

// 添加一些有用的全局工具函数
window.utils = {
    // 格式化日期
    formatDate: (date) => {
        return new Date(date).toLocaleString('zh-CN');
    },
    
    // 生成随机ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};
