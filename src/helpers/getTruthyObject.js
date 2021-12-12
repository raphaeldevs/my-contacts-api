/**
 * This parse object to return only properties that are a truthy value.
 */
function getTruthyObject(object) {
  const parsedObject = Object.entries(object).reduce((parsedObject, entrie) => {
    if (entrie.every(Boolean)) {
      const [key, value] = entrie;

      Object.assign(parsedObject, { [key]: value });
    }

    return parsedObject;
  }, {});

  return parsedObject;
}

module.exports = getTruthyObject;
