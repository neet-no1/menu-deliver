export default class AjaxMock {
    constructor() {}

    success(url, data) {
        return {
            url: url,
            status: 200,
            logging: 0,

            response: function(settings, done) {
                console.log(settings);
                this.responseText = data;
                done();
            }
        }
    }

    success(url, data, type) {
        return {
            url: url,
            status: 200,
            logging: 0,
            type: type,
            
            response: function(settings, done) {
                console.log(settings);
                this.responseText = data;
                done();
            }
        }
    }

    forbidden() {
        return {
            url: url,
            status: 403,
            logging: 0,

            response: function(settings, done) {
                console.log(settings);
                this.responseText = data;
                done();
            }
        }
    }

    internalServerError() {
        return {
            url: url,
            status: 500,
            logging: 0,

            response: function(settings, done) {
                console.log(settings);
                this.responseText = data;
                done();
            }
        }
    }
}