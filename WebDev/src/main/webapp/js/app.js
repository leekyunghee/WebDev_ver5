require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        views : '../app/views',
        models : '../app/models',
        collection : '../app/collection',
        tpl: '../tpl'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        }
    }
});

require(['jquery', 'backbone', 'app/router', 'app/PageMove'], function ($, Backbone, Router, PageMove) {
	var _sync = Backbone.sync;
	Backbone.sync = function(method, model, options) {
		method='create';
		options.contentType = 'application/json';
		options.dataType = 'json';
		
		_sync(method, model, options);
	};
	console.log('start app');
    var router = new Router();
    // 전역으로 선언 해준다. 
    // new를 안해도 된다. return만 받아서 쓰므로 
    Backbone.pageMove = PageMove;
    Backbone.history.start();
});