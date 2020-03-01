$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function () {
            var value = $('[name=repassword]').val()
            if ($('#newpwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#userForm').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                $('#userForm')[0].reset()
            }
        })
    })
})