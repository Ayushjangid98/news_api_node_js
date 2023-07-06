var middleware = require("../middleware/middleware");
var newsSchema = require("../routes/validate_schema/news_schema");
var categoryModelSchema = require("../routes/validate_schema/category_schema");
var paginationHelper = require("../middleware/pagination_helper");
exports.addNews =async function (request, response) {
  try {
    console.log(request.body.category);
    const newsData =await newsSchema.newsValidateSchema(request.body).populate({path: 'categories'});
    await newsData.save();
    return middleware.successMiddleware(newsData,response,"News add successful.");
  } catch (e) {
    return middleware.failureMiddleware(e,response,"Something went wrong here."
    );
  }
};
exports.getNews =async function (request, response) {
  try {
    paginationHelper.paginationHelper(newsSchema,request,async(perPageLimit,currentPage,totalPage,skipCount,documentCount)=>{
      const newsData = await newsSchema.newsValidateSchema.find().skip(skipCount).limit(perPageLimit).populate({path: 'categories'});
      return middleware.successWithPaginationMiddleware(newsData,response,"News get successful.",perPageLimit,currentPage,totalPage,skipCount,documentCount);
    })

  } catch (e) {
    return middleware.failureMiddleware(e,response,"Something went wrong here."
    );
  }
};

exports.getCategoryViseNews =async function (request, response) {
  try {
    console.log(request.params.id);
    const newsData =await newsSchema.newsValidateSchema.find({"category_ids": {$in : [request.params.id]}}).populate({path: 'categories'});
    return middleware.successMiddleware(newsData,response,"News add successful.");
  } catch (e) {
    return middleware.failureMiddleware(e,response,"Something went wrong here."
    );
  }
};

