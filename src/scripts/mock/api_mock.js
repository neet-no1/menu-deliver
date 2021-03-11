import AjaxMock from "./ajax_mock";
import * as URL from "../../common/api_url";
import menu_success from "./data/menu.json";

export default class ApiMock {

    constructor() {
        console.log('ApiMock constructor');
        console.log($);
        this.load = this.load.bind(this);
    }

    load() {
        $.mockjax(new AjaxMock().success(
            URL.GET_UPLOADED_IMAGE,
            {
                success: 1,
                file: {
                    url: 'https://app.neet-professional.work/public/img/menu_no_image.jpg',
                    // any other image data you want to store, such as width, height, color, extension, etc
                }
            },
            'post'
        ));

        $.mockjax(new AjaxMock().success(
            URL.POST_UPLOAD_IMAGE,
            {
                success: 1,
                file: {
                    url: 'https://app.neet-professional.work/public/img/menu_no_image.jpg',
                    // any other image data you want to store, such as width, height, color, extension, etc
                }
            },
            'post'
        ));

        $.mockjax(new AjaxMock().success(
            URL.GET_POSTED_MENU,
            menu_success,
            'get'
        ));

        $.mockjax(new AjaxMock().success(
            URL.POST_LOGIN,
            { text: 'url' },
            'post'
        ));

        $.mockjax(new AjaxMock().success(
            URL.GET_NEW_ARRIVAL_PRODUCTS,
            {
                "status": 0,
                "error": null,
                "info": {
                    "productList": [
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 19,
                            "price": 2000,
                            "name": "product_8",
                            "thumbnail": "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 22,
                            "price": 2000,
                            "name": "product_11",
                            "thumbnail": "https://images.pexels.com/photos/1086711/pexels-photo-1086711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        }
                    ]
                }
            },
            'get'
        ));

        $.mockjax(new AjaxMock().success(
            URL.GET_PRODUCT_SEARCH_KEYWORD,
            {
                "status": 0,
                "error": null,
                "info": {
                    "productList": [
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 19,
                            "price": 2000,
                            "name": "product_8",
                            "thumbnail": "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 22,
                            "price": 2000,
                            "name": "product_11",
                            "thumbnail": "https://images.pexels.com/photos/1086711/pexels-photo-1086711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        }
                    ]
                }
            },
            'get'
        ));

        $.mockjax(new AjaxMock().success(
            URL.GET_PRODUCT_SEARCH_CATEGORY,
            {
                "status": 0,
                "error": null,
                "info": {
                    "productList": [
                        {
                            "productId": 21,
                            "price": 2000,
                            "name": "product_10",
                            "thumbnail": "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 19,
                            "price": 2000,
                            "name": "product_8",
                            "thumbnail": "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        },
                        {
                            "productId": 22,
                            "price": 2000,
                            "name": "product_11",
                            "thumbnail": "https://images.pexels.com/photos/1086711/pexels-photo-1086711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        }
                    ]
                }
            },
            'get'
        ));

        $.mockjax(new AjaxMock().success(
            URL.GET_CATEGORY_LIST,
            {
                "status": 0,
                "error": null,
                "info": [
                    {
                        "categoryId": 1,
                        "categoryName": "親1",
                        "childCategoryList": [
                            {
                                "categoryId": 2,
                                "categoryName": "親1_子1",
                                "childCategoryList": null
                            },
                            {
                                "categoryId": 3,
                                "categoryName": "親1_子2",
                                "childCategoryList": null
                            }
                        ]
                    },
                    {
                        "categoryId": 4,
                        "categoryName": "親2",
                        "childCategoryList": [
                            {
                                "categoryId": 5,
                                "categoryName": "親2_子1",
                                "childCategoryList": null
                            },
                            {
                                "categoryId": 6,
                                "categoryName": "親2_子2",
                                "childCategoryList": null
                            }
                        ]
                    },
                    {
                        "categoryId": 7,
                        "categoryName": "親3",
                        "childCategoryList": [
                            {
                                "categoryId": 8,
                                "categoryName": "親3_子1",
                                "childCategoryList": null
                            },
                            {
                                "categoryId": 9,
                                "categoryName": "親3_子2",
                                "childCategoryList": null
                            }
                        ]
                    },
                    {
                        "categoryId": 12,
                        "categoryName": "p4",
                        "childCategoryList": []
                    }
                ]
            },
            'get'
        ));
    }
}