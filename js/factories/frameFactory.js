'use strict';
define(function(){
	var factoryModule = angular.module('frameFactory', []);
	
	factoryModule.factory('frameFac', function($rootScope){		
		var frame = {};

		frame.adminName = '';

		frame.changeAdminName = function (adminName){
			this.adminName = adminName;
            this.broadcastingTo();
            console.log(this.adminName)
		};

		frame.broadcastingTo = function (){
			$rootScope.$broadcast('changeName');
		};

		return frame;
	});
});