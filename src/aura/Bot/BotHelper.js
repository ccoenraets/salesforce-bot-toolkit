({
	submit : function(component, utterance, session, callback) {
        var action = component.get("c.submit");
		action.setParams({
      		"utterance": utterance,
            "session": session
    	});

        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                callback(a.getReturnValue());
            } else if (state === "INCOMPLETE") {

            } else if (state === "ERROR") {
                var errors = a.getError();
                console.log(errors);
            }
    	});
    	$A.enqueueAction(action);
	},
    
	upload: function(component, file, base64Data, callback) {
        var action = component.get("c.upload"); 
        action.setParams({
            fileName: file.name,
            content: base64Data
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
	            callback(a.getReturnValue());
            } else if (state === 'ERROR') {
	            var errors = a.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            } else if (state === "INCOMPLETE") {
				console.log("Incomplete");
            }

        });
        $A.enqueueAction(action); 
    }

})