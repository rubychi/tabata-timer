const config = require('./config');

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  const configEnv = config[process.env.NODE_ENV];
  Object.keys(configEnv).forEach((key) => { process.env[key] = configEnv[key]; });
}
