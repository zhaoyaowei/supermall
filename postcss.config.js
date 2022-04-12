module.exports = {
  plugins: {
    autoprefixer: {}, //给不同的浏览器添加前缀
    "postcss-px-to-viewport": {
      unitToConvert: 'px', //需要转换的单位
      viewportWidth: '375', //视窗的宽度，对应设计稿的宽度 理想视口宽度为375
      viewportHeight: '667',//视窗的高度，对应设计搞的高度
      viewportUnit: 'vw',//转换的视窗单位
      selectorBlackList: ['ignore','tab-bar'], // 指定不需要转换的类
      minPixelValue: 1,//小于或者等于1px 不转换
      mediaQuery: false,//是否允许媒体查询中转换px
      unitPrecision: 5,//转换后的精度，即小数点
      exclude:[/TabBar/]
    }
  }
}


// 1.在js中使用正则：/正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则：
  // a. ^abc : 表示匹配的内容，必须是以什么开头
  // b. abc$ : 表示匹配的内容，必须是以什么内容结尾