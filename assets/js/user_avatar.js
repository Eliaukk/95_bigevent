$(function () {

    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    var options = {
        aspectRatio: 1,
        preview: $('.img-preview')
    }
    $image.cropper(options)
    // 上传按钮触发 
    $('#btnon').click(function () {
        $('#iptAvatar').click()
    })
    $('#iptAvatar').on('change', function (e) {
        if (e.target.files.length === 0)
            layer.msg('请选择图片')
        var newImgURL = URL.createObjectURL(e.target.files[0])
        $image.cropper('destroy')
        $image.attr('src', newImgURL)
        $image.cropper(options)

    })
    $('#btnsmt').on('click', function (e) {
        // 生成一个base64 格式的字符串
        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('头像上传失败')
                }
                layer.msg('头像跟换成功')
                window.parent.getUserinfo()

            }
        })
    })
})