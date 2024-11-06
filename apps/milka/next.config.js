//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const dotenv = require('dotenv');
dotenv.config()

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    NEXT_PUBLIC_REGISTER_USER_API: process.env.NEXT_PUBLIC_REGISTER_USER_API,
    NEXT_PUBLIC_REGISTER_LOGIN_API: process.env.NEXT_PUBLIC_REGISTER_LOGIN_API
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
