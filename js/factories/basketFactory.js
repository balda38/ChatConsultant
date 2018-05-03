'use strict';
define(function(){
	var factoryModule = angular.module('basketFactory', []);	

	factoryModule.factory('basketFactory', function(){		
		var count = 0;
		var totalPrice = 0;
		var onUpdate = function(){};
		var pageUpdate = function(){};
		var buttonUpdate = function(){};
		var countUpdate = function(){};
		var deleteItem = function(){};
		var sS = 0;
		var productsInBasket = [];

		return {
			upBasketCount: function(){
				if (sessionStorage.getItem('totalBasket') != null){
					productsInBasket = sessionStorage.getItem('totalBasket');
				}
				productsInBasket += sessionStorage.getItem('productDesc') + "*";
				sessionStorage.setItem('totalBasket', productsInBasket);
				var newPrice = sessionStorage.getItem('newPrice');
				if (sessionStorage.getItem('totalPrice') != null){
					totalPrice = Number(sessionStorage.getItem('totalPrice'));
				};
				totalPrice += Number(newPrice);
				sessionStorage.setItem('totalPrice', totalPrice);
				count = sessionStorage.getItem('basketCount');
				count++;		
				sessionStorage.setItem('basketCount', count);		
				setCount();
				pageUpdate(1);
			},
			getBasketCount: function(cb){
				onUpdate = cb;				
			},
			initData: function(){
				setCount();				
			},
			resetData: function(){
				count = 0;
				totalPrice = 0;
				productsInBasket = [];
				sessionStorage.setItem('totalBasket', productsInBasket);
				pageUpdate(2);
			},
			updatePage: function(cb){
				pageUpdate = cb;
			},
			setDeleteFunction: function(cb){
				deleteItem = cb;
			},
			deleteBasketItem: function(item){
				deleteItem(item);				
				if((Number(sessionStorage.getItem('basketCount')) - item.count) == 0){
					sessionStorage.setItem('basketCount', 0);
					sessionStorage.setItem('totalPrice', 0);
					setCount();
					buttonUpdate();
				}
				else{
					sessionStorage.setItem('basketCount', Number(sessionStorage.getItem('basketCount')) - item.count);
					sessionStorage.setItem('totalPrice', Number(sessionStorage.getItem('totalPrice')) - item.count * item.price);
					setCount();
					buttonUpdate();
				}			
			},
			acceptButtonDisplay: function(cb){
				buttonUpdate = cb;
			},
			setUpdateCountFunction: function(cb){
				countUpdate = cb;
			},
			updateBasketCount: function(item, newCount){
				sessionStorage.setItem('basketCount', Number(sessionStorage.getItem('basketCount')) - item.count + newCount);
				if(newCount >= Number(item.count)){
					console.log(item)
					sessionStorage.setItem('totalPrice', Number(sessionStorage.getItem('totalPrice')) + (newCount - item.count) * item.price);
					setCount();
					buttonUpdate();
				}
				else{
					sessionStorage.setItem('totalPrice', Number(sessionStorage.getItem('totalPrice')) - (item.count - newCount) * item.price);
					setCount();
					buttonUpdate();
				}				
				countUpdate(item, newCount);
			}
		}

		function setCount(){
			sS = sessionStorage.getItem('basketCount');		
			if(sS == null){
				sS = 0;
			}
			else{
				sS = sessionStorage.getItem('basketCount');
			}		
			var count1 = " (" + sS + ")";
			onUpdate(count1);
		};
	});
});