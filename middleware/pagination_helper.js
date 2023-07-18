var newsSchema = require("../routes/validate_schema/news_schema");

exports.paginationHelper = async (schemaModel, request , callback) => {
  var perPageLimit = request.query.limit??10
  var currentPage = request.query.page_no??1
  var totalPage = 0
  var skipCount = 0;
  try {
    var documentCount = await schemaModel.newsValidateSchema.find().count();
    totalPage = Math.ceil(documentCount/perPageLimit); 
    skipCount = ((parseInt(currentPage)-1)*parseInt(perPageLimit));
    callback(perPageLimit,currentPage,totalPage,skipCount,documentCount)
  } catch (e) {
    console.log(e);
  }
};
