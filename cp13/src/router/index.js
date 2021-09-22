import Vue from 'vue'
import Router from 'vue-router'
import SurveyMain from "../components/SurveyMain";
import NotFound from "../components/NotFound";
import Dropdown from "../components/questions/Dropdown";
import Likert from "../components/questions/Likert";



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
      path: '/Dropdown',
      component: Dropdown,
      name: 'Dropdown'
    },
    {
      path: '/Likert',
      component: Likert,
      name: 'Likert'
    }
  ]
})
