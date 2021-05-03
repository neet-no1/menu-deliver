import Vue from 'vue'
import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'
import Compressor from 'compressorjs'

export default {
    name: 'PostMenu',
    data() {
        return {
            // タイトル
            title: '',

            // サブタイトル
            sub_title: '',

            // カテゴリ
            category: '',

            // カテゴリリスト
            categories: [],

            // 献立表の内容が書かれたJSONファイルのパス
            composition_json_path: '',

            // 献立表の内容
            compositions: [],

            // 作り方
            cookery: '',

            // 献立表の材料を選択した際のindex
            current_conposition_index: 0,

            // 献立表の使用量を選択した際のindex
            current_amount_index: 0,

            // サムネイル画像
            thumb_input_image: null,
            thumb_image_url: '',

            // 作り方のイメージ画像をクリックした際のindex
            menu_imgs_index: 0,
            // 作り方のイメージ画像
            menu_imgs: [
                {
                    input_image: null,
                    uploadImageUrl: '',
                    img_description: ''
                }
            ],

            // ロード状態を見せるか
            loading: true,

            // 材料の選択肢
            material_items: [],

            // 献立表のヘッダ
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
                {
                    text: '削除',
                    value: 'delete',
                    align: 'center',
                    sortable: false,
                    width: '30px',
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

            // カテゴリを取得する
            this.get_categories()

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
            console.log(this.$route.query)
            let param = this.$route.query
            let menuId = param.id

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
                            this.category = info.categoryId
                            this.thumb_image_url = info.thumbPath
                            this.composition_json_path = info.contents

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
            } else {
                this.add_material()
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
        get_categories() {
            new ApiUtils().getAccess(
                URL.GET_MENU_CATEGORIES,
                {},
                (response) => {
                    console.log(response)
                    if (response.code == 0) {
                        this.categories = response.info
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('献立カテゴリ取得エラー')
                        console.log(response)
                    }
                }
            );
        },
        add_material() {
            this.compositions.push({
                "compId": null,
                "material": "",
                "amount": 0,
                "waste": 0,
                "energy": 0,
                "protein": 0,
                "lipid": 0,
                "carbohydrate": 0,
                "calcium": 0,
                "iron": 0,
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
        selectImage(index) {
            this.menu_imgs_index = index
        },
        onImagePicked(file) {
            let i = this.menu_imgs_index
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }

                let vc = this
                let payload = {
                    quality: 0.6,
                    maxWidth: 350,
                    maxHeight: 220,
                    success(result) {
                        const fr = new FileReader()
                        fr.readAsDataURL(result)
                        fr.addEventListener('load', () => {
                            vc.menu_imgs[i].uploadImageUrl = fr.result
                        })

                        vc.menu_imgs[i].input_image = result
                    },
                    error(err) {
                        console.log(err.message);
                    },
                }
                new Compressor(file, payload)
            } else {
                this.menu_imgs[i].uploadImageUrl = ''
            }
        },
        onThumbPicked(file) {
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }

                let vc = this
                let payload = {
                    quality: 0.6,
                    maxWidth: 350,
                    maxHeight: 220,
                    success(result) {
                        const fr = new FileReader()
                        fr.readAsDataURL(result)
                        fr.addEventListener('load', () => {
                            vc.thumb_image_url = fr.result
                        })

                        vc.thumb_input_image = result
                    },
                    error(err) {
                        console.log(err.message);
                    },
                }
                new Compressor(file, payload)
            } else {
                this.thumb_image_url = ''
            }
        },
        materialChange(e) {
            this.$set(
                this.compositions,
                this.current_conposition_index,
                {
                    "compId": e.id,
                    "material": e.name,
                    "amount": 100,
                    "waste": Math.round(10000 / (100 - e.refuse) * 10) / 10,
                    "energy": e.energy,
                    "protein": e.protein,
                    "lipid": e.lipid,
                    "carbohydrate": e.carbohydrate,
                    "calcium": e.calcium,
                    "iron": e.iron,
                    "cholesterol": e.cholesterol,
                    "dietaryFiber": e.dietaryFibers,
                    "saltEquivalent": e.saltEquivalents
                });
        },
        materialClick(index) {
            this.current_conposition_index = index
        },
        amountChange(e) {
            let comp = this.compositions[this.current_amount_index]
            this.$set(
                this.compositions,
                this.current_amount_index,
                {
                    "compId": comp.compId,
                    "material": comp.material,
                    "amount": e,
                    "waste": Math.round((comp.waste * e) / 10) / 10,
                    "energy": Math.round((comp.energy * e) / 10) / 10,
                    "protein": Math.round((comp.protein * e) / 10) / 10,
                    "lipid": Math.round((comp.lipid * e) / 10) / 10,
                    "carbohydrate": Math.round((comp.carbohydrate * e) / 10) / 10,
                    "calcium": Math.round((comp.calcium * e) / 10) / 10,
                    "iron": Math.round((comp.iron * e) / 10) / 10,
                    "cholesterol": Math.round((comp.cholesterol * e) / 10) / 10,
                    "dietaryFiber": Math.round((comp.dietaryFiber * e) / 10) / 10,
                    "saltEquivalent": Math.round((comp.saltEquivalent * e) / 10) / 10,
                }
            );
        },
        amountClick(index) {
            this.current_amount_index = index
        },
        post_menu(isOpen) {
            let menuId = this.$route.query.id

            if (menuId == undefined) {
                menuId = 0
            }

            let formData = new FormData()
            formData.append("id", menuId);
            formData.append("title", this.title);
            formData.append("subTitle", this.sub_title);
            formData.append("thumb", this.thumb_input_image);
            formData.append("category", this.category);
            formData.append("cookery", this.cookery);
            formData.append("opened", isOpen);
            formData.append("contents", JSON.stringify(this.compositions));
            this.menu_imgs.map(e => {
                formData.append("files", e.input_image)
            });
            this.menu_imgs.map(e => {
                formData.append("filesDescription", e.img_description);
            });

            new ApiUtils().formDataAccess(
                URL.POST_MENU,
                formData,
                (response) => {
                    if (response.code == 0) {
                        // 成功したら、トップページへ遷移する
                        this.$router.push('/')
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('献立投稿エラー')
                        console.log(response)
                    }
                }
            )
        },
        delete_menu() {
            let menuId = this.$route.query.id

            if (menuId != undefined) {
                // 削除処理を行う
                new ApiUtils().postAccess(
                    URL.POST_MENU_DELETE,
                    {
                        "id": menuId
                    },
                    (response) => {
                        if (response.code != 0) {
                            alert(response.errorInfo.errorMessage)
                            console.log('記事削除エラー')
                            console.log(response)
                        } else {
                            // 成功したら、トップページへ遷移する
                            this.$router.push('/')
                        }
                    }
                );
            } else {
                // 削除対象が存在しない場合は、1つ前に戻る
                window.history.back(-1);
                return false;
            }
        },
        deleteItem(item) {
            console.log('delete')
            let editedIndex = this.compositions.indexOf(item)
            this.compositions.splice(editedIndex, 1)
        },
    },
    computed: {
        composition_items: function () {
            return this.compositions
        },
        energy_total: function () {
            if (this.compositions.length === 0) {
                return ''
            } else {
                return this.compositions.reduce(function (accumulator, currentValue, currentIndex, array) {
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
    },
    mounted() {
        new CommonUtils().isAuthToLogin()
        this.get_items()
    },
}