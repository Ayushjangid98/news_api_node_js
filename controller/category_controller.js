var middleware = require("../middleware/middleware")
var category = require("../routes/validate_schema/category_schema")

exports.category = async function (request, response,) {
  if(request.file!== undefined&&request.file.filename!=null){
    category.categorySchema.findOne({"category_name": request.body.category_name }).then(async function (value) {
      console.log(value);
      if (!value) {
        const categoryData = category.categorySchema({category_name:request.body.category_name,category_image:request.file.filename});
        await categoryData.save()
        return middleware.successMiddleware(categoryData, response, "Category add successful.");
      }
      return middleware.errorMiddleware("Category name already exists.", response,);
  
    }).catch(function (error) {
      return middleware.failureMiddleware(error, response,);
    });
  }else{
    return middleware.errorMiddleware("Category images is required field.", response,);
  }
};
exports.getCategorys = async function (request, response) {
  const productItem = await category.categorySchema.find().select("-__v");
  try {
      middleware.successMiddleware(productItem, response, "Category get successfully")
  } catch (error) {
      middleware.failureMiddleware(error, response, "Something went wrong here.")
  }
};
