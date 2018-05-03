'use strict';
define(function(){
	var directiveModule = angular.module('totalBasketDirective', []);	

	directiveModule.directive('totalBasketDirective', function(basketFactory){		
		return {
			restrict: 'EACM',			
			template:                
                "<div class='basket-item' ng-repeat='item in basketItems'>"+
                    "<h3 style='color: #8B4513; text-align: center;'>{{item.name}}</h3>"+
                    "<img ng-src='{{item.imgPath}}' width='auto' height='200px' style='margin: 10px; float: left;'>"+                    
                    "<p>Описание: {{item.description}}</p>"+
                    "<p>{{item.price}} x <input id='counter-{{$index}}' value={{item.count}} class='price-range' style='width: 4%;' ng-blur='updateBasketCount(item, $index)'> = {{item.totalPrice}}</p>"+
                    "<button class='delete-basket-item' ng-click='deleteBasketItem(item)'>X</button>"+
                "</div>",
			scope:{
				path: '@'
			},
			controller: function($scope, $attrs){
                var basketItem = sessionStorage.getItem('totalBasket').split('*');
                basketItem.pop();

                $scope.basketItems = [];                

                var itemCount = 0;
                basketItem.forEach(item => {
                    var itemCharacteristic = item.split('#');
                    $scope.basketItems.push(
                        {
                            name: itemCharacteristic[0],                            
                            imgPath: itemCharacteristic[1],
                            description: itemCharacteristic[2],
                            price: itemCharacteristic[3],
                            count: 1,
                            totalPrice: 0,
                            id: itemCount                            
                        }                        
                    );  
                    itemCount++;                  
                });	

                
                $scope.basketItems.forEach(item => {
                    var lastImgPath = item.imgPath;
                    var directPath = lastImgPath.substr(lastImgPath.indexOf('i'));
                    item.imgPath = "../" + directPath;
                    if(item.name[0] == ','){
                        item.name = item.name.substr(1);
                    } 
                }); 

                $scope.basketItems.forEach(item1 => {
                    var count = 0;
                    $scope.basketItems.forEach(item2 => {
                        if(item1.name == item2.name){
                            count++;
                        }
                    })
                    item1.count = count;
                    item1.totalPrice = item1.price * item1.count;      
                }); 

                $scope.basketItems.forEach(item1 => {
                    var indexes = [];
                    var index = 0;
                    $scope.basketItems.forEach(item2 => {
                        if(item1.name == item2.name){
                            indexes.push(index);
                        }
                        index++;
                    })
                    console.log(indexes)
                    if(indexes.length != 1){
                        for (var i = 0; i < indexes.length; i++){
                            if (indexes[i] != 0){
                                $scope.basketItems.splice(indexes[i], 1);
                            }                            
                        }  
                    } 
                }); 

                basketFactory.setUpdateCountFunction(function(oldItem, newVal){
                    oldItem.count = newVal;
                    oldItem.totalPrice = newVal * Number(oldItem.price);                    
                });                

                $scope.updateBasketCount = function(item, index){
                    var id = "counter-" + index;
                    var countInput = document.getElementById(id);   
                    var newCount = Number(countInput.value);
                    if (newCount <= 0){
                        newCount = 1;
                        countInput.value = newCount;
                    }
                    basketFactory.updateBasketCount(item, newCount);
                    basketFactory.initData();
                }

                basketFactory.setDeleteFunction(function(item){
                    var index = $scope.basketItems.indexOf(item);
                    $scope.basketItems.splice(index, 1);
                });

                $scope.deleteBasketItem = function(item){
                    basketFactory.deleteBasketItem(item);
                    if(sessionStorage.getItem('basketCount') == 0){
                        basketFactory.resetData();
                        basketFactory.initData();
                    }
                };
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
