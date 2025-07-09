// src/components/Chatbot.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I'm JihadGPT. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { sender: "bot", text: data?.response || "Sorry, try again." },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error talking to AI 🤖" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="w-80 max-h-[70vh] bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-3 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <img
                src="/person_13374988.png"
                alt="User Icon"
                className="w-5 h-5 rounded-full"
              />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                JihadGPT
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-600">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl max-w-[85%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 dark:text-gray-500">
                JihadGPT is thinking...
              </div>
            )}
          </div>

          <div className="flex border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm">
            <input
              className="flex-1 p-2 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-none"
            >
              <Send />
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          {showHint && (
          <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: -10 }}
  transition={{ duration: 0.6 }}
  className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs px-3 py-1 rounded-lg shadow-md border dark:border-gray-700 whitespace-nowrap max-w-[260px]"
>
  👋 Hi Ask me anything about my portfolio!
</motion.div>

          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            animate={{
              y: [0, -6, 0],
              boxShadow: [
                "0px 0px 10px rgba(0,0,255,0.4)",
                "0px 0px 20px rgba(0,0,255,0.6)",
                "0px 0px 10px rgba(0,0,255,0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg relative"
          >
            <img
              src="/person_13374988.png"
              alt="User Icon"
              className="w-5 h-5"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-75" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
