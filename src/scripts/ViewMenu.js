import Vue from 'vue'
import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'ViewMenu',
    components: {
        PageHeader,
        PageFooter,
        News
    },
    data() {
        return {
            expanded: [],
            singleExpand: true,
            dessertHeaders: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
                { text: '', value: 'data-table-expand' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
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
            mobile_items: [
                {
                    name: 'Frozen Yogurt',
                    category: 'Ice cream',
                    dairy: 'Yes',
                },
                {
                    name: 'Ice cream sandwich',
                    category: 'Ice cream',
                    dairy: 'Yes',
                },
                {
                    name: 'Eclair',
                    category: 'Cookie',
                    dairy: 'Yes',
                },
                {
                    name: 'Cupcake',
                    category: 'Pastry',
                    dairy: 'Yes',
                },
                {
                    name: 'Gingerbread',
                    category: 'Cookie',
                    dairy: 'No',
                },
                {
                    name: 'Jelly bean',
                    category: 'Candy',
                    dairy: 'No',
                },
                {
                    name: 'Lollipop',
                    category: 'Candy',
                    dairy: 'No',
                },
                {
                    name: 'Honeycomb',
                    category: 'Toffee',
                    dairy: 'No',
                },
                {
                    name: 'Donut',
                    category: 'Pastry',
                    dairy: 'Yes',
                },
                {
                    name: 'KitKat',
                    category: 'Candy',
                    dairy: 'Yes',
                },
            ],
            menu_imgs_index: 0,
            menu_imgs: [
                {
                    input_image: null,
                    uploadImageUrl: '',
                }
            ],
            loading: true,
            select_items: [],
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
                // {
                //     text: 'ビタミン',
                //     value: 'vitamin',
                //     align: 'center',
                //     sortable: false,
                //     width: '250px',
                // },
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
            compositions: [],
        }
    },
    methods: {
        get_select_items() {
            this.loading = true
            this.select_items = ['えび', 'いか', 'いくら', 'たこ']
            this.get_posted_menus()
            this.loading = false
        },
        get_posted_menus() {
            new ApiUtils().getAccess(URL.GET_POSTED_MENU, {}, (response) => {
                console.log('response: ');
                console.log(response);
                this.compositions = response;
            });
        },
        add_material() {
            this.compositions.push({
                "material": "",
                "amount": 0,
                "waste": 0,
                "energy": 0,
                "protein": 0,
                "lipid": 0,
                "carbohydrate": 0,
                "calcium": 0,
                "iron": 0,
                "vitaminA": 0,
                "vitaminD": 0,
                "vitaminE": 0,
                "vitaminK": 0,
                "vitaminC": 0,
                "cholesterol": 0,
                "dietaryFiber": 0,
                "saltEquivalent": 0
            })
        },
        add_menu_img() {
            this.menu_imgs.push({
                input_image: null,
                uploadImageUrl: '',
            })
        },
        post_menu(id) {
            let element = $(id)
            element.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
                element.removeClass('active');
            })
            element.addClass("active");
        },
        selectImage(index) {
            this.menu_imgs_index = index
        },
        onImagePicked(file) {
            let i = this.menu_imgs_index
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.addEventListener('load', () => {
                    this.menu_imgs[i].uploadImageUrl = fr.result
                })
            } else {
                this.menu_imgs[i].uploadImageUrl = ''
            }
        }
    },
    mounted() {
        this.get_select_items()
    },
}