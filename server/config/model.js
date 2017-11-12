var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize(config.database,config.username,config.password,{
  host:config.host,
  dialect: 'mysql',
})

const Users = sequelize.define('users',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName:Sequelize.STRING,
  userPwd:Sequelize.STRING,
  isDelete:Sequelize.INTEGER,
});
const Goods = sequelize.define('goods',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productName:Sequelize.STRING,
  salePrice:Sequelize.STRING,
  productImage:Sequelize.STRING,
  productUrl:Sequelize.STRING,
  isDelete:Sequelize.INTEGER,
});

const Address = sequelize.define('address',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName:Sequelize.STRING,
  streetName:Sequelize.STRING,
  postCode:Sequelize.STRING,
  tel:Sequelize.STRING,
  isDefault: Sequelize.INTEGER,
  isDelete:Sequelize.INTEGER,
});
Address.belongsTo(Users)

const CartList = sequelize.define('cartList',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productNum:Sequelize.INTEGER,
  isDelete:Sequelize.INTEGER,
})
CartList.belongsTo(Users);
CartList.belongsTo(Goods);

const OrderList = sequelize.define('orderList',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderStatus:Sequelize.STRING,
  isDelete:Sequelize.INTEGER,
})
OrderList.belongsTo(Users);
OrderList.belongsTo(Goods);
OrderList.belongsTo(Address);
//sequelize.sync();

module.exports = {
  Users,
  Goods,
  CartList,
  OrderList,
  Address,
  connect:sequelize,
}




