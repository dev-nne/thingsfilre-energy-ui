module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  devServer: {
    // 프록시 설정
    proxy: {
      "^/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  }
};
