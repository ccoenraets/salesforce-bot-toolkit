({
    init: function(component, event, helper){
        var action = component.get("c.getUserInfo");
        action.setCallback(this, function(actionResult) {
            component.set("v.user", actionResult.getReturnValue());
            var msg = new SpeechSynthesisUtterance('How can I help you?');
            msg.voiceURI = 'Google UK English Female';
            msg.lang = 'en';
            window.speechSynthesis.speak(msg);
            
        });
        $A.enqueueAction(action);  
    },
    utteranceHandler : function(component, event, helper) {
        if (event.keyCode !== 13) {
            return;
        }
        var utterance = event.target.value;
        var messages = component.get("v.messages");
        messages.push({author: "Me", messageText: utterance});
        event.target.value = "";
        component.set("v.messages", messages);
        helper.submit(component, utterance, component.get('v.session'), function(answer) {
            if (answer) {
				helper.speak(answer.messages[0].messageText,'en');
                component.set("v.session", answer.session);
                Array.prototype.push.apply(messages, answer.messages);
                component.set("v.messages", messages);
            }
        });
        
    },
    
    postbackButtonClickHandler : function(component, event, helper) {
        var utterance = event.getSource().get("v.label");
        var messages = component.get("v.messages");
        messages.push({author: "Me", messageText: utterance});
        component.set("v.messages", messages);
        helper.submit(component, utterance, component.get('v.session'), function(answer) {
            if (answer) {
				helper.speak(answer.messages[0].messageText,'en');
                component.set("v.session", answer.session);
                Array.prototype.push.apply(messages, answer.messages);
                component.set("v.messages", messages);
            }
        });
    },
    
    uploadFile: function(component, event, helper) {
        var files = component.get("v.files");
        if (files && files.length > 0) {
            var file = files[0][0];
            if (!file.type.match(/(image.*)/)) {
                return alert('Image file not supported');
            }
            var reader = new FileReader();
            reader.onloadend = function() {
                var dataURL = reader.result;
                var content = dataURL.match(/,(.*)$/)[1];
                var messages = component.get("v.messages");
                messages.push({author: "Me", messageText: "Uploading file " + file.name, imageURL: dataURL});
                component.set("v.messages", messages);
                helper.upload(component, file, content, function(answer) {
                    if (answer) {
						helper.speak(answer.messages[0].messageText,'en');
                        component.set("v.session", answer.session);
                        Array.prototype.push.apply(messages, answer.messages);
                        component.set("v.messages", messages);
                    }
                });
            };
            reader.readAsDataURL(file);
        }
        
    },
    listen: function(component, event, helper) {
        var recordButton = component.find('speak');
        $A.util.addClass(recordButton, 'recording');
        var recognition = new webkitSpeechRecognition();
        recognition.onspeechend = function(event) {
            $A.util.removeClass(recordButton, 'recording');
        }
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            console.log(transcript)
            if(transcript!=null){
                var messages = component.get("v.messages");
                messages.push({author: "Me", messageText: transcript});
                component.set("v.messages", messages);
                helper.submit(component, transcript, component.get('v.session'), function(answer) {
                    if (answer) {
                        helper.speak(answer.messages[0].messageText,'en');
                        component.set("v.session", answer.session);
                        Array.prototype.push.apply(messages, answer.messages);
                        component.set("v.messages", messages);
                    }
                });
            }
        }
        recognition.start();
    }    
})