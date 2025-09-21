import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
    prependData: `
    @use "@/scss/base/responsives.scss" as *;
    @use "@/scss/theme/colors.scss" as *;
   `,
  },
};

export default nextConfig;
