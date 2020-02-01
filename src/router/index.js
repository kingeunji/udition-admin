
import Vue from "vue";
import VueRouter from "vue-router";
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

// Admin pages
import Artists from "@/pages/Artists/ArtistDashboard.vue";
import ArtistDetail from "@/pages/Artists/ArtistDetailDashboard.vue";
import Business from "@/pages/Business/BusinessDashboard.vue";
import Audition from "@/pages/Auditions/AuditionDashboard.vue";
import Login from "@/pages/Login.vue";


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  // 로그인 완료 후 이전 페이지로 리다이렉트 위해 경로 받아옴
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode : "history",
  routes : [
    {
      path: "/login",
      component : Login
    },
    {
      path: "/",
      component: DashboardLayout,
      redirect : "artists",
      beforeEnter : requireAuth,
      children: [
        {
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
          path: "auditions",
          name: "오디션 관리",
          component: Audition
        }
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
