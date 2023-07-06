var middleware = require("../middleware/middleware");

module.exports.jsonStringify = (keys) => {
  return (req, res, next) => {
    keys.forEach((element) => {
      try {
        req.body[element] = JSON.parse(req.body[element]);
        console.log(typeof req.body.category);
      } catch (error) {}
    });
    next();
  };
};
