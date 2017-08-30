'use strict';
define(function(){
	var directiveModule = angular.module('chatDirective', []);	

	directiveModule.directive('chatDirective', function(){		
		return {
			restrict: 'EACM',			
			template:
				"<div class='chat-header'>" +
					"<table class='table'>" +
						"<tr>" +
							"<td><b>Свяжитесь с нами</b><br>Мы всегда онлайн</td>" +
							"<td><img src='../images/consultant.png' height='48px' width='48px'></img></td>" +
						"</tr>" +				
					"</table>" +		
				"</div>" +	
				"<div class='chat-window'>" +	
					"<ul class='clear'>" +
						"<li style='display: block; float: right; text-align: right; background: #7397D4'>Здравствуйте!</li>" +
						"<br><br>" +
						"<li id='messageCloud'>{{message}}</li>" +	
					"</ul>" +					
				"</div>" +
				"<form>" +
					"<textarea ng-keydown = 'sendMessage($event)' id='userMessage' type='text' class='chat-input' placeholder='Введите ваше сообщение здесь и нажмите Enter...' ></textarea>" +
				"</form>",
			scope:{},
			controller: function($scope, $attrs){		
				var msg = document.getElementById('userMessage');
				var ul = document.getElementById('messages');
				$scope.sendMessage = function(e){
					if(e.keyCode == 13){						
						e.preventDefault();
						$scope.message = msg.value;
						msg.value = "";
						document.getElementById('messageCloud').style.display = 'block';
					};
				};
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
