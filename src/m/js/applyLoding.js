$(function () {
    let company_select_text;
    $("#input_3").change(function () {
        company_select_text = $(this).find('option:selected').text();
        $("#selsectCompany").hide()
        if ($(this).val() == 1) {
            $(this).css('color', '#999')
        } else {
            $(this).css('color', '#000')
        }
    });
    $(".inputLab input").focus(function () {
        $(this).parents('.inputLab').find(".errorInfo").hide()
    })

    // 获取验证码
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
        let yzmT = setInterval(() => {
            yzmTime--
            $("#showTime").text(yzmTime)
            if (yzmTime < 1) {
                $("#getYZM").show();
                $("#showTime").hide();
                clearInterval(yzmT)
            }
        }, 1000);

        $.ajax({
            url: apiUrl + "user/sms_code",
            type: "POST",
            dataType: "json",
            data: {
                phone: phone,
                // phone: 15811095121,
            },
            success: function (reuslt) {
                console.log(reuslt)
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
        var company_scale = $("#input_3").val();
        var company_email = $.trim($("#input_4").val());
        var company = $.trim($("#input_2").val());
        var phone = $.trim($("#input_5").val());
        var yzm = $.trim($("#input_6").val());
        if (!name) {
            $("#userName").show();
            return false;
        }
        if (!company) {
            $("#companyName").show();
            return false;
        }
        if (company_scale == 1) {
            $("#selsectCompany").show();
            return false;
        }
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(company_email)) {
            $("#companyMail").show();
            return false;
        }
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            $("#phoneNumber").show();
            return false;
        }


        $.ajax({
            url: apiUrl + "user/post_info",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                company_scale: company_select_text,
                company_email: company_email,
                company: company,
                phone: phone,
                code: yzm,
                memo: $("#textareaId").val(),
            },
            success: function (reuslt) {
                if (reuslt.head.error == 0) {
                    // alert('提交申请成功');
                    $("#successInfo").show();
                    setTimeout(function () {
                        $("#successInfo").hide();
                        history.go(-1)
                    }, 3000)
                    localStorage.setItem('postInfo', 'none')
                } else {
                    // alert(reuslt.head.message)
                    $("#errorsInfo").show();
                    $("#errorContent").text(reuslt.head.message)
                    setTimeout(function () {
                        $("#errorsInfo").hide();
                    }, 3000)
                }
            }
        })
    })
})