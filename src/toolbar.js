import { useState, useMemo } from 'react';
import { DraggableNode } from './draggableNode';
import { cn } from "./lib/utils";
import { Search, X } from 'lucide-react';

const categories = [
    {
        id: 'general',
        label: 'General',
        nodes: [
            { type: 'customInput', label: 'Input' },
            { type: 'customOutput', label: 'Output' },
            { type: 'text', label: 'Text Node' },
        ]

    },
    {
        id: 'logic',
        label: 'Logic',
        nodes: [
            { type: 'llm', label: 'LLM Node' },
            { type: 'condition', label: 'Condition' },
        ]
    },
    {
        id: 'data-transformation',
        label: 'Data Transformation',
        nodes: [
            { type: 'transform', label: 'Transform' },
            { type: 'merge', label: 'Merge' },
        ]
    },
    {
        id: 'integrations',
        label: 'Integrations',
        nodes: [
            { type: 'api', label: 'API' },
        ]
    }
];

export const PipelineToolbar = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNodes = useMemo(() => {
        if (!searchQuery) return null;
        const allNodes = categories.flatMap(c => c.nodes);
        return allNodes.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    const activeCategory = categories.find(c => c.id === activeTab);

    return (
        <div className="relative z-50 w-full border-b border-border/40 bg-background/40 backdrop-blur-md shadow-sm">
            <div className="flex h-10 items-center gap-1 border-b border-border/20 px-6">
                <div className={cn(
                    "relative flex items-center transition-all duration-300 ease-in-out gap-2",
                    isSearchOpen ? "w-64" : "w-10"
                )}>
                    {!isSearchOpen ? (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center justify-center h-9 w-9 hover:text-primary transition-colors text-muted-foreground rounded-full hover:bg-muted/40"
                        >
                            <Search size={18} />
                        </button>
                    ) : (
                        <div className="flex items-center w-full gap-2 bg-muted/30 border border-border/40 rounded-full px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                            <Search size={16} className="text-muted-foreground shrink-0" />
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search nodes..."
                                className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground/40"
                            />
                            <button
                                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                className="text-muted-foreground hover:text-foreground shrink-0 p-0.5 hover:bg-muted/40 rounded-full"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar ml-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setActiveTab(category.id);
                                if (searchQuery) setSearchQuery('');
                            }}
                            className={cn(
                                "relative flex h-10 items-center px-4 text-[10px] font-semibold uppercase tracking-widest transition-colors hover:text-primary whitespace-nowrap",
                                activeTab === category.id && !searchQuery
                                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-6 p-2 px-6 overflow-x-auto no-scrollbar bg-background/5  min-h-[96px]">
                {searchQuery ? (
                    filteredNodes?.length > 0 ? (
                        filteredNodes.map((node) => (
                            <DraggableNode
                                key={node.type}
                                type={node.type}
                                label={node.label}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-[80px]">
                            <p className="text-xs text-muted-foreground font-medium">No results for "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-[10px] uppercase font-bold text-primary hover:opacity-80 mt-1"
                            >
                                Clear search
                            </button>
                        </div>
                    )
                ) : (
                    activeCategory?.nodes.map((node) => (
                        <DraggableNode
                            key={node.type}
                            type={node.type}
                            label={node.label}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
