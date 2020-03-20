<template>
    <div>
        <div id="summernote"></div>
    </div>
</template>

<script>
    // 载入bootstrap以及summernote的样式
    //require('bootstrap')

    //require('bootstrap/dist/css/bootstrap.min.css')
    //require(summernote/dist/summernote.css')
    //require('summernote/dist/summernote.js')

    // 这里需要你的脚手架工具具有加载css的能力
    //require('summernote/lang/summernote-zh-CN.min.js')
    var that = null;
    export default {
        components: {},
        methods: {
            //设置值
            setData(data) {
                $('#summernote').summernote('code', data);
            },
            //获取值
            getData() {
                return $('#summernote').summernote('code');
            },
            //重置
            resetData() {
                $('#summernote').summernote('reset');
            }
        },
        mounted() {
            that = this;
            //工具栏
            var toolbarArr = [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ];
            //
            var callbacks = {
                onInit: function() {
                    //console.log('Summernote 初始化 。。。');
                },
                onImageUpload: function(files) {
                    //上传文件
                    //console.log("files：" + files)
                    if (files.length <= 0) return;
                    var fd = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        fd.append("file", files[i]);
                    }

                    var url = that.url + '/fileAction/uploadFile'
                    that.$ajax({
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: fd,
                        dataType: 'json',
                    }).then((response) => {
                        var res = response.data
                        //console.log(response)
                        if (res.retCode == '0000') {
                            var retData = res.retData;
                            if (retData.length > 0) {
                                for (var i = 0; i < retData.length; i++) {
                                    var imgObj = retData[i];
                                    var imgUrl = that.addTimesParam(that.url + imgObj.fileUrl);
                                    var imgName = imgObj.srcName;
                                    $('#summernote').summernote('insertImage', imgUrl, imgName);
                                }
                            }
                        }
                    }).catch((error) => {
                        console.log('请求失败处理')
                    });
                }
            };

            $('#summernote').summernote({
                lang: 'zh-CN',
                //toolbar: toolbarArr,
                //height: '100px',
                //width: '200px',
                callbacks: callbacks
            });
        }
    }
</script>

<style>
</style>
<!--
<div id="spinDiv"></div>
<button @click="btn" id="btn1">按钮1</button>
<button @click="btn2">按钮2</button>
btn() {
                //npm i spin.js
                // import {
                //     Spinner
                // } from 'spin.js';
                // require('spin.js/spin.css')
                var opts = {
                    lines: 14, // The number of lines to draw
                    length: 0, // The length of each line
                    width: 17, // The line thickness
                    radius: 45, // The radius of the inner circle
                    scale: 1, // Scales overall size of the spinner
                    corners: 1, // Corner roundness (0..1)
                    color: 'red', // CSS color or array of colors
                    fadeColor: 'transparent', // CSS color or array of colors
                    speed: 1, // Rounds per second
                    rotate: 0, // The rotation offset
                    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    className: 'spinner', // The CSS class to assign to the spinner
                    top: '50%', // Top position relative to parent
                    left: '50%', // Left position relative to parent
                    shadow: '0 0 1px transparent', // Box-shadow for the lines
                    position: 'absolute' // Element positioning

                };

                var spinner = null;
                var target = document.getElementById('btn1');
                if (spinner != null) {
                    spinner.stop()
                }
                spinner = new Spinner(opts).spin(target);
            } -->
