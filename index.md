docker ps

// 进入容器
docker exec -it lego-mongodb bash

// 通过 mongosh 连接 mongodb 服务
mongosh --host localhost --port 27017

db.auth('admin', 'admin1234')
db.auth('schoolAdmin', 'admin1234')
mongodb 天然支持分布式

客户端并发量过大

1. 带宽不够
2. 数据量太大
   [
   {
   \_id: 'admin.admin',
   userId: UUID('7991bf43-7a0e-4b11-85f5-28257a74354f'),
   user: 'admin',
   db: 'admin',
   roles: [ { role: 'root', db: 'admin' } ],
   mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
   },
   {
   \_id: 'admin.schoolAdmin',
   userId: UUID('5ea7b937-3a3f-4ffa-8f0c-aec7b26a558b'),
   user: 'schoolAdmin',
   db: 'admin',
   roles: [ { role: 'readWrite', db: 'school' } ],
   mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
   }
   ]
