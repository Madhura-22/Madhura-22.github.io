class Bar{
	
	
    constructor(data) 
	{
        this.data=data;

    }

    drawBar(activeYear,State) {
       
		console.log("happpy")
		let width=700;
		let height=400;






		//frgr

		let trialData=this.data.Gender.filter(d=>d.Year==activeYear && d.State==State);
		console.log(trialData)

		d3.selectAll(".switch").classed("hidden",true);



		

		let barChart = d3.select("#bar-plot").append("svg").attr("height",500).attr("width",700);
		let barLayer=barChart.append("g").attr("id","barLayer");

		

		
	}
	
	updateBar(activeYear,State) {
       
		let width=700;
		let height=400;



		let that=this;
		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);
		console.log(trialData)
		
		
		let barLayer=d3.select("#barLayer");

		d3.selectAll(".axis-line").remove();

		d3.select(".switch").classed("hidden",false);
		

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

		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(0,300)")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll(".tick").selectAll("text").attr("transform","rotate(90) translate(8,8)").style("text-anchor", "start");;
		console.log(ticklabel);

	
		

		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([-50, 2500])
		    .range([ 0, 300]);


		barLayer.append("g").attr("class","axis-line")
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

		// buttonStatus=false;
		
		

		let toggle=d3.select("#boop").on("input",function(){



		if(!this.checked){
			console.log("toggle on");


		

		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);
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
	
		

		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([-50, 2500])
		    .range([ 0, 300]);
		
		
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
		else{

	
		


		let AgeData=that.data.Age.filter(d=>d.Year==activeYear && d.State==State);
		console.log("**************");
		console.log(AgeData.length)
		
		
		let barLayer=d3.select("#barLayer");

		let categories=[]
		for(let i=0;i<AgeData.length;i++){
			if(!categories.includes(AgeData[i].Categories))
			categories.push(AgeData[i].Categories)
		}
		console.log(categories)

		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);
	
		

		 // Add Y axis
		var groups=["0-14","15-29","30-44","45-59","60+"];
		var y = d3.scaleLinear()
		    .domain([-50, 2500])
		    .range([ 0, 300]);


		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-15])
		    .padding([0.05])
		



		var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8',"#4daf4a","#BDB821","#21B3BD"])
			
		barLayer.selectAll("rect")
					.data(AgeData)
					.join("rect")
					  .attr("x", function(d,i) { console.log(xSubgroup(d.Age_group)+x(d.Categories)); return xSubgroup(d.Age_group)+x(d.Categories) ; })
					  .attr("y",function(d){ return 300 - y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return y(d.Total)})
					  .attr("fill", function(d) { return color(d.Age_group); });

		
		}

	
	});



		
	}
		
}