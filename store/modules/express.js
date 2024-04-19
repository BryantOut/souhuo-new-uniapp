const getDefaultState = () => {
    return {
        submitExpressTempParams: null
    }
}

const submitExpressTempParamsHandler = {
    state: {
        submitExpressTempParams: null, // 提交快递单号接口信息
    },
    mutations: {
        SET_SUBMIT_EXPRESS_TEMP_PARAMS: (state, submitExpressTempParams) => {
            state.submitExpressTempParams = submitExpressTempParams
        },
        RESET_ALL_FILTERS: (state) => {
            const initState = getDefaultState()
            Object.keys(initState).forEach(key => {
                state[key] = initState[key]
            })
        },
    },
    getters: {
        getSubmitExpressTempParams: (state) => state.submitExpressTempParams
    }
}

export default submitExpressTempParamsHandler