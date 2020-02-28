$(function () {
    // 页面打开发送请求，生成用户信息
    getUserinfo()
    // 实现退出功能
    $('.page_out').on('click', function () {
        var layer = layui.layer
        layer.confirm('确定要退出么?', { icon: 3, title: '退出当前页面' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })
})
function getUserinfo() {
    var layer = layui.layer
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        headers: {
            // 通过 Authorization 字段，把 token 发送给服务器，进行身份认证
            Authorization: localStorage.getItem('token')
        },

        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('生成页面失败')
            }
            var name = res.data.nickname || res.data.username
            $('.username').html('欢迎&nbsp;&nbsp;' + name)
            var first = name[0].toUpperCase()
            if (res.data.user_pic) {
                $('.text-avatar').hide()
            } else {
                $('.avatar_container img').hide()
                $('.text-avatar').html(first)
            }

        }
    })
}

