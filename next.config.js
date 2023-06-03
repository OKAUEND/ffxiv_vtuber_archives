const path = require('path');

/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : '';

const nextConfig = {
  reactStrictMode: true,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
  images: {
    domains: ['yt3.ggpht.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '_styles')],
  },
};

module.exports = nextConfig;
