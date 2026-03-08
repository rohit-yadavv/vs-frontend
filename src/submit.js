import { useState } from 'react';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from './lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './components/ui/alert-dialog';

export const SubmitButton = ({ className }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Prepare data as per backend requirements
            const nodeData = nodes.map(n => ({ id: n.id }));
            const edgeData = edges.map(e => ({
                source: e.source,
                target: e.target
            }));

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes: nodeData, edges: edgeData }),
            });

            if (!response.ok) throw new Error('Failed to connect to backend');

            const data = await response.json();
            setResult(data);
            setIsDialogOpen(true);

        } catch (error) {
            console.error('Submission error:', error);
            alert('Error: Could not process the pipeline. Ensure the FastAPI server is running on localhost:8000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleSubmit}
                disabled={loading}
                size="lg"
                className={cn(
                    "rounded-full px-8 shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all gap-2 h-12 text-base font-semibold",
                    className
                )}
            >
                {loading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        Run Pipeline
                    </>
                )}
            </Button>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={'flex items-center w-full gap-2'}>
                            <Info className="size-5 text-primary" />
                            Pipeline Analysis
                        </AlertDialogTitle>

                        <AlertDialogDescription className={'mt-3 w-full'}>
                            {result && (
                                <div className="grid gap-6 w-full">
                                    {/* Connectivity Status Banner */}
                                    <div className={cn(
                                        "flex flex-col gap-3 p-5 rounded-2xl border-2 transition-all shadow-sm w-full",
                                        result.is_dag
                                            ? "bg-green-500/[0.03] border-green-500/20 text-green-700 dark:text-green-400"
                                            : "bg-destructive/[0.03] border-destructive/20 text-destructive"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            {result.is_dag ? <CheckCircle2 className="size-5 shrink-0" /> : <AlertCircle className="size-5 shrink-0" />}

                                            <p className="text-md font-medium mt-0.5">
                                                {result.is_dag
                                                    ? "Your flow is structured as a DAG."
                                                    : "The engine found nested loops."}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Detailed Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Nodes</span>
                                            <span className="text-2xl font-black text-foreground">{result.num_nodes}</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Edges</span>
                                            <span className="text-2xl font-black text-foreground">{result.num_edges}</span>
                                        </div>

                                    </div>

                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="pt-2">
                        <AlertDialogAction className="w-full h-11 font-bold tracking-wide">
                            Continue Building
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}

