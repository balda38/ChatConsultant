'use strict';
define(function(){
	var directiveModule = angular.module('smartphoneDirective', []);	

	directiveModule.directive('smartphoneDirective', function(basketFactory){		
		return {
			restrict: 'EACM',			
			template:
                "<div class=top-offers>" + 
				    "<h3 style='color: #8B4513; text-align: center; cursor: pointer' ng-click='page_transition()'>{{name}}</h3>" +
					    "<p align='center'><img ng-src='{{imgPath}}' style='cursor: pointer' width='130' height='250' ng-click='page_transition()'></p>" +
					    '<ul>' +
						    "<li>Процессор: {{processor}}" +
						    "<li>ОЗУ: {{ram}}" +
						    "<li>Внутренняя память: {{memory}}" +
						    "<li>Аккумулятор: {{battery}}" +
						    "<li>Камера: {{camera}}" +
						    "<li>Экран: {{display}}" +
						    "<li>Другое: {{other}}" +
					    "</ul>" +
                    "<table class='top-offer-buttons'>"+
                        "<tr>" +
                            "<td><button class='buy-button' ng-click='go_pay()'>Купить<br>{{price}}</button></td>" +
                            "<td><button class='basket-add-button' ng-click='add_product_to_basket()'>В корзину</button></td>" +
                        "</tr>" +
                    "</table>"+
                "</div>",
			scope:{
				name: '@',
				imgPath: '@',
				processor: '@',
				ram: '@',
				memory: '@',
				battery: '@',
				camera: '@',
				display: '@',
				other: '@',
				price: '@',
				type: '@',
				description: '@'
			},
			controller: function($scope, $attrs){
				$scope.add_product_to_basket = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + "../" + $scope.imgPath + "#" + $scope.description + "#" + $scope.price);
					basketFactory.upBasketCount();					
				};		
				
				basketFactory.initData();

				$scope.page_transition = function(){
					sessionStorage.setItem('productName', $scope.name);
					sessionStorage.setItem('imgPath', "../" + $scope.imgPath);
					sessionStorage.setItem('processor', $scope.processor);
					sessionStorage.setItem('ram', $scope.ram);
					sessionStorage.setItem('memory', $scope.memory);
					sessionStorage.setItem('battery', $scope.battery);
					sessionStorage.setItem('camera', $scope.camera);
					sessionStorage.setItem('display', $scope.display);
					sessionStorage.setItem('other', $scope.other);
					sessionStorage.setItem('price', $scope.price);
					sessionStorage.setItem('productType', $scope.type);
					document.location.href = "views/product.html";
					sessionStorage.setItem('productDescription', $scope.processor  + ", " + $scope.ram + ", " + $scope.memory + ", " + $scope.battery + ", " + $scope.camera + ", " + $scope.display + ", " + $scope.other + ", ");
				};

				$scope.go_pay = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + "../" + $scope.imgPath + "#" + $scope.description + "#" + $scope.price);
					basketFactory.upBasketCount();
					document.location.href = "views/basket.html";
				};
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
