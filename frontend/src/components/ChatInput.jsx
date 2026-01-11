import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, isLoading }) {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);

    const handleSubmit = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput("");
            // Reset height
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative flex items-end gap-2 bg-secondary/50 p-2 rounded-3xl border border-transparent focus-within:border-primary/20 focus-within:bg-secondary/80 transition-all duration-200">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="min-h-[44px] max-h-[200px] w-full resize-none border-0 bg-transparent py-3 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 text-base shadow-none scrollbar-hide"
                    disabled={isLoading}
                    rows={1}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="rounded-full h-10 w-10 shrink-0 mb-1 mr-1 transition-all"
                    variant={input.trim() ? "default" : "ghost"}
                >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
                </Button>
            </div>
            <div className="text-center text-xs text-muted-foreground mt-2">
                Multi-Agent AI can make mistakes. Consider checking important information.
            </div>
        </div>
    );
}
