module.exports = (request, response, next) => {
  // eslint-disable-next-line no-console
  console.log(`📍 ${request.method} ${request.url}`);

  return next();
};
