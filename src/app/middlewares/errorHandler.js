module.exports = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return response.sendStatus(500);
};
