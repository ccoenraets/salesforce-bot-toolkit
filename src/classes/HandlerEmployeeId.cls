public with sharing class HandlerEmployeeId implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session) {
        return new BotResponse(new BotMessage('Lightning Bot', 'Your employee id is 9854'));
    }
    
}