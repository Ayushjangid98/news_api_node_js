const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/// validate scaema
var newsSchema = Schema(
  {
    author: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    url: { type: String, require: true },
    urlToImage: { type: String, require: true },
    publishedAt: { type: String, require: true },
    content: { type: String, require: true },
    source: { type: Object, require: true },
    category_ids: [{type: Schema.Types.ObjectId, ref: 'category_table'}]
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);
newsSchema.virtual("categories", {
  ref: "category_table",
  localField: "category_ids", 
  foreignField: "_id", 
});

module.exports.newsValidateSchema = mongoose.model("news_table", newsSchema);
