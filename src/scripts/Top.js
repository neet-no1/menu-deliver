import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'
import MediaCard from '../pages/module/MediaCard.vue'
import MediaCardLarge from '../pages/module/MediaCardLarge.vue'
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: 'Top',
  components: {
    PageHeader,
    PageFooter,
    News,
    MediaCard,
    MediaCardLarge,
    VueSlickCarousel
  },
  data() {
    return {
      // おすすめ情報
      recommend: {},
      // おすすめ情報表示・非表示
      disable_recommend: false,

      // 新着献立
      menu_new_arrival: [],

      // 人気献立
      menu_popular: [],

      // 新着記事
      article_new_arrival: [],
      article_new_arrival_small: [],

      // スライドショー設定
      settings: {
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        centerMode: true,
        slidesToShow: 5,
        centerPadding: '10px',
      },
    }
  },
  methods: {
    get_items() {
      // おすすめ情報を取得する
      this.get_recommend_meta()

      // 新着献立を取得する
      this.get_menu_new_arrival()

      // 人気献立を取得する
      this.get_menu_popular()

      // 新着記事を取得する
      this.get_article_new_arrival()
    },
    get_recommend_meta() {
      new ApiUtils().getAccess(
        URL.GET_RECOMMEND_META,
        {},
        (response) => {
          if (response.code == 0) {
            // idが-1の時以外は出力する
            if (response.info.id != -1) {
              this.disable_recommend = true
              this.recommend = {
                id: response.info.id,
                image_path: response.info.imgPath
              }
            }
          } else {
            alert(response.errorInfo.errorMessage)
            console.log('おすすめ情報表示パラメタ取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_menu_new_arrival() {
      new ApiUtils().getAccess(
        URL.GET_MENU_NEWARRIVAL,
        {},
        (response) => {
          if (response.code == 0) {
            this.menu_new_arrival = response.info.menus.map((e) => {
              return {
                img_src: e.thumbPath,
                title: e.title,
                title_class: ['el_menu_title__large'],
                img_class: ['el_menu_img__large'],
                link: '/menu/item?id=' + e.id
              }
            })
          } else {
            alert(response.errorInfo.errorMessage)
            console.log('新着献立取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_menu_popular() {
      new ApiUtils().getAccess(
        URL.GET_MENU_POPULAR,
        {},
        (response) => {
          if (response.code == 0) {
            this.menu_popular = response.info.menus.map((e) => {
              return {
                img_src: e.thumbPath,
                title: e.title,
                title_class: ['el_menu_title__large'],
                img_class: ['el_menu_img__large'],
                link: '/menu/item?id=' + e.id
              }
            })
          } else {
            alert(response.errorInfo.errorMessage)
            console.log('人気献立取得エラー')
            console.log(response)
          }
        }
      )
    },
    get_article_new_arrival() {
      new ApiUtils().getAccess(
        URL.GET_ARTICLE_NEWARRIVAL,
        {},
        (response) => {
          if (response.code == 0) {
            let info = response.info

            if (info.articles.length > 3) {
              this.article_new_arrival = info.articles.slice(0, 3).map((e) => {
                return {
                  title: e.title,
                  detail: e.detail,
                  date: e.date,
                  user_icon: e.userIconPath,
                  img: e.imgPath,
                  item_class: [''],
                  img_class: ['el_article_item_img__large'],
                  title_class: [''],
                  date_class: [''],
                  isDetail: true,
                  isIcon: true,
                  link: '/article/item?id=' + e.id
                }
              })
              this.article_new_arrival_small = info.articles.slice(3).map((e) => {
                return {
                  img_src: e.imgPath,
                  title: e.title,
                  title_class: ['el_menu_title__large'],
                  img_class: ['el_menu_img__large'],
                  link: '/article/item?id=' + e.id
                }
              })
            } else {
              this.article_new_arrival = info.articles.map((e) => {
                return {
                  title: e.title,
                  detail: e.detail,
                  date: e.date,
                  user_icon: e.userIconPath,
                  img: e.imgPath,
                  item_class: [''],
                  img_class: ['el_article_item_img__large'],
                  title_class: [''],
                  date_class: [''],
                  isDetail: true,
                  isIcon: true,
                  link: '/article/item?id=' + e.id
                }
              })
            }
          } else {
            alert(response.errorInfo.errorMessage)
            console.log('新着記事取得エラー')
            console.log(response)
          }
        }
      )
    },
  },
  mounted() {
    this.get_items()
  }
}
