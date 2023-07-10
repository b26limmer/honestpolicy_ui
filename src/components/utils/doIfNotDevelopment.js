// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;
const doIfNoDevelopment = func => {
  if (env == 'production' || env == 'staging') {
    func();
  }
};
export default doIfNoDevelopment;
