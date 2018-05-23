'use strict';
define(function(){
	var serviceModule = angular.module('messagesService', []);	

	serviceModule.service('messagesService', function(){    
        var messages = [];
        
        return{
            addMessage: function(message, msgFrom){
                if(JSON.parse(sessionStorage.getItem("clientMessages")) != null){
                    messages = JSON.parse(sessionStorage.getItem("clientMessages"));
                }
                messages.push({ "msgFrom":msgFrom, "message":message });   
                sessionStorage.setItem("clientMessages", JSON.stringify(messages));             
            },
            getMessages: function(){
                return JSON.parse(sessionStorage.getItem("clientMessages"));
            }
        }     
	});
});
