import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

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
      content:
        "Hi! I'm Jithin's AI assistant. Ask me anything about his experience, skills, projects, or education!",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const sectionBuffer = useRef(""); // holds fragmented section marker
  const capturingSection = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // WebSocket Initialization
  useEffect(() => {
    // const backendUrl = process.env.VUE_APP_BACKEND_URL;
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // if using Vite

    const ws = new WebSocket(backendUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onclose = () => console.log("❌ WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = async () => {
    if (isStreaming) return; // ⛔ prevent new messages during streaming

    if (
      !message.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    const botMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, type: "bot", content: "" },
    ]);

    setIsStreaming(true);
    setLoading(true);

    // Include message history
    // const history = messages.map((m) => ({
    //   role: m.type === "user" ? "user" : "assistant",
    //   content: m.content,
    // }));

    // Group messages into pairs of user + assistant
    const pairs: ChatMessage[][] = [];
    for (let i = messages.length - 2; i >= 0; i -= 2) {
      if (messages[i].type === "user" && messages[i + 1]?.type === "bot") {
        pairs.unshift([messages[i], messages[i + 1]]);
      }
      if (pairs.length === 5) break; // only last 5 pairs
    }

    // Flatten into history for backend
    const history = pairs.flat().map((m) => ({
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
    }));

    wsRef.current.send(JSON.stringify({ query: message, history }));

    // Handle streaming messages

    wsRef.current.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      const data = jsonData.data;
      // const status= event.data.status;

      if (data === "[END]") {
        setIsStreaming(false);
        setLoading(false);
        return;
      }

      let appendToContent = data;

      // Simple dollar-based section detection
      for (let i = 0; i < data.length; i++) {
        if (
          !capturingSection.current &&
          data[i] === "$" &&
          data[i + 1] === "$"
        ) {
          // Start of section marker
          capturingSection.current = true;
          sectionBuffer.current = "";
          i++; // skip next $
          appendToContent = appendToContent.replace("$$", ""); // remove marker from visible content
          continue;
        }

        if (capturingSection.current) {
          if (data[i] === "$" && data[i + 1] === "$") {
            // End of section marker
            capturingSection.current = false;
            const sectionName = sectionBuffer.current.trim().toLowerCase();

            // Update message with section info
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === botMessageId
                  ? { ...msg, sectionId: sectionName, source: sectionName }
                  : msg
              )
            );
            setTimeout(() => navigateToSection(sectionName), 800);

            sectionBuffer.current = "";
            i++; // skip next $
            appendToContent = appendToContent.replace("$$", ""); // remove marker from visible content
            continue;
          }

          // Still inside section marker
          sectionBuffer.current += data[i];
          appendToContent = appendToContent.replace(data[i], ""); // remove from visible content
        }
      }

      // Append remaining text (outside section markers) to message
      if (appendToContent) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, content: (msg.content || "") + appendToContent }
              : msg
          )
        );
        scrollToBottom();
      }

      if (loading && appendToContent.trim() !== "") setLoading(false);
    };
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const cursor = document.createElement("div");
      cursor.className =
        "fixed w-8 h-8 bg-primary rounded-full pointer-events-none z-[9999] animate-ping";
      cursor.style.left = "50%";
      cursor.style.top = "50%";
      cursor.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(cursor);

      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          document.body.removeChild(cursor);
        }, 1000);
      }, 300);
    }
  };

  const Loader = () => (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
    </div>
  );

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
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
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
                <CardTitle className="text-lg text-primary">
                  Chat with Jithin's AI
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        <div className="text-sm">
                          {msg.type === "bot" &&
                          loading &&
                          msg.content === "" ? (
                            <Loader />
                          ) : (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          )}
                        </div>

                        {(() => {
                          const validSections = [
                            "contact",
                            "education",
                            "skills",
                            "experience",
                            "projects",
                          ];
                          const isValidSource =
                            msg.source &&
                            validSections.includes(msg.source.toLowerCase());

                          if (!isValidSource) return null;

                          return (
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Source: {msg.source}
                              </Badge>
                              {msg.sectionId && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    navigateToSection(msg.sectionId!)
                                  }
                                  className="h-6 px-2 text-xs hover:bg-primary hover:text-primary-foreground"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Navigate
                                </Button>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />{" "}
                  {/* This dummy div ensures scrolling */}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 shrink-0">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Ask about Jithin's experience..."
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isStreaming}
                    >
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
