/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : '';

const nextConfig = {
    reactStrictMode: true,
    basePath: urlPrefix,
    trailingSlash: true,
    publicRuntimeConfig: { urlPrefix },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yt3.ggpht.com',
            },
        ],
    },
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
