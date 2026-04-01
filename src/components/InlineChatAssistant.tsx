'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface InlineChatAssistantProps {
  step?: string;
  context?: string;
}

const getContextualHelp = (step: string, context: string) => {
  const helpMessages: Record<string, string> = {
    // Booking flow
    'name': "I'll need your full name for the reservation. This helps us personalize your dining experience and ensure everything is prepared for your arrival.",
    'email': "Your email is important for sending you a confirmation and any updates about your reservation. We'll also use it to remember your preferences for future visits!",
    'phone': "A contact number helps us reach you if there are any changes or if we need to confirm details. Don't worry, we won't spam you!",
    'date': "Choose any date that works for you. We're open Tuesday through Saturday for dinner, and Sunday for lunch. I recommend booking at least a few days in advance for the best availability.",
    'time': "Our most popular times are 7:00 PM and 7:30 PM. If you prefer a quieter atmosphere, consider an earlier or later slot. What time suits you best?",
    'party-size': "How many guests will be joining you? We can accommodate parties from 1 to 8 guests at a standard table. For larger groups, we have private dining options available.",
    'special-requests': "This is your chance to let us know about dietary requirements, allergies, special occasions, or seating preferences. We'll do our best to accommodate your needs!",
    
    // Voucher flow
    'voucher-type': "Each voucher offers a unique experience. The Tasting Menu is perfect for food enthusiasts, while the Chef's Table provides an exclusive behind-the-scenes experience. What type of experience would you like to gift?",
    'custom-amount': "Choose any amount between £40 and £400. This gives the recipient flexibility to enjoy anything from a casual lunch to a full tasting menu experience.",
    'recipient-name': "Who's the lucky recipient? Make sure to spell their name correctly as it will appear on the beautifully designed voucher email.",
    'recipient-email': "The voucher will be sent directly to this email address. You can also request a copy for yourself if you'd like to present it personally!",
    'sender-name': "This is how you'll be identified on the gift voucher. It adds a personal touch to show who this thoughtful gift is from.",
    'message': "A personal message makes the gift extra special! Share why you chose this gift, mention a special occasion, or simply express your well wishes.",
    'payment': "Review all the details carefully before proceeding to payment. Everything look good?",
    'card-payment': "This is a secure demo payment form. In production, all card details would be encrypted and processed through a PCI-compliant payment gateway.",
  };

  return helpMessages[step] || "I'm here to help! Feel free to ask me any questions about this step or our restaurant.";
};

export default function InlineChatAssistant({ step = '', context = 'booking' }: InlineChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset messages when step changes and add contextual help
    const contextualHelp = getContextualHelp(step, context);
    setMessages([
      {
        role: 'assistant',
        content: contextualHelp
      }
    ]);
  }, [step, context]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const responses = [
        "That's a great question! At The Hawthorn, we pride ourselves on using locally-sourced, seasonal ingredients. Is there anything specific you'd like to know about our menu?",
        "Absolutely! We can accommodate most dietary requirements. Please let me know your specific needs and I'll make sure our kitchen team is prepared.",
        "Our restaurant has a smart-casual dress code. We want you to feel comfortable while maintaining the elegant atmosphere of our dining room.",
        "We're open Tuesday through Saturday, 5:30 PM to 10:30 PM, and Sunday for lunch from 12:00 PM to 3:00 PM. We're closed on Mondays.",
        "Yes, we have an excellent wine list featuring both local and international selections. Our sommelier would be happy to recommend pairings for your meal.",
        "Of course! We have private dining options available for groups of 8-20 guests. Would you like me to provide more details about our private dining experiences?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-xl">👨‍🍳</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm text-gray-900">Chef Jonny's Help</h3>
          <p className="text-xs text-blue-700">Context-specific assistance</p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-3 max-h-[200px] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index}>
            <div className={`rounded-xl px-3 py-2 ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white ml-4'
                : 'bg-white border border-blue-200 text-gray-800'
            }`}>
              <p className="text-xs leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="bg-white border border-blue-200 rounded-xl px-3 py-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask a question..."
          className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs bg-white"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-2 rounded-lg hover:from-orange-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
