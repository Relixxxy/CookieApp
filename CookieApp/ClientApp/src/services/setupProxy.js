const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = (env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5216') + "/api";

const context = [
    "/users",
];

const onError = (err) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        onError: onError,
        secure: false,
        ws: true,
        headers: {
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};
