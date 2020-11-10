loadData().then(data => {

console.log(data);

const worldMap = new Map(data);
const barChart = new Bar(data);

d3.json('data/Indian_States.json').then(mapData => { 
        
        worldMap.drawMap(mapData); 

    });
	

    
});




async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let s = await loadFile('data/Project_data.csv');
    let m = await loadFile('data/Project_data2.csv');
	let g = await loadFile('data/Project_data3.csv');
    return {
        'suicides': s,
        'Total': m,
		'Gender': g
    };
}
