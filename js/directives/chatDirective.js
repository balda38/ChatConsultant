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
                    "<div id='chat1'>" +
                        "Напишите, пожалуйста, как мы к Вам можем обращаться" +
                        "<input id='userName' type='text'>" +
                        "<button ng-click='goChat()'>Ок</button>" +
                    "</div>" +
                    "<div id='chat2' class='chat-with-user'>" +
					    "<ul id='messages' class='clear'>" +
						    "<li class='admin-message-cloud'>Здравствуйте, {{userName}}!</li>" +
						    "<br><br>" +
					    "</ul>" +					    
                    "</div>" +
			    "</div>"+
                "<textarea ng-keydown='sendMessage($event)' id='userMessage' type='text' class='chat-input' placeholder='Введите ваше сообщение здесь и нажмите Enter...' ></textarea>",
			scope:{},
			controller: function ($scope, $attrs, $http) {
			    var msg = document.getElementById('userMessage');
			    var ul = document.getElementById('messages');
				$scope.userName = undefined;

				console.log(localStorage.getItem('client'));
				if (localStorage.getItem('client') != null)
				{
					$scope.userName = localStorage.getItem('client');
					switchWindow();					
				}

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

				$scope.goChat = function () {	
				    if (document.getElementById("userName").value != "") {
				        $scope.userName = document.getElementById("userName").value;				        
				    }
				    else{
				        window.alert("Пожалуйста, укажите Ваше имя");
					}
					
					var config = {
						headers: {
							'Content-Type': 'application/json'
						}
					}
					
					$http.post('https://chatconsultantadminsclient.azurewebsites.net/Clients/NewClient', { name: document.getElementById("userName").value, site: document.domain }, config)
                       .then(function (response) {
							console.log(response)
							//localStorage.setItem("client", document.getElementById("userName").value);
							switchWindow();
						}, function (error) {
                            console.log("Ошибка: " + error);
						});			
				}

				var switchWindow = function(){
					var chat1 = document.getElementById("chat1");
					chat1.parentNode.removeChild(chat1);
					document.getElementById("chat2").style.opacity = "1";
					document.getElementById("userMessage").style.opacity = "1";
				}
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
