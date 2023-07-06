const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// validate scaema
var userSchema = Schema({
    name :{type : String , require : true },
    mobile_no : { type:  String, require : true , max:10},
    email:{ type: String , require : true},
    password:{ type: String , require : true},
    confirm_password:{ type: String , require : true},
})
module.exports.userModel = mongoose.model("user_table", userSchema);
