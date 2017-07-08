if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  const config = require('./config');
  const configEnv = config[process.env.NODE_ENV];
  Object.keys(configEnv).forEach((key) => { process.env[key] = configEnv[key]; });
}
