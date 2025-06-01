import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// Performance optimizations
	experimental: {
		optimizePackageImports: ["@chakra-ui/react", "lucide-react"],
	},
	// Compiler optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	// Bundle analyzer and tree shaking
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.optimization.splitChunks.cacheGroups = {
				...config.optimization.splitChunks.cacheGroups,
				chakra: {
					name: "chakra",
					chunks: "all",
					test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
					priority: 30,
				},
				vendor: {
					name: "vendor",
					chunks: "all",
					test: /[\\/]node_modules[\\/]/,
					priority: 20,
				},
			};
		}
		return config;
	},
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
