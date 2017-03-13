({
	getSimpleJumbotronBodyJS : function(cmp) {
        var action = cmp.get("c.getSimpleJumbotronBody");
		action.setParams({ headingName : cmp.get("v.Heading") });
        action.setCallback(this, function(response) {
            var state = response.getState();
           	if (state === "SUCCESS") {
                var responseItem = response.getReturnValue();
                cmp.set("v.simpleJumbotronBody", responseItem);
                if(responseItem.SL_LIGHT_JUMBOT__Content__c.length >1000) {
                    responseItem.SL_LIGHT_JUMBOT__Content__c = responseItem.SL_LIGHT_JUMBOT__Content__c.substring(0, 1000);
                }
        	}
        });
        $A.enqueueAction(action);
	}
})