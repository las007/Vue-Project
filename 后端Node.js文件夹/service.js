
const db = require('./db.js');
const data = require('./data.json');
const common = require('./static/common/common.json');
const test = require('./static/common/test.json');
const messages = require('./static/img/messages.json');
const category = require('./static/photos/category.json');
const photos = require('./static/photos/pageImg.json');
const newsList = require('./static/newsList/newsList.json');
const goodslist = require('./static/goods/goodslist.json');
const path = require('path');
const fs = require('fs');

//自动生成图书编号（自增）
let maxBookCode = (routerId) => {
    let arr = [];
    common[routerId].forEach((item) => {
        if (item.id == -Infinity) {
            item.id = 1;
        }
        console.log(item.id);
        arr.push(item.id);
    });
    return Math.max.apply(null, arr);
};

let newsBookCode = () => {
    let arr = [];
    newsList.message.forEach((item) => {
        if (item.id == NaN) {
            item.id = newsList.message.length + 1;
        }
        // console.log(item.id);
        arr.push(item.id);
    });
    return Math.max.apply(null, arr);
};

//把内存中的数据写入文件
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, './static/common/common.json'), JSON.stringify(common, null, 4), (err) => {
        if (err) {
            res.send('server error');
        }
        //文件写入成功之后重新跳转到主页面
        // res.redirect('/');
    });
};

let writeNewsToFile = (res) => {
    fs.writeFile(path.join(__dirname, './static/newsList/newsList.json'), JSON.stringify(newsList, null, 4), (err) => {
        if (err) {
            res.send('server error');
        }
        //文件写入成功之后重新跳转到主页面
        // res.redirect('/');
    });
};

//渲染主页面
exports.showIndex = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // res.json({list: common}) ;

    let routerId = req.params.id;
    // console.log(routerId);

    let sql = "select * from commen_1 where id=?";
    let data = routerId;
    db.base(sql, data, (result123) => {
        // console.log(result123);
        res.json(result123);
    });
};


//渲染主页面
exports.getMessages = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // res.json({list: messages}) ;
    let sql = "select * from img";
    db.base(sql, null, result => {
        res.json(result);
    });
};


exports.getGoodsImg = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // res.json({list: messages}) ;
    let imgId = req.params.id;
    // console.log(imgId);
    let sql = "select * from goodsImg where id=?";
    let data = imgId;
    db.base(sql, imgId, result => {
        // console.log(result);
        res.json(result);
    });
};


//
exports.getCategory = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    res.json({list: category}) ;
};

exports.getPhotos = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    res.json({list: photos}) ;
};

//渲染主页面
exports.getNewsList = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // res.json({list: newsList}) ;

    let sql = `select * from content`;
    // let data = id;
    db.base(sql, null, (result123) => {
        // console.log(result123);
        res.json(result123);
    });

};
exports.toPage = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    let routerId = req.params.id;
    // console.log(routerId);

    let sql = "select * from content";
    db.base(sql, null, (result123) => {
        // console.log(result123);
        let n1 = (routerId-1)*8;
        let n2 = routerId*8;
        let num = result123.slice(n1, n2);

        // res.send('hello·~');
        // console.log('ok');
        // console.log(num);
        res.json(num);
    });
};


exports.getNewsInfo = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");


    let id = req.params.id;
    console.log(id);

    let sql = `select * from content where id=?`;
    let data = id;
    db.base(sql, data, (result123) => {
        // console.log(result123);
        res.json(result123);
    });
};

exports.getGoodsList = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    let sql = "select * from shopCarList";
    db.base(sql, null, result555 => {
        // console.log(result555);
        res.json(result555);
    });

    // res.json({ list: goodslist }) ;


};

exports.getGoodsInfo = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");


    let goodsId = req.params.id;
    // console.log(goodsId);
    let sql = "select * from shopCarList where id=?";

    db.base(sql, goodsId, result555 => {
        // console.log(result555);
        res.json(result555);
    });

    // res.json({ flag: 1, list: goodsinfo});
};

