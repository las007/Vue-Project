$(function(){

         var name, value;
         var str = location.href; //获取到整个地址
         var num = str.indexOf("?");
         str = str.substr(num + 1); //取得num+1后所有参数，这里的num+1是下标 str.substr(start [, length ]
         var arr = str.split("&"); //以&分割各个参数放到数组里
         for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
             if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
                }
             }
         console.log(value);
         console.log(str);


    // 初始化数据列表
    function getPage(value){
        $.ajax({
            type : 'get',
            url : '/books/getPage/' + value,
            dataType : 'json',
            success : function(data){

                var html = template('conTpl', data);
                $('.content_item').html(html);

                // 必须在渲染完成内容之后才可以操作DOM标签

            }
        });
    }
    getPage(value);

    function contentList(value) {

                $.ajax({
                    type: 'get',
                    url: '/getMsg/' + value,
                    dataType: 'json',
                    success: function (data) {
                        // 渲染数据列表
                        // console.log(data);
                        var msg = template('msgTpl', {list: data});
                        // console.log(msg);
                        $('.msgList').html(msg);

                        $('.msgList').find('ul').each(function (index, element) {
                            //锁定第四个评论
                            var li = $(element).find('li:eq(3)');
                            var id = $(element).find('li:eq(0)').text();
                            li.find('a:eq(0)').click(function () {
                                console.log(id);
                            });
                        });

                        $('.say').keydown(function (e) {
                            // console.log(e.keyCode);
                            if (e.keyCode === 13) {
                                $('.sub').click();
                            }
                        });
                    }
                });
    }
    contentList(value);

    // 添加评论信息
    function addMsg(value){
        var form = $('#addMsgForm');

        $.ajax({
            type : 'get',
            url : '/books/book/' + value,
            dataType : 'json',
            success : function(data) {

                form.find('input[name=id]').val(data.id);

                form.find('input[type=button]').click(function () {
                    $.ajax({
                        type: 'post',
                        url: '/books/msg',
                        // 标签名.serialize() 方法 获取该标签下所有数据
                        data: form.serialize(),
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.flag == '1') {
                                // 添加图书成功之后重新渲染数据列表
                                form.get(0).reset();
                                form.find('input[type=text]').val('');
                                contentList(value);
                            }
                        }
                    });
                });
            }
        });
    }
    addMsg(value);

});