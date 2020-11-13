class Bar{
	
	
    constructor(data) 
	{
        this.data=data;
		this.activeYear = 2002;
		this.drawBar();
    }

    drawBar() {
       
		

		// let Gen_data=this.data.Gender.filter(d=>d.Year==this.activeYear);
		// console.log(Gen_data);
		console.log("happpy")
		//console.log(this.data);
		let width=960
		let height=500

		let trialData=this.data.Gender.filter(d=>d.Year==this.activeYear && d.State=="Karnataka");
		console.log(trialData)
		

		let barChart = d3.select("#bar-plot").append("svg");
		let barLayer=barChart.append("g").attr("id","barLayer");

		let categories=[]
		for(let i=0;i<16;i++){
			if(!categories.includes(trialData[i].Categories))
			categories.push(trialData[i].Categories)
		}
		console.log(categories)

		var groups = d3.map(trialData, function(d){return(d.Gender)}).keys()
		console.log("groups")
		console.log(groups)
		



		var x = d3.scaleBand()
		      .domain(groups)
		      .range([0, width])
		      .padding([0.2])
		barLayer.append("g")
		    //.attr("transform", "translate(0," + 700 + ")")
		    .call(d3.axisBottom(x).tickSize(0));

		  // Add Y axis
		  var y = d3.scaleLinear()
		    .domain([0, 40])
		    .range([ height, 0 ]);
		  barLayer.append("g")
		    .call(d3.axisLeft(y));

		
		  var xSubgroup = d3.scaleBand()
		    .domain(categories)
		    .range([0, x.bandwidth()])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(categories)
		    .range(['#e41a1c','#377eb8'])

		
	}	
		
}