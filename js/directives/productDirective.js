'use strict';
define(function(){
	var directiveModule = angular.module('productDirective', []);	

	directiveModule.directive('productDirective', function(basketFactory){		
		return {
			restrict: 'EACM',			
			template:
			"<div class='product-galelry'>"+                         
				"<h3 style='color: #8B4513; text-align: center' id='product-name'>{{name}}</h2>"+
				"<table style='width: 100%;'>"+
					"<tr>"+
						"<td style='width: 60%;'>"+
							"<p style='padding-left: 35%'><img ng-src={{imgPath}} width='130' height='250'></p>"+
							"<div id='gallery' style='margin: auto; width: 300px'>"+
								"<a id='img1' class='img_link'><img ng-src={{imgPath}} width='auto' height='98'/></a>"+
								"<a id='img2' class='img_link' style='margin-left: 10px'><img ng-src={{imgPath1}} width='auto' height='98'/></a>"+
								"<a id='img3' class='img_link' style='margin-left: 10px'><img ng-src={{imgPath2}} width='auto' height='98'/></a>"+
							"</div>"+                 
						"</td>"+
						"<td style='width: 20%; padding-bottom: 10%;'>"+
							"<b>Гарантия</b>: 2 года<br>"+
							"<b>Произволдитель</b>: Китай"+
							"<br><br><br><br>"+
							"<b>В кредит</b>: {{creditAmount}} руб./месяц"+
						"</td>"+
						"<td style='width: 20%; padding-bottom: 10%;'>"+
							"<button class='buy-button' ng-click='go_pay()'>Купить<br>{{price}}</button><br><br>"+
							"<button class='basket-add-button' ng-click='add_product_to_basket()'>В корзину</button>"+
						"</td>"+                           
					"</tr>"+
				"</table>"+
				"<div class='availability'>"+
					"В наличии: 10 шт."+
				"</div>"+
			"</div>"+
			"<div class='product-characteristics'>"+
				"<h2>Описание:</h2>"+
				"{{description}}"+
			"</div>",
			scope:{
				
			},
			controller: function($scope, $attrs){	
				$scope.name = sessionStorage.getItem('productName');
				$scope.imgPath = sessionStorage.getItem('imgPath');
				$scope.processor = sessionStorage.getItem('processor');
				$scope.ram = sessionStorage.getItem('ram');
				$scope.memory = sessionStorage.getItem('memory');
				$scope.battery = sessionStorage.getItem('battery');
				$scope.camera = sessionStorage.getItem('camera');
				$scope.display = sessionStorage.getItem('display');
				$scope.other = sessionStorage.getItem('other');
				$scope.price = sessionStorage.getItem('price');
				$scope.creditAmount = parseInt($scope.price / 12);
				$scope.description = sessionStorage.getItem('productDescription');

				var last_dot = $scope.imgPath.lastIndexOf(".");
				$scope.imgPath1 = $scope.imgPath.substring(0, last_dot) + "_1" + $scope.imgPath.substring(last_dot);
				$scope.imgPath2 = $scope.imgPath.substring(0, last_dot) + "_2" + $scope.imgPath.substring(last_dot);

				document.getElementById('img1').href = $scope.imgPath;
				document.getElementById('img2').href = $scope.imgPath1;
				document.getElementById('img3').href = $scope.imgPath2;

				$scope.add_product_to_basket = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + $scope.imgPath + "#" + $scope.processor + "#" + $scope.ram + "#" + $scope.memory + "#" + $scope.battery + "#" + $scope.camera + "#" + $scope.display + "#" + $scope.other + "#" + $scope.price);
					basketFactory.upBasketCount();					
				};		
				
				basketFactory.initData();	
				
				$scope.go_pay = function(){
					sessionStorage.setItem('newPrice', $scope.price);
					sessionStorage.setItem('productDesc', $scope.name + "#" + $scope.imgPath + "#" + $scope.processor + "#" + $scope.ram + "#" + $scope.memory + "#" + $scope.battery + "#" + $scope.camera + "#" + $scope.display + "#" + $scope.other + "#" + $scope.price);
					basketFactory.upBasketCount();
					document.location.href = "basket.html";
				};
			},
			link: function (scope, element, attrs) {
				$(document).ready(function(){
					$('#gallery').gallerie({
						elem: 'a.img_link',
					});
				});					
			},
        }
	});
});
