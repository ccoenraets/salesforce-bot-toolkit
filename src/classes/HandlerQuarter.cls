public with sharing class HandlerQuarter implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session) {

        return new BotResponse(new BotMessage('Lightning Bot', 'Your quarter so far:', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/charts/quarter2.png'));
        
    }
    
}