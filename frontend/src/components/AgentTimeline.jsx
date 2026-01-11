import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function AgentTimeline({ steps = [] }) {
    const allSteps = ["search", "summarize", "verify"];

    // If steps are null/undefined, default to empty
    const completedSteps = steps || [];

    return (
        <div className="flex items-center justify-between w-full max-w-lg mx-auto py-6">
            {allSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(step);
                // Determine if this step is currently "active"(next after last completed) 
                // But here we only receive completed steps so we can just show done vs not done
                // For a cooler effect, we would need 'currentStep' state from parent.
                // For now, simplistic view:

                return (
                    <div key={step} className="flex flex-col items-center relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{
                                scale: isCompleted ? 1.1 : 1,
                                opacity: isCompleted ? 1 : 0.5,
                                color: isCompleted ? "#22c55e" : "#94a3b8"
                            }}
                            className="z-10 bg-background p-1 rounded-full"
                        >
                            {isCompleted ? (
                                <CheckCircle2 size={32} className="text-green-500" />
                            ) : (
                                <Circle size={32} />
                            )}
                        </motion.div>

                        <span className="mt-2 text-sm font-medium capitalize text-muted-foreground">
                            {step}
                        </span>

                        {/* Connecting Line */}
                        {index < allSteps.length - 1 && (
                            <div className="absolute top-4 left-1/2 w-full h-[2px] bg-slate-200 -z-0">
                                <motion.div
                                    className="h-full bg-green-500 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
