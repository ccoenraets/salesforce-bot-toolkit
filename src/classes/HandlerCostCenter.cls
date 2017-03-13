public with sharing class HandlerCostCenter implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session) {
        return new BotResponse(new BotMessage('Lightning Bot', 'Your cost center is 21852'));
    }
    
}