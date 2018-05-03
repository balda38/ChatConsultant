'use strict';
define(function(){
	var directiveModule = angular.module('basketDirective', []);	

	directiveModule.directive('basketDirective', function(basketFactory){		
		return {
			restrict: 'EACM',			
			template:                
                "<button class='basket-button' ng-click='pageTransition()'><img ng-src='http://s1.iconbird.com/ico/2014/1/633/w256h2561390857232shopingcart256.png' width='20' height='20'>Корзина{{basket_count}}</button>",
			scope:{
				path: '@'
			},
			controller: function($scope, $attrs){  
				$scope.basket_count = sessionStorage.getItem('basketCount');	

                basketFactory.getBasketCount(function(count){                    
					$scope.basket_count = count;					
                });

				basketFactory.initData();
				
				$scope.pageTransition = function(){
					document.location.href = $scope.path;
				};			
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
