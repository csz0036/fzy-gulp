// import { clearInterval } from "timers"

$(function () {

    $(".defaultText").on('click', function () {
        $("#selsectCompany").hide()
        $(this).siblings('#scaleNumber').toggleClass('showUl')
    })
    $("#scaleNumber").on('click', 'li', function () {
        $(this).parent().removeClass('showUl')
        $('.defaultText').text($(this).text()).addClass('clickClass')

    })

    $(".inputLab input").focus(function () {
        $(this).parents('.inputLab').find(".errorInfo").hide()
    })

    //获取验证码
    $("#getYZM").on('click', function () {
        let phone = $.trim($("#input_5").val());
        if (!phone) {
            $("#universalTotl").show().find('.infoText').text('请输入正确的手机号');
            let phontTime = setTimeout(function () {
                $("#universalTotl").hide();
                clearTimeout(phontTime)
            }, 2000)
            return
        }
        let yzmTime = 59;
        $(this).hide();
        $("#showTime").show().text(yzmTime);
        var dowtime = setInterval(function () {
            yzmTime--
            $("#showTime").text(yzmTime)
            if (yzmTime < 1) {
                $("#getYZM").show();
                $("#showTime").hide()
                clearInterval(dowtime);
            }
        }, 1000);

        $.ajax({
            url: apiUrl + "user/sms_code",
            type: "POST",
            dataType: "json",
            data: {
                phone: phone,
            },
            success: function (reuslt) {
                if (reuslt.head.error == 0) {
                    $("#universalTotl").show().find('.infoText').text('验证码已经发送，请查收');
                    let phontTime = setTimeout(function () {
                        $("#universalTotl").hide();
                        clearTimeout(phontTime)
                    }, 2000)
                }
            }
        })
    })

    // 提交
    $("#submitBut").on('click', function () {
        var name = $.trim($("#input_1").val());
        var company_scale = $('.defaultText').text();
        var company_email = $.trim($("#input_4").val());
        var company = $.trim($("#input_2").val());
        var phone = $.trim($("#input_5").val());
        var yzm = $.trim($("#input_6").val());

        if (!name) {
            // alert('请输入您的名字');
            $("#userName").show()
            return false;
        }
        if (!company) {
            // alert('请输入公司名称');
            $("#companyName").show()
            return false;
        }
        if (company_scale == '请选择企业规模') {
            // alert('请选择企业规模');
            $("#selsectCompany").show()
            return false;
        }
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(company_email)) {
            // alert('邮箱格式不正确');
            $("#companyMail").show()
            return false;
        }
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            // alert('手机号码有误，请重填');
            $("#phoneNumber").show()
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
                code: yzm,
                memo: $("#textareaId").val(),
            },
            success: function (reuslt) {
                // alert('提交申请成功');
                if (reuslt.head.error === 0) {
                    $("#successSubmit").show();
                    setTimeout(function () {
                        $("#successSubmit").hide();
                        history.go(-1);
                    }, 3000)
                    localStorage.setItem('postInfo', 'none')
                } else {
                    $("#errorInfo").show();
                    $("#errorContent").text(reuslt.head.message)
                    setTimeout(function () {
                        $("#errorInfo").hide();
                    }, 3000)
                }
            }
        })
    })
})