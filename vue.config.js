const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  configureWebpack: {
    resolve: {
        alias: {
            "@": path.join(__dirname, "src/")
        }
    }
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
