module.exports = {
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      },
      '/api/getip.php': {
        target: 'http://tools.2345.com',
        changeOrigin: true
      },


    }
  }
}