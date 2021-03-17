import Vue from 'vue'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'

export default {
  name: 'Account',
  components: {
    PageHeader,
    PageFooter
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