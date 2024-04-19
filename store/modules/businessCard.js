const getDefaultState = () => {
    return {
        checkBusinessCardInfo: null
    }
}

const businessCardHandler = {
    state: {
        checkBusinessCardInfo: uni.getStorageSync('checkBusinessCardInfo') ? uni.getStorageSync('checkBusinessCardInfo') : null, // 选中查看的名片信息
        requestTimes: 0
    },
    mutations: {
        SET_CHECK_BUSINESS_CARD_INFO: (state, checkBusinessCardInfo) => {
            state.checkBusinessCardInfo = checkBusinessCardInfo
            uni.setStorageSync('checkBusinessCardInfo', checkBusinessCardInfo)
        },
        RESET_ALL_FILTERS: (state) => {
            const initState = getDefaultState()
            Object.keys(initState).forEach(key => {
                state[key] = initState[key]
                uni.setStorageSync(key, initState[key])
            })
        },
    },
    getters: {
        getCheckBusinessCardInfo: (state) => state.checkBusinessCardInfo
    }
}

export default businessCardHandler