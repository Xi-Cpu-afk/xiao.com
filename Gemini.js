import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageSquare } from 'lucide-react';

export default function GeminiChatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm Xiao's AI assistant powered by Gemini. Ask me anything about his experience, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const portfolioContext = `You are an AI assistant for Mac Xiaobin Villacrusis's portfolio. Here's information about him:

EXPERIENCE:
- Software AI Engineer at Chartered Tech. (2025)
- Junior Software Engineer at Cusyma Technologies Co. (2025)
- Senior Full-Stack Developer at Comp Tech Co. (2024)
- Junior Full Stack Developer at DevsOps Co. (2023)
- Senior Web Developer at Bluewind Asia Tech. (2022)
- Junior Web Developer at GCM Inc. (2022)

EDUCATION:
- BS Computer Engineering at University of Batangas (2026)

TECH STACK:
Frontend: HTML, JavaScript, TypeScript, React, Next.js, Vue.js, Tailwind CSS
Backend: Node.js, Python, PHP, Laravel, PostgreSQL, MongoDB, .Net Framework
Database: SQL, MySQL, NoSQL, XQuery
DevOps: AWS, Docker, Kubernetes, GitHub Actions

RECENT PROJECTS:
1. CPE Congress Web - 1st CPESS AI & Cybersecurity Congress (cpess-ubat.github.io/Batangas-AI-Cybersecurity-Congress)
2. BASE404 - Online coding bootcamp (base-404.com)
3. DIIN.PH - AI-powered wardrobe assistant (diin.ph)
4. DYNAMIS Workout Tracker - AI-powered workout tracker (dynamis-app.online)

CERTIFICATIONS:
- Huawei Developer Expert (Huawei)
- Generative AI Leader (Google)
- Software Engineering (TestDome)
- Generative AI Professional (Oracle)

LOCATION: Calapan City, Oriental Mindoro, Philippines
CONTACT: macxiaobin0517@gmail.com

Answer questions about Xiao professionally and helpfully. Keep responses concise and relevant.`;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      alert('Please enter your Gemini API key first');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${portfolioContext}\n\nUser question: ${userMessage}`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API request failed');
      }

      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "I'm sorry, I couldn't generate a response.";
      
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `Error: ${err.message}. Please check your API key and try again.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Mac Xiaobin</h3>
              <p className="text-sm opacity-90">Powered by Gemini AI</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-lg p-2 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="p-4 bg-blue-50 border-b">
              <p className="text-sm text-gray-700 mb-2">Enter your Gemini API key:</p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={AIzaSyBGGDecymYr7zbfq2Msh0ZgDEA5zh_KRP0}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={saveApiKey}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Get your free API key at{' '}
                <a href="AIzaSyBGGDecymYr7zbfq2Msh0ZgDEA5zh_KRP0" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Google AI Studio
                </a>
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 h-8 w-8 flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="bg-gray-700 rounded-full p-2 h-8 w-8 flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 h-8 w-8">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                disabled={!apiKey || isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || !apiKey || isLoading}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}