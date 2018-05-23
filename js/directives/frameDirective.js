'use strict';
define(function(){
	var directiveModule = angular.module('frameDirective', []);	

	directiveModule.directive('frameDirective', function(frameFac){		
		return {
			restrict: 'EACM',			
			template:
				"<div class='chat-button' id='chatButton'>" +
					"<img src='https://chat-consultant.azurewebsites.net/images/clck_block.png' class='clck-block' ng-click='hideChatWindow()'></img>" +
				"</div>" +
				"<div class='chat-frame' id='chatFrame'>" +
					"<iframe name='chatWindow' id='chatWindow' src='https://chat-consultant.azurewebsites.net/views/chat.html' frameBorder='0'></iframe>" +
				"</div>",
			scope:{},
			controller: function($scope, $attrs, $http){											
				var show = true;
				$scope.hideChatWindow = function(){
					if(show){
						document.getElementById('chatFrame').style.display = 'none';
						show = false;
					}
					else{
						document.getElementById('chatFrame').style.display = 'block';
						show = true;								
					};												
				};	

				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				var btn = document.getElementById("chatButton");
				var frame = document.getElementById("chatFrame");
				
				$http.get('https://chatconsultantadminsclient.azurewebsites.net/Admins/GetAdmin', { params: { site: document.domain } }, config)
					.then(function (response) { 
							if(response.data != null) {								
								btn.style.opacity = 1;
								frame.style.opacity = 1;								
								var adminName = response.data.name.split(' ')[0];
								sessionStorage.setItem("consultName", adminName)
								sessionStorage.setItem("consultLogin", response.data.login)
							}
							else {
								btn.remove(); 
								frame.remove(); 
							}
						}, function (error) {
							btn.remove(); 
							frame.remove(); 
							console.log("Ошибка: " + error);
						}); 

				window.onbeforeunload = function(e){
					$http.post('/Clients/ChangeStatus', { name: sessionStorage.getItem("consultName"), status: false }, config)
						.then(function (response) {
							
						}, function (error) {
							console.log("Ошибка: " + error);
						}); 
				
					$rootScope.$digest();                    
				}
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
