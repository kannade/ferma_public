module.exports = {
    apps: [
      {
        name: 'LB_BACK',
        script: '/home/nick/luckberry_back/dist/src/server.js',
        env: {
          COMMON_VARIABLE: 'true'
        },
        env_dev: {
          NODE_ENV: 'dev',
          dotenv_config_path: '/home/nick/luckberry_back/dist/src/env/.dev.env'
        },
        env_prod: {
          NODE_ENV: 'prod',
          dotenv_config_path: '/home/nick/luckberry_back/dist/src/env/prod.env'
        }
      }
    ]
  };