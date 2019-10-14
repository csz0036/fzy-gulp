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

    $("#submitBut").on('click', function () {
        var name = $.trim($("#input_1").val());
        var company_scale = $("#input_3").val();
        var company_email = $.trim($("#input_4").val());
        var company = $.trim($("#input_2").val());
        var phone = $.trim($("#input_5").val());
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
                memo: $("#textareaId").val(),
            },
            success: function (reuslt) {
                if (reuslt.head.error == 0) {
                    // alert('提交申请成功');
                    $("#successInfo").show();
                    setTimeout(function () {
                        $("#successInfo").hide();
                        window.location.href = history.go(-1)
                    }, 3000)
                }else{
                    alert(reuslt.head.message) 
                }
            }
        })
    })
})