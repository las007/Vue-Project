$(function(){
    // 初始化数据列表
    function initList(){
        $.ajax({
            type : 'get',
            url : '/books',
            dataType : 'json',
            success : function(data){

                var html = template('infoTpl', {list: data});
                $('.other').html(html);

                var con = template('conTpl', { common: data });
                $('.list_content').html(con);

                // 必须在渲染完成内容之后才可以操作DOM标签

                $('.other').find('ul').each(function(index,element){

                    var lis = $(element).find('li:eq(0)');
                    var id = $(element).find('span').text();
                    // 绑定编辑图书的单击事件
                    lis.find('a').click(function(){
                        console.log(id);
                        // console.log(1);
                        getList(id);
                     });
                });
            }
        });
    }
    initList();

    //通告栏
    function commonList() {
        $.ajax({
            type: 'get',
            url: '/commonList',
            dataType: 'json',
            success: function (data) {
                var com = template('listTpl', { list: data });
                $('.list_box').html(com);
            }
        });
    }
    commonList();

    //近期推荐
    // function contentList() {
    //     $.ajax({
    //         type: 'get',
    //         url: '/books',
    //         dataType: 'json',
    //         success: function (data) {
    //             var con = template('conTpl', { list: data });
    //             $('.list_box').html(con);
    //         }
    //     });
    // }
    // contentList();

    // function contentList() {
    //     $.ajax({
    //         type : 'get',
    //         url : '/getMsg',
    //         dataType : 'json',
    //         success : function(data){
    //             // 渲染数据列表
    //             // console.log(data);
    //             var msg = template('msgTpl', {list: data});
    //             // console.log(msg);
    //             $('.msgList').html(msg);
    //
    //             $('.msgList').find('ul').each(function (index, element) {
    //                 //锁定第四个评论
    //                 var li = $(element).find('li:eq(3)');
    //                 var id = $(element).find('li:eq(0)').text();
    //                 li.find('a:eq(0)').click(function () {
    //                     console.log(id);
    //                 });
    //             });
    //
    //             $('.say').keydown(function (e) {
    //                 // console.log(e.keyCode);
    //                 if (e.keyCode === 13) {
    //                     $('.sub').click();
    //                 }
    //             });
    //         }
    //     });
    // }
    // contentList();

    // 添加评论信息
    // function addMsg(){
    //     var form = $('#addMsgForm');
    //
    //     form.find('input[type=button]').click(function(){
    //         $.ajax({
    //             type : 'post',
    //             url : '/books/msg',
    //             // 标签名.serialize() 方法 获取该标签下所有数据
    //             data : form.serialize(),
    //             dataType : 'json',
    //             success : function(data){
    //                 if(data.flag == '1'){
    //                     // 添加图书成功之后重新渲染数据列表
    //                     form.get(0).reset();
    //                     form.find('input[type=text]').val('');
    //                     contentList();
    //                 }
    //             }
    //         });
    //     });
    // }
    // addMsg();

    // 删除图书信息
    function deleteBook(id){
        $.ajax({
            type : 'delete',
            url : '/books/book/' + id,
            dataType : 'json',
            success : function(data){
                // 删除图书信息之后重新渲染数据列表
                if(data.flag == '1'){
                    initList();
                }
            }
        });
    }

    // var id2 = 4;
    // //获取并渲染详情页
    // function getList(id) {
    //     $.ajax({
    //         type : 'get',
    //         url : '/books/book/' + id,
    //         dataType : 'json',
    //         success: function (data) {
    //             // console.log(data);
    //             // console.log(data[0]);
    //             var html = template('conTpl', data);
    //             $('.content_item').html(html);
    //         }
    //     });
    // }
    // getList(id2);

    // 编辑图书信息
    function editBook(id){
        var form = $('#addBookForm');
        // 先根据数据id查询最新的数据
        $.ajax({
            type : 'get',
            url : '/books/book/' + id,
            dataType : 'json',
            success : function(data){
                // 初始化弹窗
                var mark = new MarkBox(600,400,'编辑图书',form.get(0));
                mark.init();
                // 填充表单数据
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);
                // 对表单提交按钮重新绑定单击事件
                //使用 unbind() 方法，对之前添加的数据进行解绑
                form.find('input[type=button]').unbind('click').click(function(){
                    // 编辑完成数据之后重新提交表单
                    $.ajax({
                        type : 'put',
                        url : '/books/book',
                        data : form.serialize(),
                        dataType : 'json',
                        success : function(data){
                            if(data.flag == '1'){
                                // 隐藏弹窗
                                mark.close();
                                // 重新渲染数据列表
                                initList();
                            }
                        }
                    });
                });
            }
        });
    }

    // 添加图书信息
    function Login(){
        $('#login').click(function(){
            var form = $('#loginForm');
            // 实例化弹窗对象
            var mark = new MarkBox(600,400,'添加图书',form.get(0));
            //mark.init(); 将弹窗显示出来
            mark.init();
            form.find('input[type=button]').click(function(){
                $.ajax({
                    type : 'post',
                    url : '/books/login',
                    // 标签名.serialize() 方法 获取该标签下所有数据
                    data : form.serialize(),
                    dataType : 'json',
                    success : function(data){

                        // console.log(data.result222[0].username);
                        var uname = data.result222[0].username;
                        // console.log(data.result222[0]);

                        if(data.flag == '1'){

                            // 关闭弹窗
                            mark.close();
                            // console.log(data.result222[0]);
                            // 添加图书成功之后重新渲染数据列表

                        }
                        getLogin(uname);
                    }
                });
            });
        });
    }
    Login();

    function getLogin(uname) {
        $.ajax({
            type: 'get',
            url: '/books/getLogin' + uname,
            dataType: 'json',
            success: function (data) {

                console.log(data);
                var login = template('loginTpl', data.result222[0]);
                $('.loginMsg').html(login);
            }
        });
        console.log(uname);
        $('.userMsg').css('display', 'none');
        $('.loginMsg').html(uname);
        // var username = uname;
        // console.log(username);
    }
    // getLogin(uname);


    //站内搜索模块
    function searchTxt() {
        // $('.search').click(function () {
            var put = $('#searchForm');
            // var mark = new MarkBox(600,400,'添加图书',put.get(0));
            // //mark.init(); 将弹窗显示出来
            // mark.init();

        put.find('input[type=button]').click(function () {
                $.ajax({
                    type: 'post',
                    url: '/getSearchMsg',
                    data: put.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        // getSearch();
                        var html = template('searchTpl', {list: data.result333});
                        $('.searchMsg').html(html);
                    }
                });
        });
    }
    searchTxt();

    //接收站内搜索数据
    function getSearch() {
        var put = $('#searchForm');
        // var put = $('.searchMsg');
        // var mark = new MarkBox(600,400,'添加图书',put.get(0));
        // //mark.init(); 将弹窗显示出来
        // mark.init();
        put.find('input[type=button]').click(function () {
            console.log(1);
            $.ajax({
                type: 'get',
                url: '/getSearchMsg',
                dataType: 'json',
                success: function (data) {
                    console.log(data.result333);
                    var html = template('searchTpl', {list: data.result333});
                    $('.searchMsg').html(html);

                    // $('.inp').keydown(function (e) {
                    //     if (e.keyCode === 13) {
                    //         // var msg = $('.search').find('input').val();
                    //         // console.log(msg);
                    //         $('.sub').click();
                    //     }
                    // });
                }
            });
        });
    }
    // getSearch();

});