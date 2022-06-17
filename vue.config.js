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
  //   devServer: {
  //     proxy: "http://175.123.142.155:28887"
  // }
// ,
    devServer: {
      proxy: "http://localhost:8081/"
  }
//   devServer: {
//     proxy: {
//       "/": {
//         target: "http://175.123.142.155:28887",
//         pathRewrite: { "^/": "" },
//         changeOrigin: true,
//         secure: false
//       }
//     }
// }
    // 프록시 설정
    // proxy: {
    //   "/": {
    //     target: "http://175.123.142.155:28887",
    //     changeOrigin: true
    //   }
    // }
};
