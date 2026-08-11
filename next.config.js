/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "res.cloudinary.com",
        "images.unsplash.com",
        "plus.unsplash.com",
        "localhost"
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "plus.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during the build
    },
    typescript: {
      // Optional: to disable TypeScript type checking during builds
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;

  // /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             "res.cloudinary.com"
//         ]
//     }
// }

// module.exports = nextConfig
