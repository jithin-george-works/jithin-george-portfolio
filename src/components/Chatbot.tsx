import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  source?: string;
  sectionId?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm Jithin's AI assistant. Ask me anything about his experience, skills, projects, or education!",
    }
  ]);

  const knowledgeBase = {
    skills: {
      content: "Jithin is skilled in Python, LangChain, LlamaIndex, RAG, Vector Databases, Node.js, FastAPI, React, Angular, and various AI/ML technologies.",
      keywords: ["skills", "technologies", "programming", "languages", "python", "javascript", "react", "angular", "langchain"]
    },
    experience: {
      content: "Jithin works as Associate Consultant at Gapblue Software Labs since 2023, where he engineered scalable backend systems, integrated GPT models with vector databases, and led development of Knowledge Explorer.",
      keywords: ["experience", "work", "job", "consultant", "gapblue", "backend", "api", "performance"]
    },
    education: {
      content: "Jithin has an MSc in Computer Science with AI specialization from Cochin University (2021-2023) and BCA from Rajagiri College (2018-2021). His projects include weather prediction systems and e-commerce applications.",
      keywords: ["education", "degree", "university", "college", "msc", "bca", "ai", "computer science"]
    },
    projects: {
      content: "Key projects include Knowledge Explorer (multilingual AI search), RAG Pipeline System, Weather Prediction System using hybrid ML models, and scalable backend systems with 40% performance improvement.",
      keywords: ["projects", "knowledge explorer", "rag", "weather", "prediction", "backend", "multilingual"]
    }
  };

  const findRelevantSection = (query: string) => {
    const lowerQuery = query.toLowerCase();
    for (const [section, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerQuery.includes(keyword))) {
        return { section, content: data.content };
      }
    }
    return { section: "general", content: "I'd be happy to help you learn more about Jithin's background and expertise!" };
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message
    };

    const { section, content } = findRelevantSection(message);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content,
      source: section !== "general" ? section : undefined,
      sectionId: section !== "general" ? section : undefined
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setMessage("");
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add flair effect
      const cursor = document.createElement('div');
      cursor.className = 'fixed w-8 h-8 bg-primary rounded-full pointer-events-none z-[9999] animate-ping';
      cursor.style.left = '50%';
      cursor.style.top = '50%';
      cursor.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(cursor);

      // Smooth scroll with delay for effect
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          document.body.removeChild(cursor);
        }, 1000);
      }, 300);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[32rem]"
          >
            <Card className="h-full flex flex-col border-border/50 bg-background/95 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">Chat with Jithin's AI</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary"
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        {msg.source && (
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Source: {msg.source}
                            </Badge>
                            {msg.sectionId && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => navigateToSection(msg.sectionId!)}
                                className="h-6 px-2 text-xs hover:bg-primary hover:text-primary-foreground"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Navigate
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about Jithin's experience..."
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;