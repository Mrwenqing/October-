import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('../layout/index.vue'),
    redirect: '/index',
    children: [{
        path: '/index',
        name: 'index',
        component: () => import('../views/index/index.vue')
      },
      // blog 博客管理
      {
        path: '/blog',
        name: 'blog',
        component: () => import('../views/blog/index.vue'),
        children: [
          // article 文章管理
          {
            path: 'article',
            name: 'article',
            component: () => import('../views/blog/article.vue')
          },
          // category 分类管理
          {
            path: 'category',
            name: 'category',
            component: () => import('../views/blog/category.vue')
          },
          // 标签管理 label
          {
            path: 'label',
            name: 'label',
            component: () => import('../views/blog/label.vue')
          },

        ]
      },
      // 广告
      {
        path: "/advert",
        name: 'advert',
        component:()=>import('../views/advert/index.vue')
      },
      // 系统管理
      {
        path: "/system",
        name: "system",
        component: () => import("../views/system/index.vue"),
        children: [
        // 用户管理
          {
            path: "user",
            name: "user",
            component:()=>import('../views/system/user.vue')          
          },
          // role 角色
          {
            path: "role",
            name: "role",
            component:()=>import('../views/system/role.vue')          
          },
          // menu 菜单
          {
            path: "menu",
            name: "menu",
            component:()=>import('../views/system/menu.vue')          
          },
        ]
        
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router