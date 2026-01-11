import { AlertTriangle } from "lucide-react";

export default function FlagPanel({ flags = [] }) {
    if (!flags || flags.length === 0) return null;

    return (
        <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 rounded-r-md">
            <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="text-orange-500" size={20} />
                <h3 className="font-semibold text-orange-700 dark:text-orange-300">Verification Flags</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-orange-800 dark:text-orange-200 space-y-1">
                {flags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                ))}
            </ul>
        </div>
    );
}
