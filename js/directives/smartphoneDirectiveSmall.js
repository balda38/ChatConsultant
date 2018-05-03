'use strict';
define(function(){
	var directiveModule = angular.module('smartphoneDirectiveSmall', []);	

	directiveModule.directive('smartphoneDirectiveSmall', function(basketFactory){		
		return {
			restrict: 'EACM',			
            template:
                "<div class=smartphone-container>" + 
                    "<table>" +
                        "<tr>" +
                            "<td style='width: 10%'>" +
                                "<p align='left'><img ng-src='{{imgPath}}' width='66' height='130' style='margin-left: 10px; cursor: pointer;' ng-click='page_transition()'></p>" +                                
                            "</td>" +
                            "<td style='vertical-align: top; width: 90%'>" +
                                "<h3 style='color: #8B4513; text-align: center; cursor: pointer' ng-click='page_transition()'>{{name}}</h3>" +
                                "<table>"+                         
                                    "<tr>" +
                                        "<td style='width: 800px'>{{description}}</td>" +
                                        "<td><button class='buy-button' ng-click='go_pay()'>Купить<br>{{price}} <s><b>{{oldPrice}}</b></s></button></td>" +
                                        "<td><button class='basket-add-button' ng-click='add_product_to_basket()'>В корзину</button></td>" +
                                    "</tr>" +
                                "</table>"+
                            "</td>" +	
                        "</tr>" +
                    "</table>" +                    
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
				description: '@',
				discount: '@'
			},
			controller: function($scope, $attrs){  
				if ($scope.discount != "0"){
					$scope.oldPrice = parseInt(Number($scope.price) * 100 / Number($scope.discount)) + 1;
				}

				$scope.add_product_to_basket = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + $scope.imgPath + "#" + $scope.description + "#" + $scope.price);
					basketFactory.upBasketCount();
				};	

				$scope.page_transition = function(){
					sessionStorage.setItem('productName', $scope.name);
					sessionStorage.setItem('imgPath', $scope.imgPath);
					sessionStorage.setItem('processor', $scope.processor);
					sessionStorage.setItem('ram', $scope.ram);
					sessionStorage.setItem('memory', $scope.memory);
					sessionStorage.setItem('battery', $scope.battery);
					sessionStorage.setItem('camera', $scope.camera);
					sessionStorage.setItem('display', $scope.display);
					sessionStorage.setItem('other', $scope.other);
					sessionStorage.setItem('price', $scope.price);
					sessionStorage.setItem('productType', $scope.type);
					sessionStorage.setItem('productDescription', $scope.description);
					document.location.href = "../../views/product.html";
				};

				$scope.go_pay = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + $scope.imgPath + "#" + $scope.description + "#" + $scope.price);
					basketFactory.upBasketCount();
					document.location.href = "../../views/basket.html";
				};
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
