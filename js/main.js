'use strict';
require.config({
	paths: {
		'angular': '../bower_components/angular/angular.min',
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'app': 'chatConsultant',
		'frameDirective': 'directives/frameDirective',
		'chatDirective': 'directives/chatDirective',
		'smartphoneDirective': 'directives/smartphoneDirective',
		'basketDirective': 'directives/basketDirective',
		'basketFactory': 'factories/basketFactory',
		'frameFactory': 'factories/frameFactory',
		'smartphoneDirectiveSmall': 'directives/smartphoneDirectiveSmall',
		'productDirective': 'directives/productDirective',
		'acceptOrderDirective': 'directives/acceptOrderDirective',
		'totalBasketDirective': 'directives/totalBasketDirective',
		'basketController': 'controllers/basketController',
		'nouislider': '../bower_components/noUiSlider/nouislider.min',
		'priceSlider': 'priceSlider',
		'messagesService': 'services/messagesService'
	},
	
	shim: {
		'app': {
			deps: ['angular', 'frameDirective', 'chatDirective', 'smartphoneDirective', 'basketDirective', 'basketFactory', 'frameFactory', 'smartphoneDirectiveSmall', 'nouislider', 'priceSlider', 'jquery', 'productDirective', 'acceptOrderDirective', 'totalBasketDirective', 'basketController', 'messagesService']
		},
		'frameDirective':{
			deps: ['angular']
		},		
		'chatDirective':{
			deps: ['angular']
		},		
		'smartphoneDirective':{
			deps: ['angular']
		},
		'basketDirective':{
			deps: ['angular']
		},
		'basketFactory':{
			deps: ['angular']
		},
		'frameFactory':{
			deps: ['angular']
		},
		'smartphoneDirectiveSmall':{
			deps: ['angular']
		},
		'productDirective':{
			deps: ['angular']
		},
		'acceptOrderDirective':{
			deps: ['angular']
		},
		'totalBasketDirective':{
			deps: ['angular']
		},
		'basketController':{
			deps: ['angular']
		},
		'priceSlider':{
			deps: ['jquery'],
			exports: '$'
		},
		'messagesService':{
			deps: ['angular']
		}
	}
});

require(['app'], function (){
	angular.bootstrap(document, ['chatConsultant']);
});