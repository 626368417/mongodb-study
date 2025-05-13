docker ps

docker exec -it lego-mongodb mongo
// 进入容器
docker exec -it lego-mongodb bash

// 通过 mongosh 连接 mongodb 服务
mongosh --host localhost --port 27017

db.auth('admin', 'admin1234')

mongodb 天然支持分布式

客户端并发量过大

1. 带宽不够
2. 数据量太大
