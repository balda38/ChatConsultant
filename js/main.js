'use strict';
require.config({
	paths: {
		'angular': '../bower_components/angular/angular.min',
		'app': 'chatConsultant',
		'frameDirective': 'directives/frameDirective',
		'chatDirective': 'directives/chatDirective',
		'smartphoneDirective': 'directives/smartphoneDirective'
	},
	
	shim: {
		'app': {
			deps: ['angular', 'frameDirective', 'chatDirective', 'smartphoneDirective']
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
	}
});

require(['app'], function (){
	angular.bootstrap(document, ['chatConsultant']);
});