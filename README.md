# mongodb-study

## 1. MongoDB 基本概念

- **数据库** MongoDB 的单个实例可以容纳多个独立的数据库，比如一个学生管理系统就可以对应一个数据库实例
- **集合** 数据库是由集合组成的,一个集合用来表示一个实体,如学生集合
- **文档** 集合是由文档组成的，一个文档表示一条记录,比如一位同学张三就是一个文档

|        `Mongodb`         |        `mysql`        |
| :----------------------: | :-------------------: |
| `MongoDB`自动将\_id 字段 |   primary key(主建)   |
|     `MongoDB`不支持      | table joins（表连接） |
|      index（索引）       |     index（索引）     |
|       field（域）        |  数据字段（column）   |
|     文档（document）     |      记录（row）      |
|    集合（collection）    |      表（table）      |
|    数据库（database）    |  数据库（database）   |

## 2.数据库操作

通过 MongoDB Shell（mongosh）是用于与 MongoDB 交互的命令行界面

### 2.1 连接数据库

**命令**

```sql
 mongosh --host localhost --port 27017
```

连接成功以后需要登录，不然会报错。

### 2.2 切换数据库

**语法**

```sql
use database_name
```

- database_name 代表数据库的名字

- 注：如果此数据库存在，则切换到此数据库下,如果此数据库还不存在也可以切过来,但是并不能立刻创建数据库

```sql
use school
```

**报错**

`MongoServerError`[Unauthorized]: command listDatabases requires authentication

表示你没有进行身份验证，因此没有权限列出数据库

### 2.3 登录

**语法**

```sql
db.auth('admin', 'password')
```

这将使用用户名 `admin` 和密码 `password` 来进行认证。如果认证成功，你将能够执行 `show dbs` 等命令。

**查看用户**

```sql
 show users

 #结果
 [
  {
    _id: 'admin.admin',
    userId: UUID('7991bf43-7a0e-4b11-85f5-28257a74354f'),
    user: 'admin',
    db: 'admin',
    roles: [ { role: 'root', db: 'admin' } ],
    mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
  }
]
```

### 2.4 查看所有数据库

**语法**

```sql
show  dbs
```

- 我们刚创建的数据库`school`如果不在列表内， 要显示它，我们需要向`school`数据库插入一些数据

**数据库插入数据**

```SQL
db.students.insert({name:'sunmeng',age:18});

# 成功结果
{
  acknowledged: true,
  insertedIds: { '0': ObjectId('682022a624ab17f708d861e0') }
}
```

**数据查询**

```sql
# 语法 （会返回这个集合中的所有文档）
db.students.find()
# 返回结果

[
  {
    _id: ObjectId('682022a624ab17f708d861e0'),
    name: 'sunmeng',
    age: 18
  }
]
#_id如果没有传,会自动生成的。传了就使用传入的_id
```

- `db`：指当前使用的数据库实例。

- `students`：表示数据库中的一个集合（相当于关系型数据库中的“表”）。在这个例子中，`students` 是一个集合的名称。

- `find()`：是一个查询操作，用于从集合中检索文档。`find()` 方法返回集合中符合条件的文档。

**再次查看数据库**

```sql
school> show  dbs
#结果会多 school
admin   100.00 KiB
config   72.00 KiB
local    72.00 KiB
school   40.00 KiB
```

### 2.5 查看所有数据库

**语法**

```sql
# 语法
db
school> db
# 结果
school
```

db 代表的是当前数据库 也就是 school 这个数据库

### 2.6 删除数据库

**语法**

```sql
#删除当前数据库
db.dropDatabase()
# 删除成功返回结果
{ ok: 1, dropped: 'school' }
# 查看所有的数据库
school> show dbs
admin   100.00 KiB
config  108.00 KiB
local    72.00 KiB
# school 被删除
```

## 3.集合操作

### 3.1 查看集合命令

**语法**

```sql
db.students.help();

```

#### 基本操作

- **aggregate**：用于对集合或视图中的数据进行聚合运算（例如，统计、分组等）。
- **`bulkWrite`**：执行多个写操作，允许控制执行顺序，可以批量处理多个插入、更新、删除操作。
- **count**：返回会匹配 `find()` 查询的文档数量，但不包含实际的文档数据。
- **countDocuments**：返回符合查询条件的文档数量。
- **deleteMany**：删除集合中所有符合查询条件的文档。
- **deleteOne**：删除集合中符合查询条件的第一个文档。
- **distinct**：返回指定字段的所有不同值，以数组的形式返回。
- **estimatedDocumentCount**：返回集合中所有文档的估计数量（性能较好，但不一定精准）。
- **find**：查询集合中的文档，可以带条件。
- **findAndModify**：对文档进行修改，并返回修改前或修改后的文档。
- **findOne**：查询集合中的单个文档（符合条件的第一条文档）。
- **renameCollection**：重命名集合。
- **findOneAndDelete**：根据条件查找并删除单个文档，返回被删除的文档。
- **findOneAndReplace**：根据条件查找并替换单个文档，返回被替换的文档。
- **findOneAndUpdate**：根据条件查找并更新单个文档，返回更新前或更新后的文档。
- **insert**：插入一个文档或多个文档。
- **insertMany**：插入多个文档。
- **insertOne**：插入单个文档。
- **isCapped**：检查集合是否是一个“固定集合”，即大小固定的集合。
- **remove**：从集合中删除符合条件的文档。
- **replaceOne**：替换集合中的单个文档，按照指定条件。
- **update**：修改集合中一个或多个文档。
- **updateMany**：更新所有符合指定过滤条件的文档。
- **updateOne**：更新集合中的单个文档。

