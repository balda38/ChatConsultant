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
					"<ul id='messages' class='clear'>" +
						"<li class='admin-message-cloud'>Здравствуйте!</li>" +
						"<br><br>" +
					"</ul>" +					
				"</div>" +
				"<form>" +
					"<textarea ng-keydown='sendMessage($event)' id='userMessage' type='text' class='chat-input' placeholder='Введите ваше сообщение здесь и нажмите Enter...' ></textarea>" +
				"</form>",
			scope:{},
			controller: function($scope, $attrs){		
				var msg = document.getElementById('userMessage');
				var ul = document.getElementById('messages');				
				$scope.sendMessage = function(e){
					if(e.keyCode == 13){						
					    e.preventDefault();
					    if (msg.value != "") {
					        var li = document.createElement('li');
					        var br = document.createElement('br');
					        br.setAttribute('style', 'clear: both');
					        li.setAttribute('class', 'user-message-cloud');
					        li.appendChild(document.createTextNode(msg.value));
					        ul.appendChild(li);
					        ul.appendChild(br);
					        ul.appendChild(br);
					        msg.value = "";
					    };
					};
				};
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
