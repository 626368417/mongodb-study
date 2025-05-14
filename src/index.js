let mongoose = require("mongoose");
/**
 * mongodb:协议 http://localhost:27017/
 * schoolAdmin:账号
 * admin1234:密码
 * school:数据库
 * */
let connection = mongoose.createConnection(
  "mongodb://schoolAdmin:admin1234@localhost:27017/school"
);

// 定义一个schema,g规定了一个集合中文档的属性名和属性的类型
//  一个Schmea对应一个集

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// 定义数据库的操作模型
let User = connection.model("User", UserSchema);

async function createUser() {
  try {
    //往集合插入数据
    const result = await User.create({ username: "张三", age: 10 });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

createUser();
