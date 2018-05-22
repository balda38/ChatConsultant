'use strict';
define(function(){
	var directiveModule = angular.module('frameDirective', []);	

	directiveModule.directive('frameDirective', function(frameFac){		
		return {
			restrict: 'EACM',			
			template:
				"<div class='chat-button' id='chatButton'>" +
					"<img src='images/clck_block.png' class='clck-block' ng-click='hideChatWindow()'></img>" +
				"</div>" +
				"<div class='chat-frame' id='chatFrame'>" +
					"<iframe name='chatWindow' id='chatWindow' src='views/chat.html' frameBorder='0'></iframe>" +
				"</div>",
			scope:{},
			controller: function($scope, $attrs, $http){											
				var show = true;
				$scope.hideChatWindow = function(){
					if(show){
						document.getElementById('chatFrame').style.display = 'none';
						show = false;
						//document.getElementById('chatButton').style.transform = "scale(-1, 1)";	
					}
					else{
						document.getElementById('chatFrame').style.display = 'block';
						show = true;		
						//document.getElementById('chatButton').style.transform = "scale(1, 1)";							
					};												
				};	

				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				var btn = document.getElementById("chatButton");
				var frame = document.getElementById("chatFrame");
				
				$http.get('https://chatconsultantadminsclient.azurewebsites.net/Admins/GetAdmin', { params: { site: "localhost" } }, config)
					.then(function (response) { 
							if(response.data != null) {								
								btn.style.opacity = 1;
								frame.style.opacity = 1;
								frameFac.changeAdminName(response.data);
								sessionStorage.setItem("consultName", response.data)
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
			},
			link: function (scope, element, attrs) {					
			}	
        }
	});
});
