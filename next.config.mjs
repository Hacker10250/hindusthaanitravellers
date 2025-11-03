  // next.config.ts

  const nextConfig = {
    // Image optimization configuration
    images: {
      // Define break points for responsive images
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      // These size determine the sizes of the images generated
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      /*
        Serving the image into modern formats i.e avif and webp(avif offers better compression than webp and same quality)
        if browser supports avif then next js will dynamically serve the avif image else it will serve webp image
      */
      formats: ['image/avif', 'image/webp'],
 domains: ['api.dicebear.com'],
    // it defines the the expire time of cache data in second 
    // minimumCacheTTL: 3600,
      // security feature to disable script in svg 
      dangerouslyAllowSVG: true,
      // Restricts sources to same origin and disables scripts for security
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack: (config, { dev, isServer }) => {
      const prefix = nextConfig.assetPrefix ?? nextConfig.basePath ?? '';
      
      // Video optimization configuration
      config.module.rules.push({
        test: /\.(webm|mp4)$/,
        loader: 'file-loader',
        options: {
          publicPath: `${prefix}/_next/static/videos/`,
          // Fix courtesy of https://github.com/jeremybarbet/next-videos/issues/24#issuecomment-2103003464
          outputPath: `${dev ? '' : '../'}${isServer ? '../' : ''}static/videos/`,
          name: '[name]-[hash:8].[ext]',
          // Enable video optimization
          minimize: true,
          // Enable caching
          cacheDirectory: true,
        },
      });
output:"export"
      return config;
    },

    // Enable response compression
    compress: true,
    // Configure headers for caching
    async headers() {
      return [
        {
          source: '/static/videos/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/image/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, must-revalidate',
            },
          ],
        },
      ];
    },
  };

  export default nextConfig;