const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// validate scaema
var categorySchema = Schema({
    category_name :{type : String , require : true , unique:true },
    category_image :{type : String , require : true },
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
})

categorySchema.virtual('category_image_full_url').get(function () {
    return  'http://localhost:3000/' + this.category_image;
});
module.exports.categorySchema = mongoose.model("category_table", categorySchema);

