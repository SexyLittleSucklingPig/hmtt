module.exports = {
  plugins: {
    // rem适配
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 除了vant 和 github-markdown-css 都除以75
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // 设置那些类名可以转换
      propList: ['*']
    }
  }
}
