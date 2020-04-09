import Vue from "vue";
import VueRouter from "vue-router";
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from '@/pages/NotFoundPage.vue'

// Admin pages
import Artists from "@/pages/Artists/ArtistDashboard.vue";
import ArtistDetail from "@/pages/Artists/ArtistDetailDashboard.vue";
import Business from "@/pages/Business/BusinessDashboard.vue";
import Audition from "@/pages/Auditions/AuditionDashboard.vue";
import AuditionDetail from "@/pages/Auditions/AuditionDetailDashboard.vue";
import Apply from "@/pages/Apply/ApplyDashboard.vue";
import BusienssDetail from "@/pages/Business/BusinessDetail.vue";
import Banner from "@/pages/Banner/BannerDashboard.vue";
import Uditok from "@/pages/Uditok/UditokDashboard.vue";
import Notice from "@/pages/Notice/NoticeDashboard.vue";
import Qna from "@/pages/Qna/QnaDashboard.vue";
import Advisor from "@/pages/Advisor/AdvisorDashboard.vue";
import Featuring from "@/pages/Featuring/FeaturingDashboard.vue";


import Login from "@/pages/Login.vue";


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
    const isAuth = localStorage.getItem('token')
        // 로그인 완료 후 이전 페이지로 리다이렉트 위해 경로 받아옴
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "*",
            component: NotFound
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/",
            component: DashboardLayout,
            redirect: "artists",
            beforeEnter: requireAuth,
            children: [{
                    path: "artists",
                    name: "아티스트 관리",
                    component: Artists
                },
                {
                    path: "artists/:webUrl",
                    name: "아티스트 상세정보",
                    component: ArtistDetail
                },
                {
                    path: "business",
                    name: "기업 회원 관리",
                    component: Business
                },
                {
                    path: "business/:bizUrl",
                    name: "기업 상세정보",
                    component: BusienssDetail
                },
                {
                    path: "featuring",
                    name: "피처링",
                    component: Featuring
                },
                {
                    path: "auditions",
                    name: "오디션 관리",
                    component: Audition
                },
                {
                    path: "auditions/:auditionNo",
                    name: "오디션 상세정보",
                    component: AuditionDetail
                },
                {
                    path: "apply/:auditionNo",
                    name: "오디션 지원자 목록",
                    component: Apply
                },
                {
                    path: "banner",
                    name: "배너 관리",
                    component: Banner
                },
                {
                    path: "uditok",
                    name: "유디톡 관리",
                    component: Uditok
                },
                {
                    path: "notice",
                    name: "공지사항 관리",
                    component: Notice
                },
                {
                    path: "qna",
                    name: "자주하는 질문 관리",
                    component: Qna
                },
                {
                    path: "advisor",
                    name: "어드바이저의 팁 관리",
                    component: Advisor
                },
            ]
        }
    ]
});

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default router;