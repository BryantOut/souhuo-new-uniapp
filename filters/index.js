import moment from 'moment'

// 隐藏手机号中间4位
export function formatPhone(phone = '') {
    return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
}

// 价格处理
export function formatPrice(price = '') {
    // 大于100000则不取小数
    if (price > 100000) {
        price = parseInt(price);
    }
    var y = String(price).indexOf(".") + 1; //获取小数点的位置
    var count = String(price).length - y; //获取小数点后的个数
    if (count > 0) {
        return parseFloat(Number(price).toFixed(2))
    }
    return price
}

// 格式化时间
export function formatTime(data = '', format = 'YYYY-MM-DD') {
    if (data) {
        return moment(data).format(format)
    } else {
        return "--"
    }

}

// 状态格式化
export function statusFilter(status = 0) {    
    /**
     *     待审核(0),
     *     已确认(1),
     *     审核不通过(2),
     *     无须确认(3);
     */
    let str = ''
    switch (status) {
        case 0:
            str = '待审核'
            break;
        case 1:
            str = '已确认'
            break;
        case 2:
            str = '待审核'
            break;
        case 3:
            str = '已确认'
            break;
        default:
            break;
    }
    return str;
}

// 微信昵称超出4个字符省略
export function stringModify(nickname = '', num = 4) {
    if (!nickname || nickname === 'undefined') {
        return '--'
    }
    if (nickname.length > num) {
        nickname = nickname.substring(0, num) + "...";
    }
    return nickname
}

// 粉丝数...处理
export function formatMaxNum(value = '') { //过万处理
    let num;
    if (value === null) {
        return '--'
    }
    if (value > 9999) { //大于9999显示x.xx万
        num = (Math.floor(value / 1000) / 10) + 'W';
    } else if (value <= 9999) {
        num = value
    }
    return num;
}