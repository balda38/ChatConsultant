'use strict';
define(function(){
	var directiveModule = angular.module('acceptOrderDirective', []);	

	directiveModule.directive('acceptOrderDirective', function(basketFactory){		
		return {
			restrict: 'EACM',			
			template:                
            "<button id='orderAccept' class='accept-order-button' ng-click='acceptOrder()'>Оплатить<br>{{totalPrice}}</button>",
			scope:{
				
			},
			controller: function($scope, $attrs){
				basketFactory.acceptButtonDisplay(function(){
					if(Number(sessionStorage.getItem('basketCount')) > 0){
						aoButton.style.display = "block";
					}
					else{
						aoButton.style.display = "none";
					}
					$scope.totalPrice = sessionStorage.getItem('totalPrice');
				});
				
                $scope.totalPrice = sessionStorage.getItem('totalPrice');

                var aoButton = document.getElementById('orderAccept');

                if(Number(sessionStorage.getItem('basketCount')) > 0){
                    aoButton.style.display = "block";
                }

				$scope.acceptOrder = function(){
                    sessionStorage.setItem('basketCount', 0);
					sessionStorage.setItem('totalPrice', 0);
                    basketFactory.resetData();
                    basketFactory.initData();
                    aoButton.style.display = "none";
				};			
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
