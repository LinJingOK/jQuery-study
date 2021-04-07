$(function () {
    //1.全选全不选功能模块
    //就是把全选按钮的状态赋值给三个小按钮
    //事件可以使用change
    //错误在于将checkbox拼写错误
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")){
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item")
        }else {
            $(".cart-item").removeClass("check-cart-item")
        }
    });
    //2.实现三个全被选，全选被选 选中状态checked
    $(".j-checkbox").change(function () {
        // console.log($(".j-checkbox:checked").length);
        // console.log($(".j-checkbox").length);
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length){
            $(".checkall").prop("checked", true);
        }else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item")
        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    });
    //3.增加和减少购物车数量
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        //4.增加 修改商品的小计 商品数*商品价格
        var p = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        var sum = (n * p).toFixed(2);  //toFixed(2)保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
        getSum();
    });

    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);

        //4.减少 修改商品的小计 商品数*商品价格
        // var p = $(this).parent().parent().siblings(".p-price").text().substr(1);
        var p = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        var sum = (n * p).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
        getSum();
    })

    //4.用户修改文本框的值 计算小计
    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        var sum = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
        getSum();
    });
//5.计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总额
        $(".itxt").each(function (i, el) {
            count += parseInt($(el).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, el) {
            money += parseFloat($(el).text().substr(1))
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    };


//6.删除商品模块
    //（1）商品后面的删除按钮删除
    $(".p-action a").click(function () {
        //删除的是当前商品
        $(this).parents(".cart-item").remove();
        getSum();

    });
    //(2)删除选中的商品
    $(".remove-batch").click(function () {
        //删除小复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })

    //3.清理购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    });


    //4. 选中的改变颜色背景
    $()
});