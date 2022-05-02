module.exports = {
  assetPrefix: "/result-chart",
  basePath: "/result-chart",
  env: {
    ...require(`./config/${process.env.APP_ENV || 'local'}.json`),
  },
};