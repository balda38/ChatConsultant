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
							"<td><b>Свяжитесь с нами</b><br>Консультант <i><b>Сергей</b></i> онлайн!</td>" +
							"<td><img src='../images/headphones.png' height='48px' width='48px'></img></td>" +
						"</tr>" +				
					"</table>" +		
				"</div>" +	
				"<div id='chatW' class='chat-window'>" +
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
				localStorage.clear();
				console.log(localStorage.getItem('client'));
				if (localStorage.getItem('client') != null)
				{
					$scope.userName = localStorage.getItem('client');
					switchWindow();					
				}

				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				var nC = false;

				$scope.sendMessage = function(e){
					if(e.keyCode == 13){						
					    e.preventDefault();
					    if (msg.value != "") {
							var data = {
								msgText: msg.value,
								msgFrom: $scope.userName,
								msgTo: "admin1"
							}

							if(!nC){
								$http.post('https://chatconsultantadminsclient.azurewebsites.net/Clients/NewClient', { name: $scope.userName, site: document.domain }, config)
								.then(function (response) {
										console.log(response)
										//localStorage.setItem("client", document.getElementById("userName").value);	
										nC = true;							
									}, function (error) {
										console.log("Ошибка: " + error);
									});	
							}							

							$http.post('https://chatconsultantadminsclient.azurewebsites.net/Messages/AddMessage', { newMsg: data, role: "client" }, config)
								.then(function (response) {
										updateList(msg.value, 'client'); 	
										msg.value = "";										
									}, function (error) {
										console.log("Ошибка: " + error);
									});	
									
							setInterval(function(){
								$http.get('https://chatconsultantadminsclient.azurewebsites.net/Messages/GetLastAdminMessage', { params: { client: $scope.userName } }, config)
								.then(function (response) {
									console.log(response.data)
									if(response.data != lastAdminMessage) updateList(response.data, 'admin');  							
								}, function (error) {
									console.log("Ошибка: " + error);
								});      
							}, 5000);
						};		
					};
					
				};

				$scope.goChat = function () {	
				    if (document.getElementById("userName").value != "") {
						$scope.userName = document.getElementById("userName").value;	
						switchWindow();			        
				    }
				    else{
				        window.alert("Пожалуйста, укажите Ваше имя");
					}		
				}

				var switchWindow = function(){
					var chat1 = document.getElementById("chat1");
					chat1.parentNode.removeChild(chat1);
					document.getElementById("chat2").style.opacity = "1";
					document.getElementById("userMessage").style.opacity = "1";
				}

				var lastAdminMessage = undefined;

				var updateList = function(msg, role){
					var li = document.createElement('li');
					var br = document.createElement('br');
					br.setAttribute('style', 'clear: both');
					if(role == 'client') li.setAttribute('class', 'user-message-cloud');
					else 
					{
						lastAdminMessage = msg;
						li.setAttribute('class', 'admin-message-cloud');
					}
					li.appendChild(document.createTextNode(msg));
					ul.appendChild(li);
					ul.appendChild(br);
					ul.appendChild(br);		
					
					scrollToDown()
				}

				var chatWindow = document.getElementById('chatW');
				function scrollToDown() {
                    if (chatWindow.scrollHeight != 0) {
                        chatWindow.scrollTo(0, chatWindow.scrollHeight);
                    };
                };
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