exports.postSearchMsg = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    let value = req.body.title;
    console.log(value);

    let sql = `select * from shopcarlist where title like ?`;
    let data = `%${value}%`;
    db.base(sql, data, (msg) => {
        // console.log(result333.affectedRows);
        console.log(msg);

        if (msg.length === 0) {
            console.log(0);
            res.json({ flag: 0 });
        }else {
            res.json({flag: 1, msg});
        }
    });
};
exports.postSearchNews = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    let value = req.body.title;
    // console.log(value);

    let sql = `select * from content where title like ?`;
    let data = `%${value}%`;
    db.base(sql, data, (msg) => {
        // console.log(result333.affectedRows);
        // console.log(msg);

        if (msg.length === 0) {
            console.log(0);
            res.json({ flag: 0 });
        }else {
            res.json({flag: 1, msg});
        }
    });
};


//添加图书，保存数据     <!--2019.11.23 22:15-->
exports.addMessage = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');

    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");


    //获取表单数据
    let info = req.body;
    let routerId = req.params.id;
    console.log(info);
    // console.log(routerId);
    // res.json(info);
    // console.log(common.length);
    //
    // var item = [];
    // if (routerId == common.length) {
    //     // common.length = routerId + 1;
    //     common.push(item);
    // }
    //
    // // console.log(req.body);
    // // console.log(res);
    //
    // let book = {};
    // for (let key in info) {
    //     book[key] = info[key];
    // }
    //
    // book.id = maxBookCode(routerId) + 1;
    // // data.push(book);
    // common[routerId].unshift(book);
    // // test.push(book);
    // // console.log(common);
    // // console.log(test);
    // //把内存中的数据写入文件
    // writeDataToFile(res);
    //
    // res.json({common});

    // let sql = `insert into commen=routerId set ?`;
    let sql = `insert into commen_1 set id=?, name=?, description=?, add_time=?`;
    let data = [info.id, info.name, info.description, info.add_time];
    db.base(sql, data, (result111) => {
            // console.log(result111);
            if (result111.affectedRows == 1) {
                res.json(result111);
            }
        });

};

exports.addNewsList = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域

    res.setHeader('Access-Control-Allow-Origin', '*');

    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    //获取表单数据
    let info = req.body;
    // let routerId = req.params.id - 1;
    // console.log(info);
    // console.log(routerId);
    // console.log(newsList.message.length);
    //
    // var item = {};
    // newsList.message.push(item);

    // console.log(req.body);
    // console.log(res);

    let book = {};
    for (let key in info) {
        book[key] = info[key];
    }

    book.id = newsBookCode() + 1;
    console.log(book);
    // data.push(book);
    newsList.message.push(book);
    // test.push(book);
    // console.log(common);
    // console.log(test);
    //把内存中的数据写入文件
    // writeNewsToFile(res);

    // res.json({newsList});

    let sql = `insert into content set ?`
    let data = info;
    db.base(sql, data, (result111) => {
        console.log(result111);
        if (result111.affectedRows == 1) {
            res.json({ flag: 1 });
        }
    });
};

exports.postLoginMsg = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    //获取表单数据
    let info = req.body;
    console.log(info);

    let sql = `select * from user where username=? and password=?`;
    let data = [info.username, info.password];

    db.base(sql, data, (result111) => {
        console.log(result111);

        if (result111.length === 0) {
            res.json({ flag: 0 });
        }else if (info.username === result111[0].username) {
            res.json({ flag: 1 });
        }else {
            res.json({ flag: 2 });
        }

    });
};

exports.postRegisterMsg = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    //获取表单数据
    let info = req.body;
    console.log(info);

    let sql = `insert into user set ?`;
    let data = info;
    db.base(sql, data, (result111) => {
        console.log(result111);

        if (result111.affectedRows === 1) {
            res.json({ flag: 3 });
        }else {
            res.json({ flag: 4 });
        }
    });
};


exports.postRegisterMsg_1 = (req, res) => {

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    //获取表单数据
    let info = req.body;
    console.log(info);

    let sql = `select * from user where username=?`;
    let data = [info.username];
    db.base(sql, data, (result111) => {
        console.log(result111);

        console.log(result111.length);

        if (result111.length === 0) {
            res.json({ flag: 0 });
        }else if (result111.length > 0) {
            res.json({ flag: 1 });
        }else {
            res.json({ flag: 2 });
        }
    });
};

exports.getShopCar = (req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    let sql = "select * from goodsList";
    db.base(sql, null, (result123) => {
        //
        // let num = result123.find(id);
        res.json(result123);
    });
};

