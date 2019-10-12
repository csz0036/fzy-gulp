$(function () {

    $(".defaultText").on('click', function () {
        $(this).siblings('#scaleNumber').toggleClass('showUl')
    })
    $("#scaleNumber").on('click', 'li', function () {
        $(this).parent().removeClass('showUl')
        $('.defaultText').text($(this).text()).addClass('clickClass')
    })
    $("#submitBut").on('click', function () {
        var name = $.trim($("#input_1").val());
        var company_scale = $('.defaultText').text();
        var company_email = $.trim($("#input_4").val());
        var company = $.trim($("#input_2").val());
        var phone = $.trim($("#input_5").val());

        if (!name) {
            alert('请输入您的名字');
            return false;
        }
        if (company_scale == '请选择企业规模') {
            alert('请选择企业规模');
            return false;
        }
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(company_email)) {
            alert('邮箱格式不正确');
            return false;
        }
        if (!company) {
            alert('请输入公司名称');
            return false;
        }
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            alert('手机号码有误，请重填');
            return false;
        }


        $.ajax({
            url: apiUrl + "user/post_info",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                company_scale: company_scale,
                company_email: company_email,
                company: company,
                phone: phone,
                memo: $("#textareaId").val(),
            },
            success: function (reuslt) {
                alert('提交申请成功');
            }
        })
    })
})