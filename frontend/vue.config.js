module.exports = {
    devServer: {
        // 自动打开浏览器
        open: true,
        host: '127.0.0.1',
        port: 80,
        proxy: {
            '/backend': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/backend/(.*)': '/$1'
                }
            },
        }
    },
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static'
}