exports.getShopCarList = (req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    let ids = req.params.id;
    console.log(ids);

    let sql = "select * from shopcarlist where id in (1, 3)";
    let data = ids;
    db.base(sql, data, (result123) => {
        //
        // let num = result123.find(id);
        console.log(result123);
        res.json(result123);
    });
};

exports.toShopCar = (req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    let info = req.body;
    console.log(info);

    let sql = "insert into goodsList set ?";
    let data = info;
    db.base(sql, data, (result123) => {
        // console.log(result123);

        if (result123.affectedRows === 1) {
            res.json({ flag: 1 });
        }
    });
};

exports.btnDelete = (req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    let deleteId = req.params.id;
    // console.log(deleteId);

    let sql = "delete from shopCarList where id=?";
    let data = deleteId;
    db.base(sql, data, (result123) => {
        // console.log(result123);

        if (result123.affectedRows === 1) {
            res.json({ flag: 1 });
        }
    });
};


exports.allBooks = (req,res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // let sql = 'select msg.*, book.* from msg right join book on msg.id=book.id';
    // let sql = 'select * from msg left join book on msg.id=2';
    let sql = 'select * from text';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
    // getMsg();
};

exports.getBanner = (req, res) => {
    let sql = 'select * from img';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};

exports.commonList = (req, res) => {
    let sql = 'select * from common';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};

exports.getSearchMsg = (req, res) => {
    // let value = req.params.val;
    console.log(req.params);
    let value = req.body.title;
    console.log(value);

    let sql = `select * from text where title like ?`;
    let data = `%${value}%`;
    db.base(sql, data, (result333) => {
        // console.log(result333.affectedRows);
            // console.log(result333);
            res.json({flag: 1, result333});
    });
};

exports.addMsg = (req, res) => {
    let info = req.body;

    // console.log(info.id);
    console.log(info);

    if (info.id == 2) {
        let sql = `insert into msg set user=?, msg=?`;
        let data = [info.user, info.msg];
        db.base(sql, data, (result) => {
            if(result.affectedRows == 1){
                // console.log(result);
                res.json({flag : 1});
            }else{
                res.json({flag : 2});
            }
        });
    }else if (info.id == 3) {
        let sql = `insert into msg_title set user=?, msg=?`;
        let data = [info.user, info.msg];
        db.base(sql, data, (result) => {
            if(result.affectedRows == 1){
                res.json({flag : 1});
            }else{
                res.json({flag : 2});
            }
        });
    }else if (info.id == 4) {
        let sql = `insert into msg_box set user=?, msg=?`;
        let data = [info.user, info.msg];
        db.base(sql, data, (result) => {
            if(result.affectedRows == 1){
                res.json({flag : 1});
            }else{
                res.json({flag : 2});
            }
        });
    }else if (info.id == 5) {
        let sql = `insert into msg_content set user=?, msg=?`;
        let data = [info.user, info.msg];
        db.base(sql, data, (result) => {
            if(result.affectedRows == 1){
                res.json({flag : 1});
            }else{
                res.json({flag : 2});
            }
        });
    }

};


//提交登录表单
exports.Login = (req, res, next) => {
    let msg = req.body;
    // console.log(msg);

    let sql = `select * from user where username=? and password=?`;
    let data = [msg.uname, msg.pword];
    db.base(sql, data, (result222) => {
        // console.log(result222);

        if (msg.uname === result222[0].username) {
            // res.render('userOndex', result222[0]);
            // exports.showIndex();
            // res.redirect('/');
            // console.log(result222);
            res.json({flag: 1, result222});
            next();
        }else {
            res.send('404error..');
        }
    });
};
exports.getLogin = (req, res) => {
    let msg = req.body;
    console.log(msg);

    let sql = `select * from user where username=? and password=?`;
    let data = [msg.uname, msg.pword];
    db.base(sql, data, (result222) => {
        // console.log(result222);

        if (msg.uname === result222[0].username) {
            // res.render('userOndex', result222[0]);
            // exports.showIndex();
            // res.redirect('/');
            res.json({flag: 1, result222});
        }else {
            res.send('404error..');
        }
    });
};

//注册界面
exports.toRegister = (req, res) => {
    res.render('register', {});
};

