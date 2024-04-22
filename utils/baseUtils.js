import store from "@/store/index";
import { IMG_BASE_URL } from "@/config.js";
import express from "@/common/express.js";
const wx = require("jweixin-module");
export default {
  getUrlKey(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  },
  // 格式化价格，整数和小数分开
  SplitPrice(price = "") {
    price = Number(price).toFixed(2);
    return price.toString().split(".");
  },
  trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 价格处理
  formatPrice(price = "") {
    // 大于100则不取小数
    if (price > 100) {
      return parseInt(price);
    }
    var y = String(price).indexOf(".") + 1; //获取小数点的位置
    var count = String(price).length - y; //获取小数点后的个数
    if (count > 0) {
      return parseFloat(Number(price).toFixed(2));
    }
    return price;
  },
  randomNuber(len = 10) {
    let tempNum = parseInt((Math.random() * 9 + 1) * Math.pow(10, len - 1), 10);
    return tempNum;
  },
  stringModify(nickname = "", num = 4) {
    if (!nickname) {
      return "";
    }
    if (nickname.length > num) {
      nickname = nickname.substring(0, num) + "...";
    }
    return nickname;
  },
  showToast({ icon = "none", title = "" }) {
    uni.hideToast();
    uni.showToast({
      title: title,
      duration: 2000,
      icon: icon,
    });
  },
  showLoading({ title = "", mask = true }) {
    uni.showLoading({
      title: title,
      mask: mask,
    });
  },
  copyText(tempText) {
    let that = this;
    uni.setClipboardData({
      data: tempText,
    });
  },
  backHandler() {
    uni.navigateBack();
  },
  // 单图片预览
  previewAloneImage(src) {
    uni.previewImage({
      urls: [src],
    });
  },
  // 多图预览
  previewImage({ current = 0, urls = [] }) {
    uni.previewImage({
      current,
      urls,
    });
  },
  // 上传视频
  uploadVideo() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      uni.chooseVideo({
        sourceType: ["camera", "album"],
        success: function (res) {
          _this.showLoading({
            title: "上传中...",
          });
          const tempFilePath = res.tempFilePath;
          let { uploadVideo, loginName, screct } = store.getters.uploadUserInfo;
          uni.uploadFile({
            url: `${uploadVideo}?loginName=${loginName}&secret=${screct}`,
            name: "file",
            filePath: tempFilePath,
            success: (uploadFileRes) => {
              let { StatusCode, Message } = JSON.parse(uploadFileRes.data);
              if (StatusCode === 200) {
                resolve(Message);
              } else {
                _this.showToast({
                  title: Message,
                });
              }
            },
            complete: () => {
              uni.hideLoading();
            },
          });
        },
      });
    });
  },
  chooseImagesHandler({ count = 9 }) {
    console.log(this.isWeixinMobileBrowser())
    if (this.isWeixinMobileBrowser()) {
      return this.chooseImageByWx({ count });
    }
    return this.chooseImages({ count });
  },
  // 判断是否为微信浏览器
  isWeixinMobileBrowser() {
    // let ua = navigator.userAgent.toLowerCase();
    // return /micromessenger/.test(ua) ? true : false;
    //平台、设备和操作系统
    var system = {
      win: false,
      mac: false,
      xll: false,
      ipad: false,
    };

    //检测平台（win系统，mac系统，Linux系统，ipad）
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = p == "X11" || p.indexOf("Linux") == 0;
    system.ipad = navigator.userAgent.match(/iPad/i) != null ? true : false;

    //检测微信
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.match(/MicroMessenger/i) == "micromessenger";

    if (system.win || system.mac || system.xll || system.ipad) {
      // console.log("pc");//pc
      return false
    } else {
      // console.log("mobile");//手机浏览器
      if (isWeixin) {
        return true
      }
      return false
    }
  },
  // 适用于 h5 上传图片(单张)
  chooseImage() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function (chooseImageRes) {
          _this.showLoading({
            title: "上传中...",
          });
          const tempFilePaths = chooseImageRes.tempFilePaths;
          let { uploadUrl, loginName, screct } = store.getters.uploadUserInfo;
          uni.uploadFile({
            url: `${uploadUrl}?loginName=${loginName}&secret=${screct}`,
            name: "file",
            filePath: tempFilePaths[0],
            success: (uploadFileRes) => {
              let { StatusCode, Message } = JSON.parse(uploadFileRes.data);
              if (StatusCode === 200) {
                resolve(IMG_BASE_URL + Message);
              } else {
                _this.showToast({
                  title: Message,
                });
              }
            },
            complete: () => {
              uni.hideLoading();
            },
          });
        },
      });
    });
  },
  // 适用于 h5 上传图片（多张）
  chooseImages({ count = 9 }) {
    let _this = this;
    let imgsNum = 0; // 一共需要保存几张图
    let errNum = 0; // 失效几张

    return new Promise(function (resolve, reject) {
      uni.chooseImage({
        count: count,
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function (chooseImageRes) {
          _this.showLoading({
            title: "上传中...",
          });
          const tempFilePaths = chooseImageRes.tempFilePaths;
          let { uploadUrl, loginName, screct } = store.getters.uploadUserInfo;
          let tempPicsList = [];
          let flagIndex = 0;
          imgsNum = tempFilePaths.length;
          for (let [key, val] of tempFilePaths.entries()) {
            uni.uploadFile({
              url: `${uploadUrl}?loginName=${loginName}&secret=${screct}`,
              name: "file",
              filePath: val,
              success: (uploadFileRes) => {
                console.log(key, val);
                flagIndex++;
                let { StatusCode, Message } = JSON.parse(uploadFileRes.data);
                if (StatusCode === 200) {
                  // tempPicsList = [...tempPicsList, IMG_BASE_URL + Message]
                  tempPicsList[key] = IMG_BASE_URL + Message;
                } else {
                  errNum++;
                }
                if (flagIndex === imgsNum) {
                  uni.hideLoading();
                  _this.showToast({
                    title: `上传${imgsNum}张图，成功${
                      imgsNum - errNum
                    },失败${errNum}张`,
                  });
                  resolve(
                    tempPicsList.filter((val) => {
                      return val;
                    })
                  );
                }
              },
            });
          }
        },
      });
    });
  },
  chooseImageByWx({ count = 9 }) {
    let _this = this;
    let imgsNum = 0; // 一共需要保存几张图
    let errNum = 0; // 失效几张

    return new Promise(function (resolve, reject) {
      wx.chooseImage({
        count: count,
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: async (chooseImageRes) => {
          const { localIds } = chooseImageRes;
          _this.showLoading({
            title: "上传中...",
          });
          let tempPicsList = [];
          let flagIndex = 0;
          imgsNum = localIds.length;
          for (let [key, val] of localIds.entries()) {
            const localData = await _this.getLocalImgDataHandler(val);
            const uploadFileRes = await _this.uploadImageHandler(localData);
            flagIndex++;
            let { StatusCode, Message } = JSON.parse(uploadFileRes.data);
            if (StatusCode === 200) {
              // tempPicsList = [...tempPicsList, IMG_BASE_URL + Message]
              tempPicsList[key] = IMG_BASE_URL + Message;
            } else {
              errNum++;
            }
            if (flagIndex === imgsNum) {
              uni.hideLoading();
              _this.showToast({
                title: `上传${imgsNum}张图，成功${
                  imgsNum - errNum
                },失败${errNum}张`,
              });
              resolve(
                tempPicsList.filter((uploadFileRes) => {
                  return uploadFileRes;
                })
              );
            }
          }
        },
      });
    });
  },
  getLocalImgDataHandler(localId) {
    return new Promise((resolve, reject) => {
      wx.getLocalImgData({
        localId: localId, // 图片的localID
        success: function (res) {
          let { localData } = res;
          if (localData.indexOf("data:image") != 0) {
            //判断是否有这样的头部
            localData = "data:image/jpeg;base64," + localData;
          }
          localData = localData
            .replace(/\r|\n/g, "")
            .replace("data:image/jgp", "data:image/jpeg");
          resolve(localData);
        },
      });
    });
  },
  uploadImageHandler(filePath) {
    return new Promise((resolve, reject) => {
      let { uploadUrl, loginName, screct } = store.getters.uploadUserInfo;
      console.log(filePath);
      uni.uploadFile({
        url: `${uploadUrl}?loginName=${loginName}&secret=${screct}`,
        name: "file",
        filePath: filePath,
        success: function (uploadFileRes) {
          resolve(uploadFileRes);
        },
      });
    });
  },
  navBack() {
    uni.navigateBack();
  },
  navToHome(isRefresh = true) {
    uni.switchTab({
      url: `/pages/Index/index`,
    });
    if (isRefresh) {
      uni.$emit("updateHomePage", {
        msg: "更新首页",
      });
    }
  },
  navigateToHandler(tempUrl) {
    uni.navigateTo({
      url: tempUrl,
    });
  },
  switchTabHandler(tempUrl) {
    uni.switchTab({
      url: tempUrl,
    });
  },
  // 状态格式化
  statusFilter(status = 0) {
    /**
     *     待审核(0),
     *     审核通过(1),
     *     审核不通过(2)
     */
    let str = "";
    let customStyle = "";
    switch (status) {
      case 0:
        str = "待审核";
        customStyle =
          "background-color: #fceeee; border-color: #fceeee; color: #f23030;";
        break;
      case 1:
        str = "审核通过";
        customStyle =
          "background-color: #07c160; border-color: #07c160; color: #ffffff;";
        break;
      case 2:
        str = "审核不通过";
        customStyle =
          "background-color: #cccccc; border-color: #cccccc; color: #ffffff;";
        break;
    }
    return {
      str,
      customStyle,
    };
  },
  normalErrMsgHandler(err) {
    let _this = this;
    if (err.Msg || err.ErrMsg) {
      _this.showToast({
        title: err.Msg || err.ErrMsg,
      });
    }
  },
  // 深拷贝
  deepCopy(obj) {
    return Object.assign({}, obj);
  },
  windowOpen({ url = "", name = "_blank" }) {
    if (url === "") return;
    window.open(url, name);
  },
  // 截取视频第一帧作为封面图 然后转成base64
  getVideoBase64(url) {
    try {
      return new Promise(function (resolve) {
        let dataURL = "";
        const video = document.createElement("video");
        video.setAttribute("crossOrigin", "anonymous"); // 处理跨域
        video.setAttribute("src", url);
        video.setAttribute("preload", "auto");
        video.addEventListener("loadeddata", function () {
          const canvas = document.createElement("canvas");
          const width = video.videoWidth || 400; // canvas的尺寸和图片一样
          const height = video.videoHeight || 240; // 设置默认宽高为  400  240
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(video, 0, 0, width, height); // 绘制canvas
          dataURL = canvas.toDataURL("image/jpeg"); // 转换为base64
          resolve(dataURL);
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  filterComCode(tempComCode) {
    for (let i = 0; i <= express.list.length - 1; i++) {
      const { data } = express.list[i];
      for (let j = 0; j <= data.length - 1; j++) {
        const { comCode } = data[j];
        if (comCode === tempComCode) {
          return data[j];
        }
      }
    }
  },
  isMainNode(nodeInfo) {
    const { status } = nodeInfo;
    for (let i = 0; i < express.stateList.length - 1; i++) {
      const { parentStatusName } = express.stateList[i];
      if (status === parentStatusName) {
        return express.stateList[i];
      }
    }
    return null;
  },
  isLink(url) {
    var pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }
};
