'use strict';
define(function(){
	var directiveModule = angular.module('basketController', []);	

	directiveModule.controller('basketController', function($scope, basketFactory){            
        var eBasket = document.getElementById('emptyBasket');
        var tBasket = document.getElementById('totalBasket');  
        
        basketFactory.updatePage(function(num){   
            switch(num){
                case 1:
                    eBasket.style.display = "none";
                    tBasket.style.display = "block";		
                    break;
                case 2:
                    eBasket.style.display = "block";
                    tBasket.style.display = "none";		
                    break;
            }         
        }); 
	});
});
