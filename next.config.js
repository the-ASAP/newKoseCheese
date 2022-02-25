module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['koico.ru']
  },
  experimental: {
    scrollRestoration: true
  }
};
