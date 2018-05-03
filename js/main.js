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
		'smartphoneDirectiveSmall': 'directives/smartphoneDirectiveSmall',
		'productDirective': 'directives/productDirective',
		'acceptOrderDirective': 'directives/acceptOrderDirective',
		'totalBasketDirective': 'directives/totalBasketDirective',
		'basketController': 'controllers/basketController',
		'nouislider': '../bower_components/noUiSlider/nouislider.min',
		'priceSlider': 'priceSlider'
	},
	
	shim: {
		'app': {
			deps: ['angular', 'frameDirective', 'chatDirective', 'smartphoneDirective', 'basketDirective', 'basketFactory', 'smartphoneDirectiveSmall', 'nouislider', 'priceSlider', 'jquery', 'productDirective', 'acceptOrderDirective', 'totalBasketDirective', 'basketController']
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
		}
	}
});

require(['app'], function (){
	angular.bootstrap(document, ['chatConsultant']);
});