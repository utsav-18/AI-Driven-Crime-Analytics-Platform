import React, { useState } from 'react';
import { useNetworkGraph } from '../hooks/useNetworkGraph';
import { NetworkGraph } from '../components/network/NetworkGraph';
import { GraphLegend } from '../components/network/GraphLegend';
import { GraphFilters } from '../components/network/GraphFilters';
import { DetailsPanel } from '../components/network/DetailsPanel';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Card } from '../components/common/Card';
import { Search } from 'lucide-react';

export const NetworkAnalysis = () => {
    const { 
        elements, 
        loading, 
        error, 
        visibleTypes, 
        toggleTypeVisibility 
    } = useNetworkGraph();
    
    const [selectedNode, setSelectedNode] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearch, setActiveSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setActiveSearch(searchQuery);
    };

    if (loading) return <Loader text="Building network graph..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="flex flex-col h-full gap-4 relative overflow-hidden">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Network Analysis</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Explore relationships between cases, entities, and locations.</p>
                </div>
                
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search node..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark shadow-sm"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </form>
            </div>

            {/* Filters */}
            <Card className="p-4 shrink-0">
                <h3 className="text-sm font-semibold text-navy-900 mb-3">Visible Entities</h3>
                <GraphFilters 
                    visibleTypes={visibleTypes} 
                    toggleTypeVisibility={toggleTypeVisibility} 
                />
            </Card>

            {/* Graph Area */}
            <Card className="flex-1 p-0 relative min-h-[500px] overflow-hidden bg-slate-50 border border-slate-200">
                <NetworkGraph 
                    elements={elements} 
                    onNodeSelect={setSelectedNode}
                    searchKeyword={activeSearch}
                />
                
                <GraphLegend />
                
                {/* Overlay Details Panel */}
                <div 
                    className={`absolute inset-y-0 right-0 z-20 transition-transform duration-300 ease-in-out transform ${
                        selectedNode ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <DetailsPanel 
                        node={selectedNode} 
                        onClose={() => setSelectedNode(null)} 
                    />
                </div>
            </Card>
        </div>
    );
};
