/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {dev}) => { // Only needed on windows
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            }
        }
        return config;
    },
    output: 'standalone',
};

export default nextConfig;
