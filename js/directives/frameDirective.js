'use strict';
define(function(){
	var directiveModule = angular.module('frameDirective', []);	

	directiveModule.directive('frameDirective', function(){		
		return {
			restrict: 'EACM',			
			template:
				"<div class='chat-button' id='chatButton'>" +
					"<img src='images/arrow.png' ng-click='hideChatWindow()'></img>" +
				"</div>" +
				"<div class='chat-frame' id='chatFrame'>" +
					"<iframe id='chatWindow' src='' frameBorder='0'></iframe>" +
				"</div>",
			scope:{},
			controller: function($scope, $attrs){											
				var show = true;
				$scope.hideChatWindow = function(){
					if(show){
						document.getElementById('chatFrame').style.display = 'none';
						show = false;
						document.getElementById('chatButton').style.transform = "scale(-1, 1)";	
					}
					else{
						document.getElementById('chatFrame').style.display = 'block';
						show = true;		
						document.getElementById('chatButton').style.transform = "scale(1, 1)";							
					};												
				};								
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
