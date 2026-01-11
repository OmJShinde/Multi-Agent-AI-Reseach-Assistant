import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SourceCard({ sources = [] }) {
    if (!sources || sources.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sources</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
                {sources.map((source, idx) => (
                    <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-3 rounded-lg border bg-card hover:bg-accent transition-colors duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm group-hover:text-blue-600 line-clamp-2">
                                {source.title}
                            </h4>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                            {source.url}
                        </p>
                    </a>
                ))}
            </CardContent>
        </Card>
    );
}
