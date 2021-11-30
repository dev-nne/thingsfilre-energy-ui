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
      proxy: {
          "/api": {
              target: "http://localhost:8080" // 개발서버
          },
          "/comp": {
            target: "http://175.123.142.155:28887" // 개발서버
        }
      }
  }
    // 프록시 설정
    // proxy: {
    //   "/": {
    //     target: "http://175.123.142.155:28887",
    //     changeOrigin: true
    //   }
    // }
};
