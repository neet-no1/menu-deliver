import Vue from 'vue'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import MediaCardLarge from '../pages/module/MediaCardLarge.vue'
import MediaCard from '../pages/module/MediaCard.vue'
import Follower from '../pages/module/Follower.vue'


export default {
  name: 'Account',
  components: {
    PageHeader,
    PageFooter,
    MediaCardLarge,
    MediaCard,
    Follower
  },
  data() {
    return {
      mypage: 'mypage',
      edit: 'edit',
      password_edit: 'password_edit',
      follow_list: 'follow_list',
      posted_menu: 'posted_menu',
      posted_article: 'posted_article',
      favorite: 'favorite',

      active_tab: 'mypage',

      isOpen_follow: true,
      isOpen_follower: false,

      isOpen_favorite_menu: true,
      isOpen_favorite_article: false,

      user_icon: {
        'background-image': 'url("/public/img/user_1.jpg")'
      },
      follows: [
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォローA",
          user_icon: "/public/img/user_1.jpg"
        },
        
      ],
      followers: [
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
        {
          user_name: "フォロワーA",
          user_icon: "/public/img/user_1.jpg"
        },
      ],
      menus: [
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__small']
          , img_class: ['el_menu_img__small']
        }
      ],
      articles: [
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: ""
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/recommend_3.jpg"
          , item_class: ['el_atricle_item__small']
          , img_class: ['el_article_item_img__small']
          , title_class: ['el_article_item_title__small']
          , date_class: ['el_article_item_meta_info_date__small']
          , isDetail: false
          , isIcon: false
        },
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: "記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細…"
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/article_no_image.png"
          , item_class: ['el_atricle_item__small']
          , img_class: ['el_article_item_img__small']
          , title_class: ['el_article_item_title__small']
          , date_class: ['el_article_item_meta_info_date__small']
          , isDetail: false
          , isIcon: false
        },
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: "記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細…"
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/recommend_3.jpg"
          , item_class: ['el_atricle_item__small']
          , img_class: ['el_article_item_img__small']
          , title_class: ['el_article_item_title__small']
          , date_class: ['el_article_item_meta_info_date__small']
          , isDetail: false
          , isIcon: false
        }
      ],
    }
  },
  computed: {
    isActive_mypage: function () {
      return this.active_tab == this.mypage
    },
    isActive_edit: function () {
      return this.active_tab == this.edit
    },
    isActive_password_edit: function () {
      return this.active_tab == this.password_edit
    },
    isActive_follow_list: function () {
      return this.active_tab == this.follow_list
    },
    isActive_posted_menu: function () {
      return this.active_tab == this.posted_menu
    },
    isActive_posted_article: function () {
      return this.active_tab == this.posted_article
    },
    isActive_favorite: function () {
      return this.active_tab == this.favorite
    }
  },
  methods: {
    switch_follow_list: function (param) {
      if (param == 'follow') {
        this.isOpen_follow = true;
        this.isOpen_follower = false;
      }

      if (param == 'follower') {
        this.isOpen_follow = false;
        this.isOpen_follower = true;
      }
    },
    switch_favorite: function (param) {
      if (param == 'menu') {
        this.isOpen_favorite_menu = true;
        this.isOpen_favorite_article = false;
      }

      if (param == 'article') {
        this.isOpen_favorite_menu = false;
        this.isOpen_favorite_article = true;
      }
    }
  }
}