#### 索引和查询优化

- **createIndexes**：创建一个或多个索引。
- **createIndex**：创建一个索引。
- **ensureIndex**：为集合创建索引，通常是 `createIndex` 的别名（较旧的命令）。
- **getIndexes**：返回一个数组，列出集合中现有的所有索引。
- **getIndexSpecs**：获取集合中现有索引的详细信息（与 `getIndexes` 等价）。
- **getIndexKeys**：返回集合中所有索引的键模式（即索引的字段）。
- **dropIndexes**：删除一个或多个索引（不能删除 `_id` 字段的索引）。
- **dropIndex**：删除指定的索引。
- **totalIndexSize**：返回集合中所有索引的总大小。
- **reIndex**：重建集合中所有现有索引。
- **hideIndex**：从查询规划器中隐藏某个索引。
- **unhideIndex**：取消隐藏一个索引。

### 3.2 创建集合

**语法**

```sql
db.createCollection(collection_Name)
```

- collection_Name 集合的名称

**使用**

```sql
# 查看数据库下的集合
school> show collections
# 返回结果
students
school> db.createCollection(myName)
ReferenceError: myName is not defined
#创建一个myName空集合
school> db.createCollection("myName")
# 返回结果
{ ok: 1 }
# 查看数据库下的集合
school> show collections
# 返回结果
myName
students
school>
```

### 3.3 创建集合并插入一个文档

- collection_Name 集合的名称

- document 要插入的文档

```SQL
db.collection_Name.insert(document)
```

**使用**

```sql
 #往myName集合插入文档
 db.myName.insert({_id:123,name:'zhangsan',age:18});
 # 查看myName集合
 school> db.myName.find()
[ { _id: 123, name: 'zhangsan', age: 18 } ]
```

## 4.文档操作

### 4.1 插入文档（insert）

```sql
# 语法
db.collection_name.insert(document);
```

- collection_name 集合的名字
- document 插入的文档

每当插入一条新文档的时候`mongodb`会自动为此文档生成一个`_id`属性,\_id 一定是唯一的，用来唯一标识一个文档 \_id 也可以直接指定，但如果数据库中此集合下已经有此\_id 的话插入会失败

**使用**

```sql
 # 插入_id:123相同
 db.myName.insert({_id:123,name:'zhangsan',age:18});
Uncaught:
# 报错(MongoBulkWriteError:E11000重复密钥错误集合)
MongoBulkWriteError: E11000 duplicate key error collection: school.myName index: _id_ dup key: { _id: 123 }
Result: BulkWriteResult {
  insertedCount: 0,
  matchedCount: 0,
  modifiedCount: 0,
  deletedCount: 0,
  upsertedCount: 0,
  upsertedIds: {},
  insertedIds: {}
}
```

### 4.2 更新文档（update）

```sql
# 语法
db.collection.updateOne(
  <query>,           // 查询条件
  <update>,           // 更新操作
  <options>           // 可选的额外选项
);
```

- query ：查询条件,指定要更新符合哪些条件的文档
- update： 更新后的对象或指定一些更新的操作符
  - $set 直接指定更新后的值
  - $inc 在原基础上累加
- options：可选的额外选项
  - upsert 可选，这个参数的意思是，如果不存在符合条件的记录时是否插入 updateObj. 默认是 false,不插入
  - multi 可选，mongodb 默认只更新找到的第一条记录，如果这个参数为 true,就更新所有符合条件的记录。

**使用**

```sql
# 修改 age
school> db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$set: { age: 35}});
# 成功返回
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
# 查看
school> db.myName.find()
[ { _id: 123, name: 'zhangsan', age: 35 } ]


```

```sql
# 查看
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 35 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 18 }
]

school> db.myName.update({name:'zfpx2'},{$set:{age:10}},{multi:true});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
```

**upsert 参数**

```sql
# 查询
school>db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 35 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
# 如果不存在符合条件的记录时是否插入updateObj.
school> db.myName.update({_id:2},{$set:{name:'王五'}},{upsert:true});
{
  acknowledged: true,
  insertedId: 2,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 1
}
#   多一条{ _id: 2, name: '王五' }
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 35 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 },
  { _id: 2, name: '王五' }
]
```

### 4.3 删除文档

```sql
# 语法
db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)
```

- query :（可选）删除的文档的条件
- justOne : （可选）如果设为 true 或 1，则只删除匹配到的多个文档中的第一个

**使用**

