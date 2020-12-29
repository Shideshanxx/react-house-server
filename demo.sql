-- 查看数据库
show databases;

-- 使用某数据库
use egg;

-- 删除数据库
drop database egg;

-- 创建数据库
create database egg;

-- 创建表
use egg;  -- 先使用egg数据库
-- 创建user表，括号里面是表的字段
create table user(
  -- id字段是长度为10的int类型，不能为null，自增
  id int(10) not null auto_increment,
  -- name字段是长度为20的varchar类型（一般是字符串），不能为null，默认值是admin，注释为用户名
  name varchar(20) not null default 'admin' comment '用户名',
  pwd varchar(50) not null comment '密码',
  -- 主键设为id；每个表都应该有一个主键，并且每个表只能有一个主键。
  primary key(id)
  -- 设置表的存储引擎为InnoDB；表的编码设为utf8
) engine=InnoDB charset=utf8;

-- 查看表
show tables;

-- 查看表结构
desc user;

-- 删除表
drop table user;

-- 插入表数据
-- 这里插入的数据和表结构是一一对应的
insert into user values(1, 'user1', '123');
-- 指定插入的字段（在创建表的时候，id设定为自增，所以插入下面数据时，即使未定义id，他也会自增）
insert into user(name, pwd) values('user2', '123');

-- 查询表数据
-- *表示查询表中所有的字段
select * from user;
-- 查询表中指定字段
select id, name from user;
-- 根据要求筛选查找表数据(查询id为1的用户数据)
select id, name from user where id = 1;

-- 修改表数据
-- 修改user中，id=1对应数据的pwd值
update user set pwd = '123456' where id = 1;

-- 删除表数据
delete from user where id = 2;