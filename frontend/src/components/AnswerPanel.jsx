import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

export default function AnswerPanel({ answer }) {
    if (!answer) return null;

    return (
        <Card className="border-primary/20 bg-slate-50/50 dark:bg-slate-900/50">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Synthesized Answer</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
            </CardContent>
        </Card>
    );
}
