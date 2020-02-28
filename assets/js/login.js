$(function () {
    // 表单密码校验
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var dataVal = $('.reg-box [name=password]').val()
            console.log(dataVal);
            if (dataVal !== value) {
                return '您输入的两次密码不同'
            }
        }
    })

    // 登录按钮点击事件
    $('.login-box a').on('click', function (e) {
        $('.login-box ').hide()
        $('.reg-box').show()
    })
    //注册按钮点击事件
    $('.reg-box a').on('click', function (e) {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 注册盒子表单提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: $('#form-reg').serialize(),
            success: function (res) {
                if (res.stutus !== 0) {
                    return layer.msg(res.message);
                }
                // 跳转到登陆页面
                layer.msg('恭喜您，注册成功！开始登陆把！')
                $('#form-reg a').click()
            }
        })
    })
    // 登录盒子登录功能实现
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $('#form-login').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示登录成功，把相应到身份信息保存到本地
                layer.msg('登陆成功')
                localStorage.setItem(res.token)
                // 跳转到后台
                location.href = '/index.html'
            }
        })
    })
})