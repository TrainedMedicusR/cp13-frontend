import Vue from 'vue'
import Router from 'vue-router'
import SurveyMain from "../components/SurveyMain";
import NotFound from "../components/NotFound";
import NotAuthorised from "../components/NotAuthorised";
import Complete from "../components/Complete";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/survey/:id',
      component: SurveyMain,
      name: 'SurveyMain'
    },
    {
      path: '/404',
      component: NotFound,
      name: 'NotFound'
    },
    {
      path: '/401',
      component: NotAuthorised,
      name: 'NotAuthorised'
    },
    {
      path: '/complete',
      component: Complete,
      name: 'Complete'
    }
  ]
})
