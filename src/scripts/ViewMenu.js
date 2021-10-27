import Vue from 'vue'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'

export default {
    name: 'ViewMenu',
    components: {
        PageHeader,
        PageFooter,
        News
    },
    data() {
        return {
            // 自分の投稿であるか
            mine: false,

            // タイトル
            title: '',

            // サブタイトル
            sub_title: '',

            // 献立表の内容が書かれたJSONファイルのパス
            composition_json_path: '',

            // ロード状態を見せるか
            loading: true,

            // 材料の選択肢
            material_items: [],

            // 献立表の内容
            compositions: [],

            // 作り方
            cookery: '',

            // お気に入りフラグ
            // true: お気に入り追加済み
            is_favorite: false,

            // 拡張
            expanded: [],
            // 拡張部分の表示は1つのみ
            singleExpand: true,
            mobile_total_headers: [
                {
                    text: '栄養素',
                    align: 'start',
                    value: 'composition_name',
                    groupable: false
                },
                {
                    text: '合計値',
                    align: 'end',
                    value: 'total',
                    groupable: false
                }
            ],
            mobile_headers: [
                {
                    text: '材料',
                    align: 'start',
                    value: 'material',
                    groupable: false,
                },
                {
                    text: '使用量',
                    value: 'amount',
                    align: 'right',
                    groupable: false,
                },
                {
                    text: '廃棄込み使用量',
                    value: 'waste',
                    align: 'right',
                    groupable: false,
                },
                {
                    text: '',
                    value: 'data-table-expand'
                },
            ],
            menu_imgs_index: 0,
            menu_imgs: [],
            headers: [
                {
                    text: '材料',
                    align: 'center',
                    sortable: false,
                    value: 'material',
                    width: '200px',
                },
                {
                    text: '使用量',
                    align: 'center',
                    sortable: false,
                    value: 'amount',
                    width: '70px',
                },
                {
                    text: '廃棄込み使用量',
                    align: 'center',
                    sortable: false,
                    value: 'waste',
                    width: '70px',
                },
                {
                    text: 'エネルギー',
                    value: 'energy',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: 'たんぱく質',
                    value: 'protein',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: '脂質',
                    value: 'lipid',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: '炭水化物',
                    value: 'carbohydrate',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: 'カルシウム',
                    value: 'calcium',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: '鉄',
                    value: 'iron',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: 'コレステロール',
                    value: 'cholesterol',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: '食物繊維',
                    value: 'dietaryFiber',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
                {
                    text: '食塩相当量',
                    value: 'saltEquivalent',
                    align: 'center',
                    sortable: false,
                    width: '50px',
                },
            ],
        }
    },
    methods: {
        get_items() {
            // ロード状態をオンにする
            this.loading = true

            // 食品成分表情報を取得する
            this.get_material_items()

            // 現状の献立データを取得する
            this.get_posted_menus()

            // お気に入り状態を取得
            this.get_favorite_state()

            // ロード状態をオフにする
            this.loading = false
        },
        get_material_items() {
            new ApiUtils().getAccess(
                URL.GET_MENU_COMPOSITIONS,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.material_items = response.info
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('食品成分表情報取得エラー')
                        console.log(response)
                    }
                }
            );
        },
        get_posted_menus() {
            let menuId = this.$route.query.id

            if (menuId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_MENU,
                    {
                        'id': menuId
                    },
                    (response) => {
                        if (response.code == 0) {
                            let info = response.info
                            this.title = info.title
                            this.sub_title = info.subTitle
                            this.composition_json_path = info.contents
                            this.mine = info.mine

                            // パスを元にjsonデータを取得する
                            this.get_composition_contents()

                            this.menu_imgs = info.imagePaths.map((e) => {
                                return {
                                    input_image: null,
                                    uploadImageUrl: e.uploadImageUrl,
                                    img_description: e.imageDescription
                                }
                            })
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('献立内容取得エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        get_composition_contents() {
            new ApiUtils().getAccess(
                this.composition_json_path,
                {},
                (response) => {
                    this.compositions = JSON.parse(response.contents)
                    this.cookery = response.cookery
                }
            )
        },
        add_favorite() {
            new CommonUtils().isAuthToLogin(this)
            this.is_favorite = !this.is_favorite

            let menuId = this.$route.query.id

            if (menuId != undefined) {
                new ApiUtils().postAccess(
                    URL.POST_MENU_FAVORITE,
                    {
                        "id": menuId,
                        "added": this.is_favorite
                    },
                    (response) => {
                        if (response.code == 0) {
                            // 成功時は何もしない
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('お気に入り追加・解除エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        get_favorite_state() {
            let menuId = this.$route.query.id

            if (menuId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_FAVORITE_MENU_ITEM,
                    {
                        id: menuId
                    },
                    (response) => {
                        if (response.code == 0) {
                            this.is_favorite = response.info
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('献立のお気に入り追加状態を取得エラー')
                            console.log(response)
                        }
                    }
                )
            }
        },
        edit_menu() {
            let menuId = this.$route.query.id

            if (menuId != undefined) {
                // リンク先に遷移する
                this.$router.push('/post/menu?id=' + menuId)
            }
        },
    },
    computed: {
        composition_total: function () {
            return [
                {
                    composition_name: 'エネルギー',
                    total: this.energy_total + ' kcal'
                },
                {
                    composition_name: 'たんぱく質',
                    total: this.protein_total + ' g'
                },
                {
                    composition_name: '脂質',
                    total: this.lipid_total + ' g'
                },
                {
                    composition_name: '炭水化物',
                    total: this.carbohydrate_total + ' g'
                },
                {
                    composition_name: 'カルシウム',
                    total: this.calcium_total + ' mg'
                },
                {
                    composition_name: '鉄',
                    total: this.iron_total + ' mg'
                },
                {
                    composition_name: 'コレステロール',
                    total: this.cholesterol_total + ' mg'
                },
                {
                    composition_name: '食物繊維',
                    total: this.dietaryFiber_total + ' g'
                },
                {
                    composition_name: '食塩相当量',
                    total: this.saltEquivalent_total + ' g'
                }
            ]
        },
        energy_total: function () {
            console.log(this.compositions)
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce((accumulator, currentValue, currentIndex, array) => {
                    return accumulator + (Math.round(currentValue.energy) * 100);
                }, 0) / 100
            }
        },
        protein_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.protein * 100));
                }, 0) / 100
            }
        },
        lipid_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.lipid * 100));
                }, 0) / 100
            }
        },
        carbohydrate_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.carbohydrate * 100));
                }, 0) / 100
            }
        },
        calcium_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.calcium * 100));
                }, 0) / 100
            }
        },
        iron_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.iron * 100));
                }, 0) / 100
            }
        },
        cholesterol_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.cholesterol * 100));
                }, 0) / 100
            }
        },
        dietaryFiber_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.dietaryFiber * 100));
                }, 0) / 100
            }
        },
        saltEquivalent_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + (Math.round(currentValue.saltEquivalent * 100));
                }, 0) / 100
            }
        },
        width() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    console.log('xs')
                    this.$vuetify.breakpoint.name = 'sm'
                    break;
                case 'sm':
                    console.log('sm')
                    break;
                case 'md':
                    console.log('md')
                    break;
                case 'lg':
                    console.log('lg')
                    break;
                case 'xl':
                    console.log('xl')
                    break;
            }
        },
    },
    mounted() {
        this.get_items()
    }
}