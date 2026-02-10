import { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { searchResearch } from '../services/api';
import { Sparkles } from 'lucide-react';

export default function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSearch = async (query) => {
        setLoading(true);

        // 1. Add User Message
        const userMsg = { role: 'user', content: query };

        // 2. Add Placeholder AI Message
        const placeholderAiMsg = { role: 'assistant', content: '', isStreaming: true };

        setMessages(prev => [...prev, userMsg, placeholderAiMsg]);

        try {
            const data = await searchResearch(query);

            // 3. Update AI Message with real data
            setMessages(prev => {
                const newMsgs = [...prev];
                const lastMsg = newMsgs[newMsgs.length - 1];
                lastMsg.results = data;
                lastMsg.isStreaming = false;
                return newMsgs;
            });

        } catch (err) {
            console.error(err);
            // Update with error
            setMessages(prev => {
                const newMsgs = [...prev];
                const lastMsg = newMsgs[newMsgs.length - 1];
                lastMsg.results = {
                    answer: `**Error:** Failed to complete research. \n\n${(typeof err === 'string' ? err : err?.error) || JSON.stringify(err) || 'Unknown error'}`,
                    agent_steps: [],
                    confidence: 0,
                    sources: [],
                    flags: []
                };
                lastMsg.isStreaming = false;
                return newMsgs;
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground font-sans">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto antialiased scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-blue-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            How can I help you research?
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-lg">
                            I can orchestrate multiple AI agents to find, summarize, and verify complex topics for you.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col pb-4">
                        {messages.map((msg, i) => (
                            <ChatMessage key={i} message={msg} />
                        ))}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="shrink-0 p-4 bg-background/80 backdrop-blur-lg border-t z-10">
                <ChatInput onSend={handleSearch} isLoading={loading} />
            </div>

        </div>
    );
}
