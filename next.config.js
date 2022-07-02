const withPWA = require("next-pwa");

const nextConfig = {
    devIndicators: {
        autoPrerender: false,
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
    reactStrictMode: false,
}

module.exports = process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);