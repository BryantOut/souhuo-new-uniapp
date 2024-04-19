import {
    mapGetters
} from "vuex";

import { REWARD_TYPE } from '@/constants/index';

export default {
    computed: {
        ...mapGetters(["getPlatformItemSingleValueByPlatformTypeAndKey"]),
    },
    methods: {
        // 状态格式化
        fansDemandFilter(tempFansDemand = 0) {
            tempFansDemand = Number(tempFansDemand)
            let str = ''
            if (tempFansDemand === 0) {
                str = '不限'
            } else {
                str = this.formatMaxNum(tempFansDemand)
            }
            return str;
        },
        // 粉丝数...处理
        formatMaxNum(value = '') { //过万处理
            let num;
            if (value === null) {
                return '--'
            }
            if (value > 1000000) {
                num = '100W+'
            } else if (value > 9999) { //大于9999显示x.xx万
                num = (Math.floor(value / 1000) / 10) + 'W';
            } else if (value <= 9999) {
                num = value
            }
            return num;
        },
        // 奖励金额处理
        // 若奖励金额区间最小值&最大值相等，则仅展现固定值；若奖励金额区间最小值&最大值不相等，则展现为金
        amountOfMoneyHandler({
            noticeInfo = null
        }) {
            const { rewardType, minPayment, maxPayment, giftAmount } = noticeInfo
            let str = ''
            let tempTitle = [REWARD_TYPE['稿费'],REWARD_TYPE['稿费+赠品']].includes(rewardType) ? '通告费': '价值'
            if (REWARD_TYPE['赠品'] === rewardType) {
                str =  this.formatMaxNum(giftAmount)
            } else {
                if (maxPayment === minPayment) {
                    str = this.formatMaxNum(maxPayment)
                } else {
                    str = `${this.formatMaxNum(minPayment)}-${this.formatMaxNum(maxPayment)}`
                }
            }
            return `${tempTitle}￥${str}`
        },
        // 稿费金额处理
        paymentHandler({
            minPayment = 0,
            maxPayment = 0,
        }) {
            let str = ''
            if (maxPayment === minPayment) {
                str = this.formatMaxNum(maxPayment)
            } else {
                str = `${this.formatMaxNum(minPayment)}-${this.formatMaxNum(maxPayment)}`
            }
            return `${str}`
        },
        // 合作类型 - 【图文=0、视频=1、视频|图文=2】
        cooperationTypeHandler(cooperationType) {
            let text;
            switch (cooperationType) {
                case 0:
                    text = '图文'
                    break;
                case 1:
                    text = '视频'
                    break;
                case 2:
                    text = '图文|视频'
                    break;
            }
            return {
                text
            }
        },
        // 合作类型包含图文
        cooperationTypeIncludePic(cooperationType) {
            return [0, 2].includes(cooperationType)
        },
        // 合作形式包含视频
        cooperationTypeIncludeVideo(cooperationType) {
            return [1, 2].includes(cooperationType)
        },
        // 参加情况
        joinSituation({
            signUpNum = 0,
            cooperationNumber = 0
        }) {
            // signUpNum 报名人数
            // cooperationNumber 合作人数
            return `${this.formatMaxNum(signUpNum)}/${this.fansDemandFilter(cooperationNumber)}`
        },
        // 通告奖励类型 - 【稿费=0、赠品=1、稿费+赠品=2】
        rewardTypeHandler(rewardType = 0) {
            let str = ''
            switch (rewardType) {
                // 若奖励类型为【稿费】，则标签仅展现为【寄拍】，且在标签后面增加展现通告费金额
                case 0:
                    str = '寄拍'
                    break;
                // 若奖励类型为【赠品】，则标签仅展现为【赠拍】，且在标签后面增加展现赠品价值金额
                case 1:
                    str = '赠拍'
                    break;
                // 若奖励类型为【稿费+赠品】，则标签仅展现为【赠拍】，且在标签后面仅展现通告费金额
                case 2:
                    str = '赠拍'
                    break;
            }
            return str
        }
    },
}