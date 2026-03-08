import { Button } from './components/ui/button';
import { Send } from 'lucide-react';
import { cn } from './lib/utils';

export const SubmitButton = ({ onClick, loading, className }) => {
    return (
        <Button 
            onClick={onClick}
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
    );
}
