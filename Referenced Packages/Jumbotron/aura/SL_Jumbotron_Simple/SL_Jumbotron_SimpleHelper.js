({
    updateRender : function(cmp) {
        if (cmp.get("v.ImageAlignment") === null) {
            cmp.set("v.ImageAlignment","TOP");
        }
        if(cmp.get("v.ImageLink") === null){
            cmp.set("v.ImageLink","/resource/SL_LIGHT_JUMBOT__Slds/assets/images/avatar2.jpg");
        }
        var alignment = cmp.get("v.ImageAlignment").toUpperCase();
        
        var topImage = cmp.find("top-image");
        var topImageElement = topImage.getElement();        

        $A.util.addClass(topImageElement, 'Hidden');
       
        var title = cmp.find("title");
        var titleElement = title.getElement();
        
        var header = cmp.find("header"); 
        var headerElement = header.getElement();
        
        var content = cmp.find("content");
        var contentElement = content.getElement();
        
        var learnMoreBtn = cmp.find("learn-more-btn");
        var learnMoreBtnElement = learnMoreBtn.getElement();

        $A.util.removeClass(contentElement, "leftAlign");
        $A.util.removeClass(learnMoreBtnElement, "leftAlign");
        $A.util.removeClass(headerElement, "leftAlign");
        $A.util.removeClass(titleElement, "leftAlign");
        
        $A.util.removeClass(contentElement, "rightAlign");
        $A.util.removeClass(learnMoreBtnElement, "rightAlign");
        $A.util.removeClass(headerElement, "rightAlign");
        $A.util.removeClass(titleElement, "rightAlign");
        
        switch(alignment){
            case "TOP":
                $A.util.removeClass(topImageElement, "Hidden");
                break;
            case "RIGHT":
                $A.util.addClass(contentElement, "leftAlign");
                $A.util.addClass(learnMoreBtnElement, "leftAlign");
                $A.util.addClass(headerElement, "leftAlign");
                $A.util.addClass(titleElement, "leftAlign");
                $A.util.removeClass(topImageElement, "Hidden");
                break;
            case "LEFT":
                $A.util.addClass(contentElement, "rightAlign");
                $A.util.addClass(learnMoreBtnElement, "rightAlign");
                $A.util.addClass(headerElement, "rightAlign");
                $A.util.addClass(titleElement, "rightAlign");
                $A.util.removeClass(topImageElement, "Hidden");
                break;
            case "NONE":
                break;
            default:
                $A.util.removeClass(topImageElement, "Hidden");
                break;
        }
    }
})