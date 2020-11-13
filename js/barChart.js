class Bar{
	
	
    constructor(data) 
	{
        this.data=data;

    }

    drawBar(activeYear,State) {
       
		console.log("happpy")
		let width=700;
		let height=400;

		let trialData=this.data.Gender.filter(d=>d.Year==activeYear && d.State==State);
		console.log(trialData)
		

		let barChart = d3.select("#bar-plot").append("svg").attr("height",500).attr("width",700);
		let barLayer=barChart.append("g").attr("id","barLayer");

		let categories=[]
		// console.log("length",trialData.length);
		for(let i=0;i<trialData.length;i++){
			if(!categories.includes(trialData[i].Categories))
			categories.push(trialData[i].Categories)
		}
		console.log(categories)

		var groups = ["Male", "Female"]
		



		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);
	
		barLayer.append("g")
			.attr("transform","translate(0,300)")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll(".tick").selectAll("text").attr("transform","rotate(90) translate(8,8)").style("text-anchor", "start");;
		console.log(ticklabel);


		  // Add Y axis
		  var y = d3.scaleLinear()
		    .domain([-50, 2500])
		    .range([ 0, 300]);
		  barLayer.append("g")
		    .call(d3.axisLeft(y));

		
		  var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-26])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8'])
			
		   barLayer.selectAll("rect")
					.data(trialData)
					.join("rect")
					  .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return 300 - y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });


		
	}
	
	updateBar(activeYear,State) {
       
		let width=700;
		let height=400;

		let trialData=this.data.Gender.filter(d=>d.Year==activeYear && d.State==State);
		console.log(trialData)
		
		let barLayer=d3.select("#barLayer");

		let categories=[]
		for(let i=0;i<trialData.length;i++){
			if(!categories.includes(trialData[i].Categories))
			categories.push(trialData[i].Categories)
		}
		console.log(categories)

		var groups = ["Male", "Female"]
		



		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);
	
		// barLayer.append("g")
			// .attr("transform","translate(0,300)")
		    // .call(d3.axisBottom(x).tickSize(0));
			
		// let ticklabel = d3.selectAll(".tick").selectAll("text").attr("transform","rotate(90) translate(8,8)").style("text-anchor", "start");;
		// console.log(ticklabel);


		  // Add Y axis
		  var y = d3.scaleLinear()
		    .domain([-50, 2500])
		    .range([ 0, 300]);
		  // barLayer.append("g")
		    // .call(d3.axisLeft(y));

		
		  var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-26])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8'])
			
		   barLayer.selectAll("rect")
					.data(trialData)
					.join("rect")
					  .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return 300 - y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });


		
	}
		
}