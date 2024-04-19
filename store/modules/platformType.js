import {
    IMG_BASE_URL
} from "@/config.js";
const platformType = {
    state: {
        // 平台基础数据数组
        platformTypeList: [
            {
                platformType: 5, // 平台类型
                platform: '网拍',
                platformFullName: '网拍模特认证',
                logoSrc: require('@/static/image/logo7.png'),
                regForSubmitUrl: /^https:\/\/www.xiaohongshu.com\/user\/profile\//g, // 判断输入链接是否为对应平台的格式
                howToGetHomeUrl: {
                    title: '如何获取主页链接？',
                    imgList: [{
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4660180644546290938.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5676228071199233174.jpg",
                        }
                    ]
                },
                howToSetScreenshotCode: {
                    title: '如何设置截图验证码？',
                    imgList: [
                        {
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4674433388130707962.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4867143220922374433.jpg",
                        },
                        {
                            step: '第四步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4810791407385580867.jpg",
                        }
                    ]
                },
				submitContentScreenshotDemo: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5445628512333774989.png"
            },
            {
                platformType: 0, // 平台类型
                platform: '小红书',
                platformFullName: '小红书',
                logoSrc: require('@/static/image/logo5.png'),
                regForSubmitUrl: /^https:\/\/www.xiaohongshu.com\/user\/profile\//g, // 判断输入链接是否为对应平台的格式
                howToGetHomeUrl: {
                    title: '如何获取主页链接？',
                    imgList: [{
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4660180644546290938.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5676228071199233174.jpg",
                        }
                    ]
                },
                howToSetScreenshotCode: {
                    title: '如何设置截图验证码？',
                    imgList: [
                        {
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4674433388130707962.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4867143220922374433.jpg",
                        },
                        {
                            step: '第四步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4810791407385580867.jpg",
                        }
                    ]
                },
				submitContentScreenshotDemo: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4900795956782723669.png"
            },
            {
                platformType: 1, // 平台类型
                platform: '抖音',
                platformFullName: '抖音',
                logoSrc: require('@/static/image/logo4.png'),
                regForSubmitUrl: /^https:\/\/v.douyin.com\//g,
                howToGetHomeUrl: {
                    title: '如何获取主页链接？',
                    imgList: [{
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4747345874850629228.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5306596231811768015.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5204760914699613198.jpg",
                        }
                    ]
                },
                howToSetScreenshotCode: {
                    title: '如何设置截图验证码？',
                    imgList: [
                        {
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5289851041932776042.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5598250945287153476.jpg",
                        },
                        {
                            step: '第四步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5535751324814504170.jpg",
                        }
                    ]
                },
				submitContentScreenshotDemo: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4933276710619908911.png"
            },
            {
                platformType: 2, // 平台类型
                platform: '逛逛',
                platformFullName: '逛逛',
                logoSrc: require('@/static/image/logo2.png'),
                regForSubmitUrl: /^https:\/\/m.tb.cn\//g,
                howToGetHomeUrl: {
                    title: '如何获取主页链接？',
                    imgList: [{
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4857712999108597713.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5330239796079841721.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4969657846969306050.jpg",
                        },
                    ]
                },
                howToSetScreenshotCode: {
                    title: '如何设置截图验证码？',
                    imgList: [
                        {
                            step: '第一步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
                        },
                        {
                            step: '第二步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5221364346210890064.jpg",
                        },
                        {
                            step: '第三步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5720595207851836534.jpg",
                        },
                        {
                            step: '第四步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5621017114991865276.jpg",
                        },
                        {
                            step: '第五步',
                            src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5191367115746361793.jpg",
                        }
                    ]
                },
				submitContentScreenshotDemo: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5422972370838913672.png"
            },
            // {
            //     platformType: 3, // 平台类型
            //     platform: '大众点评',
            //     platformFullName: '大众点评',
            //     logoSrc: require('@/static/image/logo1.png'),
            //     regForSubmitUrl: /^https:\/\/m.dianping.com\/userprofile\//g,
            //     howToGetHomeUrl: {
            //         title: '如何获取主页链接？',
            //         imgList: [{
            //                 step: '第一步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5091533018379866908.jpg",
            //             },
            //             {
            //                 step: '第二步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4725827848494594239.jpg",
            //             }
            //         ]
            //     },
            //     howToSetScreenshotCode: {
            //         title: '如何设置截图验证码？',
            //         imgList: [
            //             {
            //                 step: '第一步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
            //             },
            //             {
            //                 step: '第二步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5241311071852248125.jpg",
            //             },
            //             {
            //                 step: '第三步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5017184230085989123.jpg",
            //             },
            //             {
            //                 step: '第四步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5509803501429349426.jpg",
            //             }
            //         ]
            //     },
            // },
            // {
            //     platformType: 4, // 平台类型
            //     platform: '微博',
            //     platformFullName: '微博',
            //     logoSrc: require('@/static/image/logo3.png'),
            //     regForSubmitUrl: /^https:\/\/weibo.com\/u\//g,
            //     howToGetHomeUrl: {
            //         title: '如何获取主页链接？',
            //         imgList: [{
            //                 step: '第一步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5061033317196548065.jpg",
            //             },
            //             {
            //                 step: '第二步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5344058383822969654.jpg",
            //             }
            //         ]
            //     },
            //     howToSetScreenshotCode: {
            //         title: '如何设置截图验证码？',
            //         imgList: [
            //             {
            //                 step: '第一步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5323003544297708489.jpg",
            //             },
            //             {
            //                 step: '第二步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4879688771193017982.jpg",
            //             },
            //             {
            //                 step: '第三步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/4738498848944015000.jpg",
            //             },
            //             {
            //                 step: '第四步',
            //                 src: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5632421330974330643.jpg",
            //             }
            //         ]
            //     },
            // }
        ]
    },
    getters: {
        // 获取当前平台类型基础数据
        getPlatformTypeItemByPlatformType: (state) => (platformType = 0) => {
            return state.platformTypeList.find(platformTypeItem => platformTypeItem.platformType === Number(platformType))
        },
        // 根据platformType获取对应平台所需要的参数值
        getPlatformItemSingleValueByPlatformTypeAndKey: (state, getters) => ({
            platformType,
            key
        }) => {
            let temoObj = getters.getPlatformTypeItemByPlatformType(platformType)
            if(temoObj) {
                return temoObj[key]
            } else {
                return undefined
            }
        },
        // 获取所有支持平台类型
        platformTypeList: state => state.platformTypeList
    }
}

export default platformType