var express = require("express");
var router = express.Router();
const middlewareFunction = require("../middleware/middleware");
const upload = require("multer")();
const imageUpload = require("../middleware/image_upload");
const jsonStringifyFunction = require("../middleware/json_stringify");

/// test
const testController = require("../controller/test_controller");
/// auth
const authRequestModel = require("./request_schemas/auth_request_schema");
const authController = require("../controller/auth_controller");
/// category
const categoryRequestModel = require("./request_schemas/category_request_schema");
const categoryController = require("../controller/category_controller");
/// news
const newsRequestModel = require("./request_schemas/news_request_schema");
const newsController = require("../controller/news_controller");

/// test
router.get("/test", testController.test);

/// auth
router.post(
  "/login",
  upload.any(),
  middlewareFunction.joiMiddleware(authRequestModel.login, "body"),
  authController.login
);
router.post(
  "/register",
  upload.any(),
  middlewareFunction.joiMiddleware(authRequestModel.register, "body"),
  authController.register
);
router.get(
  "/profile",
  upload.any(),
  middlewareFunction.joiHeaderMiddleware(authRequestModel.headers),
  authController.profile
);

/// category
router.post(
  "/category",
  imageUpload.singleUpload.single("category_image"),
  middlewareFunction.joiMiddleware(categoryRequestModel.category, "body"),
  categoryController.category
);
router.get("/category", categoryController.getCategorys);

/// news

router.post(
  "/add_news",
  upload.any(),
  jsonStringifyFunction.jsonStringify(["category_ids", "source"]),
  middlewareFunction.joiMiddleware(newsRequestModel.news, "body"),
  newsController.addNews
);

router.get(
  "/news",
  newsController.getNews
);

router.get(
  "/newsByCategory/:id",
  upload.any(),
  middlewareFunction.joiMiddleware(newsRequestModel.newsId, "params"),
  newsController.getCategoryViseNews
);

module.exports = router;
