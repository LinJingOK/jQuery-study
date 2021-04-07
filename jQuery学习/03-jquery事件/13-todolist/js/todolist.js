$(function () {
  load();
  //1.按下回车 把完整的数据存储到本地存储里面
  //存储数据格式  var todolist = [{},{}]
  $("#title").on("keydown", function (event) {
    if (event.keyCode === 13) {
      // alert(11)
      if ($(this).val() === ""){
        alert("请输入添加的内容");
      } else {
        //先读取本地存储原来的数据
        var local = getData();
        // console.log(local);
        //把local数组进行更新数据  把最新的数据追加给local数组   因为localStorge不能追加   所以实现思路是给数组追加  然后把旧的数组替换掉
        local.push({ title: $(this).val(), done: false });
        //把这个新数组local存储到本地存储
        saveData(local);
        load();
        $(this).val("");
      }
    }
  });
  // 3.toDoList 删除操作
  $("ol, ul").on("click", "a", function () {
    //先获取本地存储
    var data = getData();
    // console.log(data);
    //修改数据
    var index = $(this).attr("id");
    console.log(index);
    data.splice(index, 1);  //自己的bug  不可以使用data = data.splice(index, 1); 的写法 意思是点击那个 把那个留下赋值给data
    //保存到本地存储
    saveData(data);
    //重新渲染页面
    load();
  });
  //4.toDoList 正在进行和已完成选项的操作
  $("ol, ul").on("click", "input", function () {
    //先获取本地存储数据
    var data = getData();
    //修改数据
    var index = $(this).siblings("a").attr("id");
    console.log(index);
    data[index].done = $(this).prop("checked");
    console.log(data);
    //保存到本地存储
    saveData(data);
    //重新渲染页面
    load();
  });

  //读取本地存储数据
  function getData() {
    var data = localStorage.getItem("todolist");   //自己犯的bug  将todolist改为TODO么改回来
    if (data !== null){
      // console.log(JSON.parse(data))
      //本地存储里面的数据是字符串格式的，但是我们需要的是对象格式的
      return JSON.parse(data);
    }else {
      return [];
    }
  }
  //保存本地存储数据
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }

  //渲染数据
  function load() {
    //读取本地存储的数据
    var data = getData();
    // console.log(data);
    //遍历之前先要清空ol里面的元素
    $("ol, ul").empty();
    //遍历这个数据
    var todoCount = 0;
    var doneCount = 0;
    $.each(data, function (i, n) {
      // console.log(n);
      if (n.done) {
        $("ul").prepend("<li><input type='checkbox' checked='checked'/><p>"+ n.title +"</p><a href='javascript:;' id="+ i +"></a></li>");
        doneCount++;
      }else {
        $("ol").prepend("<li><input type='checkbox'/><p>"+ n.title +"</p><a href='javascript:;' id="+ i +"></a></li>");
        todoCount++;
      }
    });
    $("#todocount").text(todoCount); //自己的bug：id要带#号
    $("#donecount").text(doneCount);
  }

});
