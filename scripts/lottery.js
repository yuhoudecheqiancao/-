// 抽奖模块
class FoodLottery {
    constructor() {
        this.isSpinning = false;
        this.wheelSections = [];
        this.currentFoods = [];
        this.history = JSON.parse(localStorage.getItem('lotteryHistory') || '[]');
        this.spinSound = null;
        this.resultSound = null;
        
        this.init();
    }

    // 初始化抽奖系统
    init() {
        this.setupDisplay();
        this.bindEvents();
        this.loadHistory();
        
        // 预加载音效（可选）
        // this.loadSounds();
    }

    // 设置显示区域
    setupDisplay() {
        this.updateDisplay();
        
        // 监听时间段变化
        document.addEventListener('timeSlotChanged', (e) => {
            this.updateDisplay();
        });
    }

    // 更新显示区域
    updateDisplay() {
        const timeSlot = timeManager.getCurrentTimeSlot();
        this.currentFoods = getFoodsByTimeSlot(timeSlot);
        
        // 更新显示文本
        const displayText = document.getElementById('displayText');
        if (displayText) {
            const timeSlotName = timeManager.getTimeSlotName(timeSlot);
            displayText.textContent = `${timeSlotName} - 点击按钮开始抽奖`;
        }
    }

    // 绑定事件
    bindEvents() {
        // 抽奖按钮
        const lotteryButton = document.getElementById('lotteryButton');
        if (lotteryButton) {
            lotteryButton.addEventListener('click', () => {
                this.startLottery();
            });
        }

        // 重新抽奖按钮
        const retryButton = document.getElementById('retryButton');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                this.startLottery();
            });
        }

        // 历史记录按钮
        const showHistoryBtn = document.getElementById('showHistory');
        if (showHistoryBtn) {
            showHistoryBtn.addEventListener('click', () => {
                this.showHistory();
            });
        }

        // 自定义食物按钮
        const addCustomFoodBtn = document.getElementById('addCustomFood');
        if (addCustomFoodBtn) {
            addCustomFoodBtn.addEventListener('click', () => {
                this.showCustomFoodModal();
            });
        }
    }

    // 开始抽奖
    async startLottery() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.showLoading(true);
        
        // 更新按钮状态
        const lotteryButton = document.getElementById('lotteryButton');
        if (lotteryButton) {
            lotteryButton.disabled = true;
            lotteryButton.innerHTML = '<span class="button-text">🎯 抽奖中...</span>';
        }

        // 显示抽奖动画
        await this.showDrawingAnimation();
        
        // 获取结果
        const timeSlot = timeManager.getCurrentTimeSlot();
        const selectedFood = getRandomFood(timeSlot);
        
        // 显示结果
        await this.showResult(selectedFood);
        
        // 保存历史记录
        this.saveToHistory(selectedFood, timeSlot);
        
        this.showLoading(false);
        this.isSpinning = false;
        
        // 恢复按钮状态
        if (lotteryButton) {
            lotteryButton.disabled = false;
            lotteryButton.innerHTML = '<span class="button-text">🎲 开始抽奖</span>';
        }
    }

    // 显示抽奖动画
    showDrawingAnimation() {
        return new Promise((resolve) => {
            const lotteryDisplay = document.getElementById('lotteryDisplay');
            const displayEmoji = document.getElementById('displayEmoji');
            const displayText = document.getElementById('displayText');
            
            if (!lotteryDisplay || !displayEmoji || !displayText) {
                resolve();
                return;
            }

            // 添加抽奖中的样式
            lotteryDisplay.classList.add('spinning');
            displayText.textContent = '正在抽取中...';
            
            // 快速切换表情符号制造抽奖效果
            const emojis = ['🎲', '🎯', '🎊', '✨', '🍀', '🎈'];
            let currentIndex = 0;
            
            const interval = setInterval(() => {
                displayEmoji.textContent = emojis[currentIndex];
                currentIndex = (currentIndex + 1) % emojis.length;
            }, 150);
            
            // 2秒后停止动画
            setTimeout(() => {
                clearInterval(interval);
                lotteryDisplay.classList.remove('spinning');
                resolve();
            }, 2000);
        });
    }

    // 显示结果
    showResult(food) {
        return new Promise((resolve) => {
            const lotteryDisplay = document.getElementById('lotteryDisplay');
            const displayEmoji = document.getElementById('displayEmoji');
            const displayText = document.getElementById('displayText');
            const resultCard = document.getElementById('resultCard');
            const resultFood = document.getElementById('resultFood');
            const resultEmoji = document.getElementById('resultEmoji');
            const resultDescription = document.getElementById('resultDescription');
            const retryButton = document.getElementById('retryButton');
            
            // 设置结果内容
            const emoji = getFoodEmoji(food);
            const timeInfo = timeManager.getDetailedTimeInfo();
            
            // 更新显示区域
            if (lotteryDisplay && displayEmoji && displayText) {
                lotteryDisplay.classList.add('result-show');
                displayEmoji.textContent = emoji;
                displayText.textContent = `今天就吃 ${food}！`;
            }
            
            // 更新结果卡片
            if (resultCard && resultFood) {
                resultEmoji.textContent = emoji;
                resultFood.textContent = food;
                resultDescription.textContent = `${timeInfo.icon} ${timeInfo.timeSlotName}推荐`;
                
                // 显示重新抽奖按钮
                if (retryButton) {
                    retryButton.style.display = 'inline-block';
                }
                
                // 结果动画
                resultCard.classList.add('result-show');
            }
            
            // 播放结果音效
            // this.playResultSound();
            
            setTimeout(resolve, 500);
        });
    }

    // 显示/隐藏加载动画
    showLoading(show) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = show ? 'flex' : 'none';
        }
    }

    // 保存到历史记录
    saveToHistory(food, timeSlot) {
        const historyItem = {
            food,
            timeSlot,
            timeSlotName: timeManager.getTimeSlotName(timeSlot),
            timestamp: Date.now(),
            date: new Date().toLocaleString('zh-CN')
        };
        
        this.history.unshift(historyItem);
        
        // 只保留最近50条记录
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        localStorage.setItem('lotteryHistory', JSON.stringify(this.history));
    }

    // 显示历史记录
    showHistory() {
        const modal = document.getElementById('historyModal');
        const historyList = document.getElementById('historyList');
        
        if (!modal || !historyList) return;
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">还没有抽奖记录哦～</p>';
        } else {
            let html = '';
            this.history.forEach((item, index) => {
                const emoji = getFoodEmoji(item.food);
                html += `
                    <div class="history-item" style="animation-delay: ${index * 0.1}s">
                        <div class="history-emoji">${emoji}</div>
                        <div class="history-content">
                            <div class="history-food">${item.food}</div>
                            <div class="history-meta">
                                <span class="history-time">${item.timeSlotName}</span>
                                <span class="history-date">${item.date}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            historyList.innerHTML = html;
        }
        
        modal.classList.add('show');
    }

    // 隐藏历史记录
    hideHistory() {
        const modal = document.getElementById('historyModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // 显示自定义食物弹窗
    showCustomFoodModal() {
        const modal = document.getElementById('customFoodModal');
        if (modal) {
            modal.classList.add('show');
            
            // 设置当前时间段为默认选择
            const categorySelect = document.getElementById('customFoodCategory');
            if (categorySelect) {
                categorySelect.value = timeManager.getCurrentTimeSlot();
            }
        }
    }

    // 隐藏自定义食物弹窗
    hideCustomFoodModal() {
        const modal = document.getElementById('customFoodModal');
        const form = document.getElementById('customFoodForm');
        
        if (modal) {
            modal.classList.remove('show');
        }
        
        if (form) {
            form.reset();
        }
    }

    // 加载历史记录
    loadHistory() {
        try {
            const savedHistory = localStorage.getItem('lotteryHistory');
            if (savedHistory) {
                this.history = JSON.parse(savedHistory);
            }
        } catch (error) {
            console.warn('历史记录加载失败:', error);
            this.history = [];
        }
        
        // 绑定模态框关闭事件
        const closeHistoryModal = document.getElementById('closeHistoryModal');
        const closeCustomModal = document.getElementById('closeCustomModal');
        const cancelCustomFood = document.getElementById('cancelCustomFood');
        
        if (closeHistoryModal) {
            closeHistoryModal.addEventListener('click', () => this.hideHistory());
        }
        
        if (closeCustomModal) {
            closeCustomModal.addEventListener('click', () => this.hideCustomFoodModal());
        }
        
        if (cancelCustomFood) {
            cancelCustomFood.addEventListener('click', () => this.hideCustomFoodModal());
        }
        
        // 绑定自定义食物表单
        const customFoodForm = document.getElementById('customFoodForm');
        if (customFoodForm) {
            customFoodForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCustomFoodSubmit();
            });
        }
        
        // 为每个模态框单独绑定背景点击事件
        const historyModal = document.getElementById('historyModal');
        const customFoodModal = document.getElementById('customFoodModal');
        
        if (historyModal) {
            historyModal.addEventListener('click', (e) => {
                // 只有点击模态框本身或遮罩层才关闭
                if (e.target === historyModal || e.target.classList.contains('modal-overlay')) {
                    this.hideHistory();
                }
            });
            
            // 阻止模态框内容区域的点击事件传播
            const historyContent = historyModal.querySelector('.modal-content');
            if (historyContent) {
                historyContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }
        
        if (customFoodModal) {
            customFoodModal.addEventListener('click', (e) => {
                // 只有点击模态框本身或遮罩层才关闭
                if (e.target === customFoodModal || e.target.classList.contains('modal-overlay')) {
                    this.hideCustomFoodModal();
                }
            });
            
            // 阻止模态框内容区域的点击事件传播
            const customContent = customFoodModal.querySelector('.modal-content');
            if (customContent) {
                customContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }
    }

    // 处理自定义食物提交
    handleCustomFoodSubmit() {
        console.log('处理自定义食物提交...');
        
        const foodNameInput = document.getElementById('customFoodName');
        const categorySelect = document.getElementById('customFoodCategory');
        
        if (!foodNameInput || !categorySelect) {
            console.error('找不到输入元素');
            return;
        }
        
        const foodName = foodNameInput.value.trim();
        const category = categorySelect.value;
        
        console.log('食物名称:', foodName, '分类:', category);
        
        if (!foodName) {
            alert('请输入食物名称！');
            return;
        }
        
        if (addCustomFood(foodName, category)) {
            alert(`成功添加 "${foodName}" 到${timeManager.getTimeSlotName(category)}！`);
            this.hideCustomFoodModal();
            
            // 如果是当前时间段，更新显示
            if (category === timeManager.getCurrentTimeSlot()) {
                this.updateDisplay();
            }
        } else {
            alert('该食物已存在！');
        }
    }

    // 音效相关方法（可选实现）
    loadSounds() {
        // 可以添加音效文件
        // this.spinSound = new Audio('assets/sounds/spin.mp3');
        // this.resultSound = new Audio('assets/sounds/result.mp3');
    }

    playSpinSound() {
        if (this.spinSound) {
            this.spinSound.play().catch(() => {
                // 忽略音频播放错误
            });
        }
    }

    playResultSound() {
        if (this.resultSound) {
            this.resultSound.play().catch(() => {
                // 忽略音频播放错误
            });
        }
    }

    // 清除历史记录
    clearHistory() {
        if (confirm('确定要清除所有历史记录吗？')) {
            this.history = [];
            localStorage.removeItem('lotteryHistory');
            this.showHistory(); // 刷新显示
        }
    }

    // 获取统计信息
    getStatistics() {
        const stats = {
            total: this.history.length,
            byTimeSlot: {},
            byFood: {},
            recent: this.history.slice(0, 10)
        };
        
        this.history.forEach(item => {
            // 按时间段统计
            stats.byTimeSlot[item.timeSlot] = (stats.byTimeSlot[item.timeSlot] || 0) + 1;
            
            // 按食物统计
            stats.byFood[item.food] = (stats.byFood[item.food] || 0) + 1;
        });
        
        return stats;
    }
}

// 创建全局抽奖实例
const foodLottery = new FoodLottery(); 