//提交注册表单
exports.Register = (req, res) => {
    //获取表单数据
    let info = req.body;
    let book = {};
    for (let key in info) {
        book[key] = info[key];
    }
    // console.log(info);
    // console.log(req.url);
    if (book.user !== '') {
        let sql = `insert into user set ?`;
        let data = book;

        db.base(sql, data, (result333) => {
            if (result333.affectedRows === 1) {
                // res.redirect('/toContentBox');
                // res.render('userOndex', {});
                res.json(result333);
            }
        });
    }else {
        res.send('error..昵称和评论内容不能为空');
    }
};

// exports.Login = (req, res) => {
//     let info = req.body;
//     let sql = `insert into user set ?`;
//     let data = info;
//     db.base(sql, data, (result) => {
//         if(result.affectedRows == 1){
//             res.json({flag : 1});
//         }else{
//             res.json({flag : 2});
//         }
//     });
// };

exports.addBook = (req,res) => {
    let info = req.body;

    //获取表单数据
    let book = {};
    for (let key in info) {
        book[key] = info[key];
    }
    // console.log(book);

    let sql = 'insert into book set ?';
    db.base(sql,info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};

exports.getBookById = (req,res) => {
    let id = req.params.id;
    // console.log(id);

    let sql = 'select * from text where id=?';
    let data = [id];
    db.base(sql,data,(result)=>{
        // console.log(result[0]);
        res.json(result[0]);
    });
};

exports.getPageId = (req, res) => {
    let id = req.params.id;
    // console.log(id);
    let sql = 'select * from text where id=?';
    let data = [id];
    db.base(sql,data,(result)=>{
        // console.log(result[0].id);
        res.id = result[0].id;
        res.json(result[0]);
    });
};

exports.getMsg = (req, res) => {
    let id = req.params.id;

    // console.log(id);
    // let sql = 'select * from msg';
    //     db.base(sql,null,(result111)=>{
    //         res.json(result111);
    //         // console.log(result111);
    //     });

    if (id == 2) {
        let sql = 'select * from msg';
        db.base(sql,null,(result111)=>{
            res.json(result111);
            // console.log(result111);
        });
    }
    else if (id == 3) {
        let sql = 'select * from msg_title';
        db.base(sql,null,(result222)=>{
            res.json(result222);
            // console.log(result);
        });
    }else if (id == 4) {
        let sql = 'select * from msg_box';
        db.base(sql,null,(result222)=>{
            res.json(result222);
            // console.log(result);
        });
    }else if (id == 5) {
        let sql = 'select * from msg_content';
        db.base(sql,null,(result222)=>{
            res.json(result222);
            // console.log(result);
        });
    }

};

exports.getPage = (req,res, next) => {
    let id = req.query.id;
    let sql = `SELECT * FROM text WHERE id=?`;
    let data = id;
    db.base(sql, data,function(result222){
        // console.log(data);
        // res.render('conText', { article_data: result222[0] });
        res.check = result222;
        next();
    });
};

exports.getPageMsg = (req,res, next) => {
    let id = req.query.id;
    // console.log(id);
    if (id == 2) {
        let sql = `select * from msg`;
        let data = {};
        // console.log(id);
        db.base(sql, data, (result321) => {
            res.msg = result321;
            next();
        });
    }else if (id == 3) {
        let sql = `select * from msg_title`;
        let data = {};
        // console.log(id);
        db.base(sql, data, (result321) => {
            res.msg = result321;
            next();
        });
    }else if (id == 4) {
        let sql = `select * from msg_box`;
        let data = {};
        // console.log(id);
        db.base(sql, data, (result321) => {
            res.msg = result321;
            next();
        });
    }else if (id == 5) {
        let sql = `select * from msg_content`;
        let data = {};
        // console.log(id);
        db.base(sql, data, (result321) => {
            res.msg = result321;
            next();
        });
    }

};

exports.getAll = (req, res) => {
    res.render('testPage', {
        articles_data: res.check,
        msg_data: res.msg
    });
    // console.log(res.check);
    // console.log(res.msg);
    // console.log(res.id);
};

exports.editBook = (req,res) => {
    let info = req.body;
    let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
    let data = [info.name,info.author,info.category,info.description,info.id];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};

exports.deleteBook = (req,res) => {
    let id = req.params.id;
    let sql = 'delete from book where id=?';
    let data = [id];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        } 
    });
};
