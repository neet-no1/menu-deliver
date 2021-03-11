import Vue from 'vue'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import MediaCard from '../pages/module/MediaCard.vue'

export default {
    name: 'MenuList',
    components: {
        PageHeader,
        PageFooter,
        MediaCard
    },
    data() {
        return {
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
                    img_src: "/public/img/menu_no_image.jpg"
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
            ]
        }
    }
}