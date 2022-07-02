const withPWA = require("next-pwa");

const nextConfig = {
    devIndicators: {
        autoPrerender: false,
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === "development",
    },
    reactStrictMode: false,
}

module.exports = withPWA(nextConfig);