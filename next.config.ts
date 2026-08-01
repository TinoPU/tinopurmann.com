import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // Keep the checked-in ffmpeg binaries out of serverless traces.
    // They are ~150MB and blow Vercel's function size limit; voice notes
    // are temporarily disabled in the UI anyway.
    outputFileTracingExcludes: {
        "*": ["./bin/**/*"],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
                pathname: '/**',
            },
        ],
    },

};

export default nextConfig;
