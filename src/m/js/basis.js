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


})