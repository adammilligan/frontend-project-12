const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  addErrorContext: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  captureIp: true,
};

export default rollbarConfig;
