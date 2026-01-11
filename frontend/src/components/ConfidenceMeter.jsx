import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function ConfidenceMeter({ score }) {
    // Score is 0.0 to 1.0
    const percentage = Math.round(score * 100);

    let colorClass = "bg-red-500";
    let textClass = "text-red-500";

    if (percentage >= 80) {
        colorClass = "bg-green-500";
        textClass = "text-green-600";
    } else if (percentage >= 50) {
        colorClass = "bg-yellow-500";
        textClass = "text-yellow-600";
    }

    return (
        <div className="space-y-2 border p-4 rounded-lg bg-card">
            <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
                <span className={cn("text-2xl font-bold", textClass)}>{percentage}%</span>
            </div>
            <Progress value={percentage} className={cn("h-3", colorClass)} />
        </div>
    );
}
