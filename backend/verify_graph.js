

const http = require('http');

http.get('http://localhost:5000/api/v1/network/graph', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        const json = JSON.parse(body);
        const data = json.data;
        const nodes = data.nodes;
        const edges = data.edges;

        const nodeIds = new Set(nodes.map(n => n.data.id));
        const selfLoops = edges.filter(e => e.data.source === e.data.target);
        const missingSource = edges.filter(e => !nodeIds.has(e.data.source));
        const missingTarget = edges.filter(e => !nodeIds.has(e.data.target));

        console.log('Total Nodes:', nodes.length);
        console.log('Total Edges:', edges.length);
        console.log('Self Loops:', selfLoops.length);
        console.log('Missing Source:', missingSource.length);
        console.log('Missing Target:', missingTarget.length);
        
        // Find if multiple nodes have exactly the same ID
        const idCounts = {};
        nodes.forEach(n => {
            idCounts[n.data.id] = (idCounts[n.data.id] || 0) + 1;
        });
        const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);
        console.log('Duplicate Node IDs:', duplicates.length);

    });
});
