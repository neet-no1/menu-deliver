import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'
import Navigation from '../pages/module/Navigation.vue'
import MediaCard from '../pages/module/MediaCard.vue'
import MediaCardLarge from '../pages/module/MediaCardLarge.vue'

export default {
  name: 'Top',
  components: {
    PageHeader,
    PageFooter,
    News,
    Navigation,
    MediaCard,
    MediaCardLarge
  },
  data() {
    return {
      new_products: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
        this.new_products = response.info.productList;
      }),
      hot_products: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
        this.hot_products = response.info.productList;
      }),
      menus: [
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        },
        {
          img_src: "../../../../public/img/menu_no_image.jpg"
          , title: "豚肉の生姜焼き、ほうれん草の胡麻和え、味噌汁"
          , title_class: ['el_menu_title__large']
          , img_class: ['el_menu_img__large']
        }
      ],
      articles: [
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: "記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細…"
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/recommend_3.jpg"
        },
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: "記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細…"
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/article_no_image.png"
        },
        {
          title: "記事のタイトル記事のタイトル記事のタイトル記事の…"
          , detail: "記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細記事の詳細…"
          , date: "2021/01/29"
          , user_icon: "../../../../public/img/user_1.jpg"
          , img: "../../../../public/img/recommend_3.jpg"
        }
      ]
    }
  }
}