```sql
# 删除 name = 王五
school> db.myName.deleteOne({  name: '王五' });
# 成功返回
{ acknowledged: true, deletedCount: 1 }
# 查看
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 35 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

### 4.4 更新操作符

#### 4.4.1 $set

**直接指定更新后的值**

```sql
# 属性有就直接修改，age修改1000
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$set: { age: 10000}})
#查询
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 10000 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

```sql
# 属性没有
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$set: { num: 123}})
#查询
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 10000,num:123 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.2 $inc

在原基础上累加

```sql

school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$inc: { age: 22}})
#age从 10000变成10022
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', age: 10022 },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.3 $unset

**删除指定的键**

```sql
# 删除 age
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$unset: { age: 33}})
# 返回 _id:123.age 没有
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan' },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.4 $push

**向数组中添加元素**

```sql
# 如果没有，sex的key会创建
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$push: { sex: '男'}})
# 返回
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男' ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

```sql
# 如果有，sex的key。会往属性值添加
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$push: { sex: '2'}})
# 返回
school> db.myName.find()
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', '2' ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.5$ne

**`$ne`：不等于操作符**

**$ne 类似于 MYSQL 的 `not in` 或者`not exists`**

```sql
# 查询name值不等于李四
school> db.myName.find({name:{$ne:'李四'}})
# 返回
[ { _id: 123, name: '', sex: [ '男', '2' ] } ]
```

#### 4.4.6 $addToSet

**向集合中添加元素**

```sql
#和$push 一样。没有age属性。会添加。值为数组
 db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$addToSet: { age:123}})
 # 返回
 school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', '2' ], age: [ 123 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]

```

```sql
#和$push 一样。有age属性。在值后面追加
 db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$addToSet: { age:456}})
 # 返回
 school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', '2' ], age:  [ 123, 456 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

**区别总结：**

- **`$push`**：允许添加重复元素到数组中。
- **`$addToSet`**：确保数组中没有重复元素，只会在数组中不存在该元素时添加。

```sql
# 查询
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', '2' ], age: [ 123, 456 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
# 通过$addToSet操作添加相同的值。
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$addToSet: { age:123}})
# 结果不变
school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', '2' ], age: [ 123, 456 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

```sql
# 查看
school> db.myName.find()
[
  {
    _id: 123,
    name: 'zhangsan',
    sex: [ '男', '2', 2 ],
    age: [ 123, 456 ]
  },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
# 通过$push 添加相同值，会在末尾添加
school>  db.myName.updateOne({_id: 123, name: 'zhangsan'}, {$push : { sex:"2"}})
school> db.myName.find()
[
  {
    _id: 123,
    name: 'zhangsan',
    sex: [ '男', '2', 2, '2' ],
    age: [ 123, 456 ]
  },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

**#### 4.4.6 $pull**

**向集合中删除元素**

```sql
# 删除 sex属性，值为‘2’
school> db.myName.updateOne(
   { _id: 123, name: 'zhangsan' },
   { $pull: { sex: '2' } }
 );
 # 返回结果
 school> db.myName.find()
[
  { _id: 123, name: 'zhangsan', sex: [ '男', 2 ], age: [ 123, 456 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.7$each

**向集合中删除元素**

```sql
# 语法
{ $push: { field: { $each: [value1, value2, ...] } } }
{ $addToSet: { field: { $each: [value1, value2, ...] } } }
# 使用
 db.myName.updateOne(
   { _id: 123 },
   { $push: { age: { $each: [789, 1011] } } }
 );
 # 使用
school> db.myName.find()
[
  {
    _id: 123,
    name: 'zhangsan',
    sex: [ '男', 2 ],
    age: [ 123, 456, 789, 1011 ]
  },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

#### 4.4.8 $pop

它可以从数组的**两端**（即数组的开始或结束）删除一个元素。

- `field`：表示要更新的数组字段。
- `<1 or -1>`：`1` 表示从数组的 **末尾** 删除元素，`-1` 表示从数组的 **开头** 删除元素。

```sql
{ $pop: { field: <1 or -1> } }

# 使用
school> db.myName.updateOne(
   { _id: 123 },
   { $pop: { age: 1 } }
);

# 返回结果
[
  {
    _id: 123,
    name: 'zhangsan',
    sex: [ '男', 2 ],
    age: [ 123, 456, 789 ]
  },
  { _id: ObjectId('6820594624ab17f708d861e2'), name: '李四', age: 10 }
]
```

### 4.5 查看操作符

**查询指定列**

```sql
// 语法
db.collection_name.find({queryWhere},{key:1,key:1})
```

- collection_name 集合的名字

- queryWhere 参阅查询条件操作符
- key 指定要返回的列
- 1 表示要显示

```sql
# 使用
school>   db.myName.find({},{age:1})
#返回数据包含_id和age
[
  { _id: 123, age: [ 123, 456, 789 ] },
  { _id: ObjectId('6820594624ab17f708d861e2'), age: 10 }
]
```

####  4.5.1$in

**查询字段在某个范围内**
