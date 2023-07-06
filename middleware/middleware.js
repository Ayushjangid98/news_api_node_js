var jwt = require("jsonwebtoken");

const joiMiddleware = (schema, type) => {
  return (req, res, next) => {
    console.log({ headers: req.headers });
    console.log({ params: req.params });
    console.log({ body: req.body });
    console.log({ file: req.file });
    console.log({ query: req.query });
    console.log({ type: type });
    if (type == "body") {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error == null) {
        req.body = value;
        next();
      } else {
        console.log(error.details);
        return validationMiddleware(error.details, res);
      }
    }
    if (type == "query") {
      const result = schema.validate(req.query);
      const { value, error } = result;
      console.log(error);
      if (error == null) {
        req.body = value;
        next();
      } else {
        validationMiddleware(error.details, res);
      }
    }
    if (type == "params") {
      const result = schema.validate(req.params);
      const { value, error } = result;
      console.log(error);
      if (error == null) {
        req.body = value;
        next();
      } else {
        validationMiddleware(error.details, res);
      }
    }
    if (type == "file") {
      console.log("fhjvehjrhbjv");
      console.log(req.file);
      const { error, value } = schema.validate(req.file);
      console.log(value);
      console.log(error);

      if (error == null) {
        req.body = value;
        next();
      } else {
        validationMiddleware(error.details, res);
      }
    }
  };
};

const joiHeaderMiddleware = (schema) => {
  return (req, res, next) => {
    console.log(req.headers);
    const { error } = schema.validate(req.headers, { abortEarly: false });
    if (error == null) {
      const bearerHeader = req.headers["authorization"];
      const bearer = bearerHeader.split(" ");
      try {
        const decoded = jwt.verify(bearer[0], "tokenValue");
        req._id = decoded.data._id;
        next();
      } catch (error) {
        errorMiddleware("Token no longer active.", res);
      }
    } else {
      return validationMiddleware(error.details, res);
    }
  };
};

const successMiddleware = (req, response, message, token) => {
  return response.status(200).json({
    status: true,
    message: message,
    token: token,
    data: req,
  });
};

const successWithPaginationMiddleware = (
  req,
  response,
  message,
  perPageLimit,
  currentPage,
  totalPage,
  skipCount,
  totalDocumentCount,
) => {
  return response.status(200).json({
    status: true,
    message: message,
    data: req,
    pagination: {
      limit:Number(perPageLimit) ,
      currentPage: Number(currentPage),
      totalPage: totalPage,
      skipCount: skipCount,
      totalCount:totalDocumentCount
    },
  });
};

const failureMiddleware = (error, response) => {
  return response.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: error,
  });
};

const errorMiddleware = (message, response) => {
  return response.status(422).json({
    status: false,
    message: message,
  });
};
const validationMiddleware = (error, response) => {
  var data = {};
  error.map((error) => {
    data[error.context.label || error.context.key] = error.message;
  });
  return response.status(400).json({
    status: false,
    message: "Validation Errors",
    error: data,
  });
};
module.exports = {
  joiMiddleware,
  successMiddleware,
  failureMiddleware,
  validationMiddleware,
  errorMiddleware,
  joiHeaderMiddleware,
  successWithPaginationMiddleware
};
