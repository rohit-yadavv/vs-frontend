import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground relative">
      {/* Top Section - Toolbar pushes content down */}
      <PipelineToolbar />
      
      {/* Main Workspace Area */}
      <main className="relative flex-1 overflow-hidden">
        <PipelineUI />
      </main>
    </div>
  );
}

export default App;
