var express = require('express');
var router = express.Router();
require('../util/index')
var model = require('../config/model');
var Goods = model.Goods;

router.get('/list',function(req,res,next){
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let priceGt = '';
  let priceLte = '';
  let params = {};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=2000;break;
      case '4':priceGt = 2000;priceLte=3000;break;
      case '5':priceGt = 3000;priceLte=6000;break;
    }
  }else{
    priceGt = null;priceLte=null;
  }
  sort = sort==1?'ASC':'DESC'
  Goods.findAndCountAll({
   where:{
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    },
    offset: skip,
    limit: pageSize,
    order: [
      ['salePrice', sort],
    ]
  }).then((result)=>{
    res.json({
      status: '0',
      msg:'',
      result:{
        count: result.count,
        list:result.rows
      }
    })
  }).catch(err=>{
    res.json({
      status: '1',
      msg:err.message
    });
  })
})
router.post('/addCart',function(req,res,next){
  /*if(req.cookies && req.cookies.userId) {
    var userId = req.cookies.userId, productId = req.body.id;
    console.log(productId+'111')
   model.CartList.findOne({
     where:{
       goodId:productId
     }
   }).then(doc=>{
     console.log(doc+'222')
     if(doc){
      doc.productNum++;
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
     }else{
       model.CartList.create({
         userId:userId,
         goodId:productId,
         productNum:1,
         isDelete: 0,
         createdAt: new Date().Format('yyyy-MM-dd hh:mm:ss'),
         updatedAt: new Date().Format('yyyy-MM-dd hh:mm:ss'),
       }).then(doc2=>{
         res.json({
           status: '0',
           msg: '',
           result: 'suc'
         })
       }).catch(err2=>{
         res.json({
           status: "1",
           msg: err2.message
         })
       })
     }
   }).catch(err=>{
     res.json({
       status: "1",
       msg: err.message
     })
   })
 }*/
})
module.exports = router;
