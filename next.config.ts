import {NextConfig} from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg')
        );

        if (!fileLoaderRule) {
            throw new Error('SVG file loader rule not found');
        }

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude if *.svg?url
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ext: 'tsx',
                        },
                    },
                ],
            }
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default nextConfig;
