/*
    实现图书管理系统后台接口
*/
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();
const path = require('path');

app.use('/www',express.static('public'));

//1、设置模板引擎，设置模板引擎路径
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3000,()=>{
    console.log('running...');
});