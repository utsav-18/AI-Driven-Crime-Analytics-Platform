import { useState, useEffect, useMemo } from 'react';
import { networkService } from '../services/network.service';

export const useNetworkGraph = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleTypes, setVisibleTypes] = useState({
        'Case': true,
        'Accused': true,
        'Victim': true,
        'Complainant': true,
        'District': true,
        'Crime Category': true
    });
    
    // Store original data to allow filtering without refetching
    const [rawData, setRawData] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                setLoading(true);
                const data = await networkService.getGraphData();
                setRawData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to load network graph');
                setLoading(false);
            }
        };
        fetchGraph();
    }, []);

    // Memoize the filtered elements
    const filteredElements = useMemo(() => {
        if (!rawData.nodes.length) return [];
        
        // Filter nodes based on visibleTypes
        const visibleNodeIds = new Set();
        const filteredNodes = rawData.nodes.filter(node => {
            if (visibleTypes[node.data.type]) {
                visibleNodeIds.add(node.data.id);
                return true;
            }
            return false;
        });

        // Only keep edges where both source and target are visible
        const filteredEdges = rawData.edges.filter(edge => {
            return visibleNodeIds.has(edge.data.source) && visibleNodeIds.has(edge.data.target);
        });

        return [...filteredNodes, ...filteredEdges];
    }, [rawData, visibleTypes]);

    const toggleTypeVisibility = (type) => {
        setVisibleTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return {
        elements: filteredElements,
        loading,
        error,
        visibleTypes,
        toggleTypeVisibility,
        rawData
    };
};
