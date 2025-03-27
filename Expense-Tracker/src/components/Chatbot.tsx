import { useState } from "react";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "🤖 I'm still learning! How can I assist you?" }
            ]);
        }, 1000);
    };

    return (
        <>
            <button className="chatbot-toggle" onClick={toggleChatbot}>
                💬
            </button>

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h5>AI Chatbot</h5>
                        <button onClick={toggleChatbot}>✖</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
