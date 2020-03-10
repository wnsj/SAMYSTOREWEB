<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
        </div>
        <div v-show='!isError'>
            <video id="videobox" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto"
                webkit-playsinline="true" playsinline="true" allowsInlineMediaPlayback=YES
                webview.allowsInlineMediaPlayback=YES width='100%' ref='videoRef' x5-video-player-fullscreen="true"
                :poster="posterSrc">
                <source id="sourceBox" :src="videoSrc" type="video/mp4">
                <p class="vjs-no-js">不支持播放</p>
            </video>
            <!-- <audio id="videobox" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto"
                webkit-playsinline="true" playsinline="true" type="application/x-mpegURL" allowsInlineMediaPlayback=YES
                webview.allowsInlineMediaPlayback=YES width='100%' height="100" ref='videoRef'
                x5-video-player-fullscreen="true" :poster="posterSrc" type="video/mp4" data-setup="{}">
                <source id="sourceBox" :src="videoSrc">
                <p class="vjs-no-js">不支持播放</p>
            </audio> -->
        </div>
        <div v-show='isError' class="errorTip">
            <p>视频出错了!</p>
        </div>
    </div>
</template>

<script>
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    import zhCn from 'video.js/dist/lang/zh-CN.json';
    //import videojsPlaylist from 'videojs-playlist'
    //import videojsPlaylistUi from 'videojs-playlist-ui/dist/videojs-playlist-ui.js'
    //import 'videojs-playlist-ui/dist/videojs-playlist-ui.css'

    var that = null;
    export default {
        components: {

        },
        data() {
            return {
                videoSrc: this.url + '/fileAction/getFile?type=MED&couId=12&ccId=1&power=1',
                posterSrc: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1583668323&di=7192b6709d56a05a613153e8119920af&src=http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg',
                isError: false,
                player: null
            };
        },
        methods: {
            setAtId: function(atId) {
                this.atId = atId
                this.getProject()
            },
            async getProject() {
                var url = this.url + '/articleThemeAction/queryArticleTheme'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {},
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.atList = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('数据请求失败处理')
                });
            },
            initData(url) {
                this.isError = false;
                //console.log('url:' + url)
                this.player.src({
                    src: url,
                    type: 'video/mp4'
                });
                this.player.load(url);
            },
            closeCurrentPage() {
                $("#playAVContent").modal("hide")
                this.player.pause();
                //console.log('关闭添加课程界面')
            }
        },
        created() {
            that = this;
        },
        mounted() {
            //设置中文
            videojs.addLanguage('zh-CN', zhCn);
            var options = {
                bigPlayButton: true,
                textTrackDisplay: true,
                posterImage: true,
                errorDisplay: false,
                controlBar: false,
                playbackRates: [0.5, 1, 1.5, 2],
                ControlBar: {
                    customControlSpacer: true
                },
            };
            //为避免在初始化video时播放源是空的，报播放源错误，需要先给source 的src赋值
            this.player = videojs('videobox', options,
                function onPlayerReady() {
                    // this.play();
                    //var myPlayer = this;
                    this.on('play', function() {
                        console.log('正在播放');
                    });
                    //暂停--播放完毕后也会暂停
                    this.on('pause', function() {
                        console.log("暂停中")
                    });
                    // 结束
                    this.on('ended', function() {
                        console.log('结束');
                    });
                    //错误
                    this.on('error', function() {
                        //player.errorDisplay.close(); //将错误信息不显示
                        // 自定义显示方式
                        that.isError = true;
                        console.log('错误');
                    })
                });
        },
        beforeDestroy() {
            if (this.player) {
                //console.log("beforeDestroy ....")
                this.player.dispose()
            }
        },
        /*beforeRouteLeave() {
            console.log("beforeRouteLeave...")
        }*/

    }

    //设置中文
    /*videojs.addLanguage('zh-CN', {
        "Play": "播放",
        "Pause": "暂停",
        "Current Time": "当前时间",
        "Duration": "时长",
        "Remaining Time": "剩余时间",
        "Stream Type": "媒体流类型",
        "LIVE": "直播",
        "Loaded": "加载完毕",
        "Progress": "进度",
        "Fullscreen": "全屏",
        "Non-Fullscreen": "退出全屏",
        "Mute": "静音",
        "Unmute": "取消静音",
        "Playback Rate": "播放速度",
        "Subtitles": "字幕",
        "subtitles off": "关闭字幕",
        "Captions": "内嵌字幕",
        "captions off": "关闭内嵌字幕",
        "Chapters": "节目段落",
        "Close Modal Dialog": "关闭弹窗",
        "Descriptions": "描述",
        "descriptions off": "关闭描述",
        "Audio Track": "音轨",
        "You aborted the media playback": "视频播放被终止",
        "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
        "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
        "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
        "No compatible source was found for this media.": "无法找到此视频兼容的源。",
        "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。",
        "Play Video": "播放视频",
        "Close": "关闭",
        "Modal Window": "弹窗",
        "This is a modal window": "这是一个弹窗",
        "This modal can be closed by pressing the Escape key or activating the close button.": "可以按ESC按键或启用关闭按钮来关闭此弹窗。",
        ", opens captions settings dialog": ", 开启标题设置弹窗",
        ", opens subtitles settings dialog": ", 开启字幕设置弹窗",
        ", opens descriptions settings dialog": ", 开启描述设置弹窗",
        ", selected": ", 选择",
        "captions settings": "字幕设定",
        "Audio Player": "音频播放器",
        "Video Player": "视频播放器",
        "Replay": "重播",
        "Progress Bar": "进度条",
        "Volume Level": "音量",
        "subtitles settings": "字幕设定",
        "descriptions settings": "描述设定",
        "Text": "文字",
        "White": "白",
        "Black": "黑",
        "Red": "红",
        "Green": "绿",
        "Blue": "蓝",
        "Yellow": "黄",
        "Magenta": "紫红",
        "Cyan": "青",
        "Background": "背景",
        "Window": "视窗",
        "Transparent": "透明",
        "Semi-Transparent": "半透明",
        "Opaque": "不透明",
        "Font Size": "字体尺寸",
        "Text Edge Style": "字体边缘样式",
        "None": "无",
        "Raised": "浮雕",
        "Depressed": "压低",
        "Uniform": "均匀",
        "Dropshadow": "下阴影",
        "Font Family": "字体库",
        "Proportional Sans-Serif": "比例无细体",
        "Monospace Sans-Serif": "单间隔无细体",
        "Proportional Serif": "比例细体",
        "Monospace Serif": "单间隔细体",
        "Casual": "舒适",
        "Script": "手写体",
        "Small Caps": "小型大写字体",
        "Reset": "重置",
        "restore all settings to the default values": "恢复全部设定至预设值",
        "Done": "完成",
        "Caption Settings Dialog": "字幕设定视窗",
        "Beginning of dialog window. Escape will cancel and close the window.": "开始对话视窗。离开会取消及关闭视窗",
        "End of dialog window.": "结束对话视窗",
        "Seek to live, currently behind live": "试图直播，当前延时播放",
        "Seek to live, currently playing live": "试图直播，当前实时播放",
        "progress bar timing: currentTime={1} duration={2}": "{1}/{2}",
        "{1} is loading.": "正在加载 {1}。"
    });*/
</script>

<style>
    /*播放键居中*/
    .vjs-paused .vjs-big-play-button,
    .vjs-paused.vjs-has-started .vjs-big-play-button {
        display: block;
    }

    /*播放按钮变○圆形*/
    .video-js .vjs-big-play-button {
        font-size: 2.5em;
        line-height: 2.3em;
        height: 2.5em;
        width: 2.5em;
        -webkit-border-radius: 2.5em;
        -moz-border-radius: 2.5em;
        border-radius: 2.5em;
        background-color: #73859f;
        background-color: rgba(115, 133, 159, .5);
        border-width: 0.15em;
        margin-top: -1.25em;
        margin-left: -1.75em;
    }

    /* 中间的播放箭头 */
    .vjs-big-play-button .vjs-icon-placeholder {
        font-size: 1.63em;
    }

    /* 加载圆圈 */
    .vjs-loading-spinner {
        font-size: 2.5em;
        width: 2em;
        height: 2em;
        border-radius: 1em;
        margin-top: -1em;
        margin-left: -1.5em;
    }
</style>
