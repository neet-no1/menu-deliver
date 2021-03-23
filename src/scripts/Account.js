import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import MediaCardLarge from '../pages/module/MediaCardLarge.vue'
import MediaCard from '../pages/module/MediaCard.vue'
import Follower from '../pages/module/Follower.vue'
import Pagenation from '../pages/module/Pagenation.vue'


export default {
  name: 'Account',
  components: {
    PageHeader,
    PageFooter,
    MediaCardLarge,
    MediaCard,
    Follower,
    Pagenation
  },
  data() {
    return {
      // タブ関連
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

      // マイページ
      user_name: '',
      user_email: '',
      user_icon_path: '',

      // 情報編集
      user_name_edit: '',
      user_icon_edit: null,
      user_email_edit: '',

      // パスワード変更
      current_password: '',
      new_password: '',
      new_password_confirm: '',

      // フォロー一覧
      follows: [],
      followers: [],
      follow_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.follow_page = n
          this.get_follow_list()
        }
      },
      follower_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.follower_page = n
          this.get_follow_list()
        }
      },
      follow_page: 1,
      follower_page: 1,

      // 投稿記事
      articles: [],
      posted_article_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.posted_article_page = n
          this.get_posted_articles()
        }
      },
      posted_article_page: 1,

      // 投稿献立
      menus: [],
      posted_menu_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.posted_menu_page = n
          this.get_posted_menus()
        }
      },
      posted_menu_page: 1,

      // お気に入り
      favorite_menus: [],
      favorite_articles: [],
      favorite_menu_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.favorite_menu_page = n
          this.get_favorites()
        }
      },
      favorite_article_pages: {
        total_page: 1,
        current_page: 1,
        callback: (n) => {
          this.favorite_article_page = n
          this.get_favorites()
        }
      },
      favorite_menu_page: 1,
      favorite_article_page: 1,
    }
  },
  methods: {
    get_items() {
      // ユーザ情報取得
      this.get_user_info()

      // フォロー・フォロワー一覧取得
      this.get_follow_list()

      // 投稿記事一覧取得
      this.get_posted_articles()

      // 投稿献立一覧取得
      this.get_posted_menus()

      // お気に入り一覧を取得
      this.get_favorites()
    },
    get_user_info() {
      new ApiUtils().getAccess(
        URL.GET_ACCOUNT_INFO,
        {},
        (response) => {
          if (response.code == 0) {
            let info = response.info

            this.user_name = info.name
            this.user_icon_path = info.imgPath
            this.user_email = info.email

            this.user_name_edit = info.name
            this.user_email_edit = info.email
          } else {
            alert('エラーが発生しました。')
            console.log('アカウント情報取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_follow_list() {
      new ApiUtils().getAccess(
        URL.GET_FOLLOW_LIST,
        {
          followPage: this.follow_page,
          followerPage: this.follower_page
        },
        (response) => {
          if (response.code == 0) {
            let info = response.info

            this.follows = info.follows.map(e => {
              return {
                user_name: e.name,
                user_icon: e.imgPath
              }
            })
            this.follow_pages = {
              total_page: info.followPage.totalPages,
              current_page: info.followPage.currentPage,
              callback: (n) => {
                this.follow_page = n
                this.get_follow_list()
              }
            }

            this.followers = info.followers.map(e => {
              return {
                user_name: e.name,
                user_icon: e.imgPath
              }
            })
            this.follower_pages = {
              total_page: info.followerPage.totalPages,
              current_page: info.followerPage.currentPage,
              callback: (n) => {
                this.follower_page = n
                this.get_follow_list()
              }
            }
          } else {
            alert('エラーが発生しました。')
            console.log('フォロー・フォロワー取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_posted_articles() {
      new ApiUtils().getAccess(
        URL.GET_ACCOUNT_POSTED_ARTICLES,
        {
          page: this.posted_article_page
        },
        (response) => {
          if (response.code == 0) {
            let info = response.info

            this.articles = info.articles.map(e => {
              return {
                title: e.title,
                detail: e.detail,
                date: e.date,
                user_icon: e.userIconPath,
                img: e.imgPath,
                item_class: ['el_atricle_item__small'],
                img_class: ['el_article_item_img__small'],
                title_class: ['el_article_item_title__small'],
                date_class: ['el_article_item_meta_info_date__small'],
                isDetail: false,
                isIcon: false,
                status: e.opened ? 'posted' : 'editing',
                link: '/article/item?id=' + e.id
              }
            })

            this.posted_article_pages = {
              total_page: info.page.totalPages,
              current_page: info.page.currentPage,
              callback: (n) => {
                this.posted_article_page = n
                this.get_posted_articles()
              }
            }
          } else {
            alert('エラーが発生しました。')
            console.log('投稿記事一覧取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_posted_menus() {
      new ApiUtils().getAccess(
        URL.GET_ACCOUNT_POSTED_MENUS,
        {
          page: this.posted_menu_page
        },
        (response) => {
          if (response.code == 0) {
            let info = response.info

            this.menus = info.menus.map(e => {
              return {
                img_src: e.thumbPath,
                title: e.title,
                title_class: ['el_menu_title__small'],
                img_class: ['el_menu_img__small'],
                status: e.opened ? 'posted' : 'editing',
                link: '/menu/item?id=' + e.id
              }
            })

            this.posted_menu_pages = {
              total_page: info.page.totalPages,
              current_page: info.page.currentPage,
              callback: (n) => {
                this.posted_menu_page = n
                this.get_posted_menus()
              }
            }
          } else {
            alert('エラーが発生しました。')
            console.log('投稿献立一覧取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_favorites() {
      new ApiUtils().getAccess(
        URL.GET_ACCOUNT_FAVORITES,
        {
          menuPage: this.favorite_menu_page,
          articlePage: this.favorite_article_page
        },
        (response) => {
          if (response.code == 0) {
            let info = response.info

            this.favorite_menus = info.menus.map(e => {
              return {
                img_src: e.thumbPath,
                title: e.title,
                title_class: ['el_menu_title__small'],
                img_class: ['el_menu_img__small'],
                status: e.opened ? 'posted' : 'editing',
                link: '/menu/item?id=' + e.id
              }
            })

            this.favorite_menu_pages = {
              total_page: info.menuPages.totalPages,
              current_page: info.menuPages.currentPage,
              callback: (n) => {
                this.favorite_menu_page = n
                this.get_favorites()
              }
            }

            this.favorite_articles = info.articles.map(e => {
              return {
                title: e.title,
                detail: e.detail,
                date: e.date,
                user_icon: e.userIconPath,
                img: e.imgPath,
                item_class: ['el_atricle_item__small'],
                img_class: ['el_article_item_img__small'],
                title_class: ['el_article_item_title__small'],
                date_class: ['el_article_item_meta_info_date__small'],
                isDetail: false,
                isIcon: false,
                status: e.opened ? 'posted' : 'editing',
                link: '/article/item?id=' + e.id
              }
            })

            this.favorite_article_pages = {
              total_page: info.articlePages.totalPages,
              current_page: info.articlePages.currentPage,
              callback: (n) => {
                this.favorite_article_page = n
                this.get_favorites()
              }
            }
          } else {
            alert('エラーが発生しました。')
            console.log('お気に入り一覧取得エラー')
            console.log(response)
          }
        }
      )
    },
    switch_follow_list(param) {
      if (param == 'follow') {
        this.isOpen_follow = true;
        this.isOpen_follower = false;
      }

      if (param == 'follower') {
        this.isOpen_follow = false;
        this.isOpen_follower = true;
      }
    },
    switch_favorite(param) {
      if (param == 'menu') {
        this.isOpen_favorite_menu = true;
        this.isOpen_favorite_article = false;
      }

      if (param == 'article') {
        this.isOpen_favorite_menu = false;
        this.isOpen_favorite_article = true;
      }
    },
    select_file: function () {
      this.$refs.select_image.$refs.input.click()
    },
    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.user_icon_path = fr.result
        })
      } else {
        this.user_icon_path = '/public/user_images/user_no_image.jpg'
      }
    },
    user_info_update() {
      let formData = new FormData()
      formData.append("name", this.user_name_edit);
      formData.append("email", this.user_email_edit);
      formData.append("icon", this.user_icon_edit);

      new ApiUtils().formDataAccess(
        URL.POST_ACCOUNT_INFO_UPDATE,
        formData,
        (response) => {
          if (response.code == 0) {
            // 成功したら、ページを開きなおすへ遷移する
            window.location.href = '/account'
          } else {
            alert('エラーが発生しました。')
            console.log('ユーザ情報更新エラー')
            console.log(response)
          }
        }
      )
    },
    password_update() {
      new ApiUtils().postAccess(
        URL.POST_ACCOUNT_PASSWORD_UPDATE,
        {
          currentPassword: this.current_password,
          newPassword: this.new_password,
          newPasswordConfirm: this.new_password_confirm
        },
        (response) => {
          if (response.code == 0) {
            // 成功したら、ページを開きなおすへ遷移する
            window.location.href = '/account'
          } else {
            alert('エラーが発生しました。')
            console.log('パスワード更新エラー')
            console.log(response)
          }
        }
      )
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
    },
    user_icon: function () {
      return 'background-image: url(' + this.user_icon_path + ')'
    },
  },
  mounted() {
    new CommonUtils().isAuthToLogin()
    this.get_items()
  },
}