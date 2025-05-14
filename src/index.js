let mongoose = require("mongoose");
/**
 * mongodb:协议 http://localhost:27017/
 * */
let connection = mongoose.createConnection("mongodb://localhost:27017/school");
connection.on("error", function (error) {
  console.log("数据库连接失败: " + error);
});
connection.on("open", function (error) {
  console.log("数据库连接成功");
});
