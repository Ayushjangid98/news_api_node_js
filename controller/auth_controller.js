var middleware = require("../middleware/middleware")
var user = require("../routes/validate_schema/auth_schema")
var jwt = require("jsonwebtoken")

exports.login = async function (request, response,) {
    user.userModel.findOne({ "email": request.body.email }).then(async function (value) {
        if (value) {
            var tokenValue = jwt.sign({data: value}, "tokenValue",{ expiresIn: 60 * 60 }); 
            return middleware.successMiddleware(value, response, "Your are login successfully.", tokenValue);

        }
        return middleware.errorMiddleware("You are no register with us.", response,);

    }).catch(function (error) {
        return middleware.failureMiddleware(error, response,);
    });

};

exports.register = async function (request, response,) {
    user.userModel.findOne({ "email": request.body.email }).then(async function (value) {
        console.log(value);
        if (!value) {
            const userData = user.userModel(request.body);
            await userData.save()
            return middleware.successMiddleware(userData, response, "your registration is successful.");
        }
        return middleware.errorMiddleware("email number already exists.", response,);

    }).catch(function (error) {
        return middleware.failureMiddleware(error, response,);
    });
};
exports.profile =  function (request, response,) {
  try{
    console.log(request._id)
    user.userModel.findOne({ "_id": request._id }).then(async function (value) {
        if (!value) {
            return middleware.errorMiddleware("You are no register with us.", response,);
        }
        return middleware.successMiddleware(value, response,);

    }).catch(function (error) {
        return middleware.failureMiddleware(error, response,);
    });
  }catch (error) {
    console.log(error);
    return middleware.failureMiddleware("You are no register with us.", response,);
}
};