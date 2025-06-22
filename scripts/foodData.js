// 扩展的食物数据库
const foodDatabase = {
    breakfast: [
        // 传统中式早餐
        '包子', '豆浆', '油条', '鸡蛋饼', '小笼包', '胡辣汤', '煎饼果子', '燕麦粥',
        '白粥配咸菜', '蒸蛋', '馄饨', '豆腐脑', '烧饼', '麻团', '糯米团', '汤圆',
        
        // 西式早餐
        '三明治', '牛奶麦片', '吐司', '煎蛋', '培根', '酸奶', '华夫饼', '班尼迪克蛋',
        '法式吐司', '薄煎饼', '牛角包', '贝果', '格兰诺拉', '奶昔', '司康饼',
        
        // 健康早餐
        '水果沙拉', '全麦面包', '坚果酸奶', '蔬菜汁', '蛋白质奶昔', '燕麦杯',
        '奇亚籽布丁', '牛油果吐司', '蔬菜蛋卷', '低脂酸奶'
    ],
    
    lunch: [
        // 经典中餐
        '宫保鸡丁', '麻婆豆腐', '红烧肉', '西红柿鸡蛋', '青椒肉丝', '糖醋里脊',
        '回锅肉', '鱼香肉丝', '蚂蚁上树', '四川水煮鱼', '毛血旺', '口水鸡',
        '白切鸡', '清蒸鱼', '红烧茄子', '干煸豆角', '麻辣香锅', '水煮牛肉',
        
        // 面食类
        '兰州拉面', '意大利面', '炸酱面', '热干面', '凉面', '乌冬面', '拉面',
        '刀削面', '米线', '螺蛳粉', '重庆小面', '担担面', '阳春面', '鸡汤面',
        
        // 米饭类
        '盖浇饭', '扬州炒饭', '蛋炒饭', '咖喱饭', '烧腊饭', '石锅拌饭',
        '日式丼饭', '台湾卤肉饭', '海南鸡饭', '新加坡炒饭',
        
        // 国际美食
        '汉堡包', '披萨', '寿司', '拉面', '泰式炒河粉', '印度咖喱',
        '墨西哥卷饼', '越南河粉', '韩式烤肉', '日式定食'
    ],
    
    dinner: [
        // 热门晚餐
        '火锅', '烧烤', '小龙虾', '蒸蛋羹', '红烧排骨', '糖醋鱼', '白斩鸡',
        '蒜蓉生蚝', '烤鸭', '东坡肉', '清蒸螃蟹', '辣椒炒肉', '干锅花菜',
        
        // 汤品类
        '鸡汤', '排骨汤', '鱼汤', '蛤蜊汤', '冬瓜汤', '紫菜蛋花汤',
        '酸辣汤', '玉米汤', '海带汤', '银耳莲子汤',
        
        // 炒菜类
        '宫保鸡丁', '鱼香茄子', '地三鲜', '松鼠桂鱼', '水煮肉片', '麻辣豆腐',
        '蒜蓉西兰花', '干煸四季豆', '糖醋排骨', '红烧狮子头',
        
        // 海鲜类
        '清蒸鲈鱼', '蒜蓉扇贝', '椒盐虾', '红烧带鱼', '酱爆鱿鱼', '蛤蜊蒸蛋',
        '香辣蟹', '白灼虾', '鲍鱼', '海胆',
        
        // 素食类
        '麻婆豆腐', '红烧茄子', '蒜蓉菠菜', '干煸豆角', '糖醋藕片',
        '凉拌黄瓜', '拍黄瓜', '腌萝卜', '素炒豆芽', '清炒时蔬'
    ],
    
    snacks: [
        // 甜品类
        '奶茶', '蛋糕', '冰淇淋', '布丁', '提拉米苏', '马卡龙', '泡芙', '司康',
        '纸杯蛋糕', '慕斯', '芝士蛋糕', '红豆沙', '绿豆汤', '银耳汤',
        
        // 零食类
        '薯片', '爆米花', '坚果', '果干', '话梅', '牛肉干', '鱿鱼丝', '海苔',
        '瓜子', '花生', '开心果', '腰果', '杏仁', '核桃',
        
        // 水果类
        '苹果', '香蕉', '橙子', '草莓', '葡萄', '猕猴桃', '芒果', '菠萝',
        '西瓜', '哈密瓜', '火龙果', '榴莲', '樱桃', '蓝莓', '石榴',
        
        // 夜宵类
        '烧烤', '麻辣烫', '关东煮', '泡面', '粥', '汤面', '煎饼', '鸡蛋灌饼',
        '烤红薯', '糖炒栗子', '煮玉米', '热狗', '章鱼小丸子', '铁板鱿鱼',
        
        // 饮品类
        '咖啡', '茶', '果汁', '奶昔', '柠檬水', '椰汁', '豆浆', '酸梅汤',
        '蜂蜜水', '温开水', '苏打水', '气泡水'
    ]
};

// 食物表情符号映射
const foodEmojis = {
    // 早餐
    '包子': '🥟', '豆浆': '🥛', '油条': '🥖', '鸡蛋饼': '🥞', '小笼包': '🥟',
    '煎饼果子': '🥞', '燕麦粥': '🥣', '三明治': '🥪', '吐司': '🍞', '酸奶': '🥛',
    
    // 午餐/晚餐
    '宫保鸡丁': '🍗', '麻婆豆腐': '🍲', '红烧肉': '🥩', '西红柿鸡蛋': '🍅',
    '火锅': '🍲', '烧烤': '🍖', '面条': '🍜', '饺子': '🥟', '炒河粉': '🍝',
    '汉堡包': '🍔', '披萨': '🍕', '寿司': '🍣', '拉面': '🍜', '咖喱饭': '🍛',
    
    // 零食
    '奶茶': '🧋', '蛋糕': '🍰', '薯片': '🍟', '爆米花': '🍿', '冰淇淋': '🍦',
    '坚果': '🥜', '水果': '🍎', '酸奶': '🥛', '咖啡': '☕'
};

// 获取食物表情符号
function getFoodEmoji(foodName) {
    return foodEmojis[foodName] || '🍽️';
}

// 获取当前时段的食物数组
function getFoodsByTimeSlot(timeSlot) {
    return foodDatabase[timeSlot] || foodDatabase['snacks'];
}

// 随机获取食物
function getRandomFood(timeSlot) {
    const foods = getFoodsByTimeSlot(timeSlot);
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
}

// 添加自定义食物
function addCustomFood(foodName, category) {
    if (!foodDatabase[category]) {
        foodDatabase[category] = [];
    }
    
    if (!foodDatabase[category].includes(foodName)) {
        foodDatabase[category].push(foodName);
        
        // 保存到本地存储
        const customFoods = JSON.parse(localStorage.getItem('customFoods') || '{}');
        if (!customFoods[category]) {
            customFoods[category] = [];
        }
        customFoods[category].push(foodName);
        localStorage.setItem('customFoods', JSON.stringify(customFoods));
        
        return true;
    }
    return false;
}

// 从本地存储加载自定义食物
function loadCustomFoods() {
    const customFoods = JSON.parse(localStorage.getItem('customFoods') || '{}');
    
    for (const category in customFoods) {
        if (foodDatabase[category]) {
            customFoods[category].forEach(food => {
                if (!foodDatabase[category].includes(food)) {
                    foodDatabase[category].push(food);
                }
            });
        }
    }
}

// 初始化时加载自定义食物
document.addEventListener('DOMContentLoaded', loadCustomFoods); 