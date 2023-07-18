var middleware = require("../middleware/middleware");
var user = require("../routes/validate_schema/auth_schema");
var jwt = require("jsonwebtoken");
var twilioHelper = require("../db_helper/twilio_helper");

exports.login = function (request, response) {
  user.userModel
    .findOne({ email: request.body.email })
    .then(function (value) {
      if (value) {
        try {
          var tokenValue = jwt.sign({ data: value }, "tokenValue", {
            expiresIn: 60 * 60,
          });
          twilioHelper.sendSms(
            value.mobile_no,
            "Welcome to the news app, Enjoy the latest and current news with the news app.",
            function (error, data) {
              if (error) {
                return middleware.failureMiddleware(error, response);
              }
              console.log(data);
              return middleware.successMiddleware(
                value,
                response,
                "Your are login successfully.",
                tokenValue
              );
            }
          );
        } catch (e) {
          return middleware.failureMiddleware(error, response);
        }
      }
      return middleware.errorMiddleware(
        "You are no register with us.",
        response
      );
    })
    .catch(function (error) {
      return middleware.failureMiddleware(error, response);
    });
};

exports.register = async function (request, response) {
  user.userModel
    .findOne({ email: request.body.email })
    .then(async function (value) {
      console.log(value);
      if (!value) {
        const userData = user.userModel(request.body);
        await userData.save();
        return middleware.successMiddleware(
          userData,
          response,
          "your registration is successful."
        );
      }
      return middleware.errorMiddleware(
        "email number already exists.",
        response
      );
    })
    .catch(function (error) {
      return middleware.failureMiddleware(error, response);
    });
};
exports.profile = function (request, response) {
  try {
    console.log(request._id);
    user.userModel
      .findOne({ _id: request._id })
      .then(async function (value) {
        if (!value) {
          return middleware.errorMiddleware(
            "You are no register with us.",
            response
          );
        }
        return middleware.successMiddleware(value, response);
      })
      .catch(function (error) {
        return middleware.failureMiddleware(error, response);
      });
  } catch (error) {
    console.log(error);
    return middleware.failureMiddleware(
      "You are no register with us.",
      response
    );
  }
};
