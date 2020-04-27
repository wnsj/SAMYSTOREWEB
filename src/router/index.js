import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import MainPage from '@/components/MainPage.vue'
/*------------*/
import Audio from '../components/MP/Audio.vue'
import Article from '../components/MP/Article.vue'
import Evaluation from '../components/MP/Evaluation.vue'
import Counselor from '../components/MP/Counselor.vue'
import CounselorType from '../components/MP/CounselorType.vue'
import Video from '../components/MP/Video.vue'
// import test from '../components/MP/test.vue'
import newtree from '../components/MP/newtree.vue'
import CourceManage from '../components/MP/CourceManage.vue'
import PlayAV from '@/components/common/PlayAV.vue'
import SignInImgManage from '../components/MP/SignInImgManage.vue'

import EvaluationType from '../components/MP/EvaluationType.vue'
import PreApporint from '../components/MP/PreApporint.vue'
import SummerNote from '@/components/common/SummerNote.vue'

import ArticleTheme from '../components/MP/ArticleTheme.vue'

Vue.use(Router)

//解决路由多次跳转同一页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

export default new Router({
    routes: [{
            path: '/login',
            component: login,
            hidden: true
        },
        {
            path: '/MainPage',
            name: 'MainPage',
            component: MainPage,
            children: [
                {
                    path: '/MP/Audio',
                    name: 'Audio',
                    component: Audio,
                },
                {
                    path: '/MP/Article',
                    name: 'Article',
                    component: Article,
                },
                {
                    path: '/MP/Evaluation',
                    name: 'Evaluation',
                    component: Evaluation,
                },
                {
                    path: '/MP/Video',
                    name: 'Video',
                    component: Video,
                },
                {
                    path: '/MP/CourceManage',
                    name: 'CourceManage',
                    component: CourceManage,
                },
				{
				    path: '/MP/Counselor',
				    name: 'Counselor',
				    component: Counselor,
				},
				{
				    path: '/MP/CounselorType',
				    name: 'CounselorType',
				    component: CounselorType,
				},
				{
				    path: '/MP/PreApporint',
				    name: 'PreApporint',
				    component: PreApporint,
				},
//                 {
//                     path: '/MP/test',
//                     name: 'test',
//                     component: test,
//                 },
                {
                    path: '/MP/newtree',
                    name: 'newtree',
                    component: newtree,
                },
                {
                    path: '/PlayAV',
                    name: 'PlayAV',
                    component: PlayAV,
                },
                {
                    path: '/MP/SignInImgManage',
                    name: 'SignInImgManage',
                    component: SignInImgManage,
                },
				{
				    path: '/MP/EvaluationType',
				    name: 'EvaluationType',
				    component: EvaluationType,
				},
                {
                    path: '/SummerNote',
                    name: 'SummerNote',
                    component: SummerNote,
                },
                {
                    path: '/ArticleTheme',
                    name: 'ArticleTheme',
                    component: ArticleTheme,
                }
            ],
            redirect: '/MP/CourceManage'
        }
    ]
})
