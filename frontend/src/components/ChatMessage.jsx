import ReactMarkdown from 'react-markdown';
import { Bot, User, Sparkles, Loader2 } from "lucide-react";
import AgentTimeline from './AgentTimeline';
import AnswerPanel from './AnswerPanel';
import ConfidenceMeter from './ConfidenceMeter';
import SourceCard from './SourceCard';
import FlagPanel from './FlagPanel';
import { cn } from "@/lib/utils";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";
    const { content, results, isStreaming } = message;

    return (
        <div className={cn(
            "flex w-full max-w-4xl mx-auto gap-4 py-8 px-4",
            isUser ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Avatar */}
            <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}>
                {isUser ? <User size={18} /> : <Sparkles size={18} className="text-blue-500" />}
            </div>

            {/* Content */}
            <div className={cn(
                "flex-1 space-y-4 overflow-hidden",
                isUser ? "text-right" : "text-left"
            )}>
                {/* User Message Bubble */}
                {isUser && (
                    <div className="inline-block bg-primary/10 px-4 py-2.5 rounded-2xl rounded-tr-sm text-base">
                        <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                )}

                {/* AI Response area */}
                {!isUser && (
                    <div className="space-y-6">

                        {/* If we have full results (finished research) */}
                        {results ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                                {/* 1. Timeline (Collapsed View likely better, but full is fine) */}
                                <div className="bg-card/50 rounded-xl border p-4">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Research Process</h4>
                                    <AgentTimeline steps={results.agent_steps} />
                                </div>

                                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                                    <div className="space-y-6">
                                        {/* 2. Answer */}
                                        <div className="prose dark:prose-invert max-w-none text-base leading-relaxed">
                                            <ReactMarkdown>{results.answer}</ReactMarkdown>
                                        </div>

                                        {/* 3. Flags */}
                                        <FlagPanel flags={results.flags} />
                                    </div>

                                    <div className="space-y-6">
                                        {/* 4. Confidence */}
                                        <ConfidenceMeter score={results.confidence} />

                                        {/* 5. Sources */}
                                        <SourceCard sources={results.sources} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Loading / Initial thinking state */
                            <div className="space-y-2">
                                {isStreaming ? (
                                    <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Thinking...</span>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">Initializing agents...</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
