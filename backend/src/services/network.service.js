const networkRepository = require('../repositories/network.repository');

class NetworkService {
    async getGraphData() {
        const rawData = await networkRepository.getGraphData();
        
        const nodes = [];
        const edges = [];
        
        const addedNodes = new Set();
        const addedEdges = new Set();
        
        const addNode = (id, label, type, metadata = {}) => {
            if (!addedNodes.has(id)) {
                nodes.push({ data: { id, label, type, ...metadata } });
                addedNodes.add(id);
            }
        };

        const addEdge = (source, target, relationship) => {
            const edgeId = `${source}_${target}_${relationship}`;
            if (!addedEdges.has(edgeId)) {
                edges.push({ data: { id: edgeId, source, target, relationship, label: relationship } });
                addedEdges.add(edgeId);
            }
        };

        const normalizeName = (name) => {
            if (!name) return 'unknown';
            return name.trim().toLowerCase();
        };

        // Process cases
        rawData.cases.forEach(c => {
            const caseNodeId = `case_${c.case_id}`;
            addNode(caseNodeId, c.fir_number, 'Case', { status: c.status, connectedCases: 1 });
            
            // Add District Node & Edge
            if (c.district_name) {
                const districtId = `district_${normalizeName(c.district_name)}`;
                addNode(districtId, c.district_name, 'District', { connectedCases: 0 });
                addEdge(caseNodeId, districtId, 'location');
            }
            
            // Add Crime Category Node & Edge
            if (c.crime_name) {
                const categoryId = `category_${normalizeName(c.crime_name)}`;
                addNode(categoryId, c.crime_name, 'Crime Category', { connectedCases: 0 });
                addEdge(caseNodeId, categoryId, 'category');
            }
        });

        // Process Accused
        rawData.accused.forEach(a => {
            const caseNodeId = `case_${a.case_id}`;
            const normalizedName = normalizeName(a.accused_name);
            const accusedId = `accused_${normalizedName}`;
            
            addNode(accusedId, a.accused_name, 'Accused', { status: a.status, connectedCases: 0 });
            addEdge(caseNodeId, accusedId, 'accused');
        });

        // Process Victims
        rawData.victims.forEach(v => {
            const caseNodeId = `case_${v.case_id}`;
            const normalizedName = normalizeName(v.victim_name);
            const victimId = `victim_${normalizedName}`;
            
            addNode(victimId, v.victim_name, 'Victim', { injuryType: v.injury_type, connectedCases: 0 });
            addEdge(caseNodeId, victimId, 'victim');
        });

        // Process Complainants
        rawData.complainants.forEach(cp => {
            const caseNodeId = `case_${cp.case_id}`;
            const normalizedName = normalizeName(cp.complainant_name);
            const compId = `complainant_${normalizedName}`;
            
            addNode(compId, cp.complainant_name, 'Complainant', { connectedCases: 0 });
            addEdge(caseNodeId, compId, 'complainant');
        });

        // Calculate connected cases for each node (excluding cases themselves)
        const nodeConnections = {};
        edges.forEach(edge => {
            const { source, target } = edge.data;
            if (source.startsWith('case_')) {
                nodeConnections[target] = (nodeConnections[target] || 0) + 1;
            } else if (target.startsWith('case_')) {
                nodeConnections[source] = (nodeConnections[source] || 0) + 1;
            }
        });

        nodes.forEach(node => {
            if (node.data.type !== 'Case') {
                node.data.connectedCases = nodeConnections[node.data.id] || 0;
            }
        });

        return { nodes, edges };
    }
}

module.exports = new NetworkService();
