import React, { useRef, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

// Register fcose layout
cytoscape.use(fcose);

const STYLESHEET = [
    {
        selector: 'node',
        style: {
            'label': 'data(label)',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 6,
            'font-size': '10px',
            'font-family': 'Inter, sans-serif',
            'font-weight': '500',
            'color': '#334155',
            'text-background-color': 'rgba(255,255,255,0.7)',
            'text-background-opacity': 1,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'border-width': 2,
            'border-color': '#fff'
        }
    },
    {
        selector: 'node[type="Case"]',
        style: {
            'background-color': '#3b82f6',
            'shape': 'rectangle',
            'width': 30,
            'height': 30
        }
    },
    {
        selector: 'node[type="Accused"]',
        style: {
            'background-color': '#ef4444',
            'shape': 'ellipse',
            'width': 25,
            'height': 25
        }
    },
    {
        selector: 'node[type="Victim"]',
        style: {
            'background-color': '#22c55e',
            'shape': 'ellipse',
            'width': 20,
            'height': 20
        }
    },
    {
        selector: 'node[type="Complainant"]',
        style: {
            'background-color': '#06b6d4',
            'shape': 'triangle',
            'width': 25,
            'height': 25
        }
    },
    {
        selector: 'node[type="District"]',
        style: {
            'background-color': '#f97316',
            'shape': 'hexagon',
            'width': 35,
            'height': 35
        }
    },
    {
        selector: 'node[type="Crime Category"]',
        style: {
            'background-color': '#a855f7',
            'shape': 'ellipse',
            'width': 35,
            'height': 35
        }
    },
    {
        selector: 'edge',
        style: {
            'width': 1.5,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'control-point-distance': 30,
            'control-point-weight': 0.5,
            'opacity': 0.6,
            'font-size': '8px',
            'text-rotation': 'autorotate',
            'text-margin-y': -5,
            'color': '#94a3b8'
        }
    },
    {
        selector: 'edge[label]',
        style: {
            'label': 'data(label)'
        }
    },
    {
        selector: '.highlighted-node',
        style: {
            'border-width': 4,
            'border-color': '#fbbf24',
            'underlay-color': '#fbbf24',
            'underlay-padding': 8,
            'underlay-opacity': 0.8,
            'underlay-shape': 'ellipse'
        }
    },
    {
        selector: '.highlighted-edge',
        style: {
            'line-color': '#3b82f6',
            'target-arrow-color': '#3b82f6',
            'width': 2.5,
            'opacity': 1,
            'z-index': 999
        }
    },
    {
        selector: '.faded',
        style: {
            'opacity': 0.1
        }
    }
];

export const NetworkGraph = ({ elements, onNodeSelect, searchKeyword }) => {
    const cyRef = useRef(null);
    const [cyInstance, setCyInstance] = useState(null);

    useEffect(() => {
        if (!cyInstance) return;
        
        cyInstance.on('tap', 'node', (evt) => {
            const node = evt.target;
            const data = node.data();
            onNodeSelect({ data });
            
            highlightNode(node);
        });

        cyInstance.on('tap', (evt) => {
            if (evt.target === cyInstance) {
                // Clicked on background
                onNodeSelect(null);
                removeHighlights();
            }
        });
        
        // Clean up listeners on unmount
        return () => {
            cyInstance.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cyInstance, onNodeSelect]);

    // Handle search highlighting
    useEffect(() => {
        if (!cyInstance) return;
        
        if (searchKeyword && searchKeyword.trim() !== '') {
            const keyword = searchKeyword.toLowerCase();
            const nodes = cyInstance.nodes();
            
            const match = nodes.filter(n => n.data('label').toLowerCase().includes(keyword)).first();
            
            if (match.length > 0) {
                onNodeSelect({ data: match.data() });
                highlightNode(match);
                
                cyInstance.animate({
                    fit: {
                        eles: match.closedNeighborhood(),
                        padding: 50
                    },
                    duration: 500
                });
            }
        } else {
            // Only remove highlights if no node is currently selected
            // But we don't have selectedNode state here, it's passed up.
            // Assuming clearing search should not clear selection unless handled by parent.
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, cyInstance]);

    const highlightNode = (node) => {
        if (!cyInstance) return;
        
        cyInstance.elements().removeClass('highlighted-node highlighted-edge faded');
        cyInstance.elements().addClass('faded');
        
        node.removeClass('faded').addClass('highlighted-node');
        const neighborhood = node.closedNeighborhood();
        neighborhood.removeClass('faded');
        node.connectedEdges().addClass('highlighted-edge');
    };

    const removeHighlights = () => {
        if (!cyInstance) return;
        cyInstance.elements().removeClass('highlighted-node highlighted-edge faded');
    };

    const layout = {
        name: 'fcose',
        animate: true,
        animationDuration: 1000,
        nodeDimensionsIncludeLabels: true,
        idealEdgeLength: 150,
        nodeRepulsion: 100000,
        randomize: true,
        padding: 30
    };

    return (
        <CytoscapeComponent
            elements={elements}
            stylesheet={STYLESHEET}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
            cy={(cy) => {
                cyRef.current = cy;
                if (!cyInstance) setCyInstance(cy);
            }}
            wheelSensitivity={0.2}
        />
    );
};
