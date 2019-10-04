$(function () {
  // 头部操作
  $("#head .button").on('click', function () {
    var display = $('#head .navListButton').css('display');
    if (display == 'none') {
      $("#head .navListButton").show()
    } else {
      $("#head .navListButton").hide()
    }
  })

  //获取URL参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

})