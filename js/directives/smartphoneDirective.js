'use strict';
define(function(){
	var directiveModule = angular.module('smartphoneDirective', []);	

	directiveModule.directive('smartphoneDirective', function(){		
		return {
			restrict: 'EACM',			
			template:
                "<div class=top-offers>" + 
				    "<h3 style='text-align: center'>{{name}}</h3>" +
					    "<p align='center'><img ng-src='{{imgPath}}' width='130' height='250'></p>" +
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
                            "<td><button class='buy-button'>Купить<br>{{price}}</button></td>" +
                            "<td><button class='basket-add-button'>В корзину</button></td>" +
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
				price: '@'
			},
			controller: function($scope, $attrs){		
				
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
