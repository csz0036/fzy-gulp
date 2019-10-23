$(function () {
  // 头部操作
  $("#head .button").on('click', function () {
    $(this).toggleClass('activeNav')
    $("#head .navListButton").toggleClass('activeNav')
    $("#head #hideHeadNav").toggleClass('activeNav')

  });
  $(".navListButton").on('click', 'li', function () {
    $(this).toggleClass('openList')
    $(this).siblings('li').removeClass('openList');
  })
  $("#hideHeadNav").on('click', function () {
    $(this).toggleClass('activeNav')
    $("#head .navListButton").toggleClass('activeNav')
    $("#head .button").toggleClass('activeNav')
  })

  //获取URL参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }


})

var apiUrl = 'http://fzy2.smartdot.com:38080/api/v1/'