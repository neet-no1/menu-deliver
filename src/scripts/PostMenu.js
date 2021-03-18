import Vue from 'vue'
import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'PostMenu',
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
    computed: {
        energy_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.energy);
                }, 0)
            }
        },
        protein_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.protein);
                }, 0)
            }
        },
        lipid_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.lipid);
                }, 0)
            }
        },
        carbohydrate_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.carbohydrate);
                }, 0)
            }
        },
        calcium_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.calcium);
                }, 0)
            }
        },
        iron_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.iron);
                }, 0)
            }
        },
        cholesterol_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.cholesterol);
                }, 0)
            }
        },
        dietaryFiber_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.dietaryFiber);
                }, 0)
            }
        },
        saltEquivalent_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
                    return accumulator + Number(currentValue.saltEquivalent);
                }, 0)
            }
        },
    },
    mounted() {
        this.get_select_items()
    },
}