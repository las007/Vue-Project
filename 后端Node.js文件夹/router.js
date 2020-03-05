
const express = require('express');
const service = require('./service.js');
const router = express.Router();
// 提供所有的图书信息
router.get('/books',service.allBooks);
router.get('/getMsg/:id',service.getMsg);


//================================================
router.get('/messages/:id', service.showIndex);
router.get('/getMessages', service.getMessages);
router.get('/getGoodsImg/:id', service.getGoodsImg);
router.get('/getNewsList', service.getNewsList);
router.get('/getCategory', service.getCategory);
router.get('/getPhotos', service.getPhotos);
router.get('/getNewsInfo/:id', service.getNewsInfo);
router.get('/getGoodsList', service.getGoodsList);
router.get('/getGoodsInfo/:id', service.getGoodsInfo);
router.get('/getShopCar', service.getShopCar);
router.get('/getShopCarList/:id', service.getShopCarList);
//购物车删除操作
router.get('/btnDelete/:id', service.btnDelete);
router.get('/toPage/:id', service.toPage);

//添加图书（提交表单，完成添加功能）
router.post('/addMessage/:id', service.addMessage);
router.post('/addNewsList', service.addNewsList);
//搜索
router.post('/postSearchMsg', service.postSearchMsg);
router.post('/postSearchNews', service.postSearchNews);
router.post('/postLoginMsg', service.postLoginMsg);
router.post('/postRegisterMsg_1', service.postRegisterMsg_1);
router.post('/postRegisterMsg', service.postRegisterMsg);
//购物车列表
router.post('/toShopCar', service.toShopCar);
//================================================

router.get('/article',service.getPage);
router.get('/article',service.getPageMsg);
router.get('/article', service.getAll);

router.get('/getBanner', service.getBanner);

//通告栏
router.get('/commonList', service.commonList);

router.post('/getSearchMsg', service.getSearchMsg);
router.get('/getSearchMsg', service.getSearchMsg);
//提交评论
router.post('/books/msg', service.addMsg);
//登录
router.post('/books/login', service.Login);
router.get('/books/getLogin/:id', service.getLogin);

// 添加图书信息时提交数据
router.post('/books/book',service.addBook);
router.get('/books/getPage/:id',service.getPageId);
// 编辑图书时根据id查询相应信息
router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
router.put('/books/book',service.editBook);
// 删除图书信息
router.delete('/books/book/:id',service.deleteBook);

module.exports = router;