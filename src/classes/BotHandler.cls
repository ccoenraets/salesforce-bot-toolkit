public interface BotHandler {
    
    BotResponse handle(String utterance, String[] params, Map<String, String> session);
    
}