class Bar{
	
	
    constructor(data) 
	{
        this.data=data;

    }

    drawBar(activeYear,State) {
       
		let width=900;
		let height=600;






		

		let trialData=this.data.Gender.filter(d=>d.Year==activeYear && d.State==State);


		d3.selectAll("#toggle").classed("hidden",true);



		

		let barChart = d3.select("#bar-plot").append("svg").attr("height",510).attr("width",1100);
		let barLayer=barChart.append("g").attr("id","barLayer").attr("transform", "translate(90,0)");

		
		

		
	}
	
	updateBar(activeYear,State) {
       
		let width=900;
		let height=400;



		let that=this;
		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);

		
		
		let barLayer=d3.select("#barLayer");

		d3.selectAll(".axis-line").remove();

		d3.select("#toggle").classed("hidden",false);
		
		d3.selectAll(".legend").remove()

		//let categories=[];

		let categories=["Sickness","Financial issues","Relation Troubles","Others Causes","Pressures of Society","Drug Abuse/Addiction","Physical Abuse (Rape/Incest Etc.)","Causes Not known"]

		// for(let i=0;i<trialData.length;i++){
		// 	if(!categories.includes(trialData[i].Categories))
		// 	categories.push(trialData[i].Categories)
		// }


		var groups = ["Male", "Female"]

		barLayer.append("circle").attr("cx",900).attr("cy",50).attr("r", 6).style("fill", "#640113").attr("class","legend");
        barLayer.append("circle").attr("cx",900).attr("cy",70).attr("r", 6).style("fill", "#ffb980").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 55).text("Male").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 75).text("Female").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);

		let categoryAxis=barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(21.5,300)")
			.attr("id","catX")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll("#catX").selectAll(".tick").selectAll("text").attr("transform","translate(-37,10) rotate(90)").style("text-anchor", "start");


	
	
		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([0,d3.max(trialData, d => parseInt(d.Total,10))])
		    .range([300,0]);

		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(20.5,0)")
		    .call(d3.axisLeft(y));


        barLayer.append("text") 
        .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x",-150)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("No. of Suicides");                  
      
		
		
		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    //.range(0,800)
		    .range([0, x.bandwidth()-43])
		    .padding([0.05])



		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#640113','#ffb980'])


			
		   // barLayer.selectAll("myrect")
					// .data(trialData)
					// .join("rect")
					//   .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					//   .attr("y",function(d){ return y(0);})
					//   .attr("width", 20)
					//   .attr("height",function(d){ return y(0);})
					//   .attr("fill", function(d) { return color(d.Gender); });



		   barLayer.selectAll("rect")
					.data(trialData)
					.join("rect")
					.merge(barLayer)
		            .transition()
		            .duration(2000)
					 .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					 .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });



		// buttonStatus=false;
		
		

		let toggle=d3.select("#boop").on("input",function(){



		if(!this.checked){



		

		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);

		
		d3.selectAll(".legend").remove();
		let barLayer=d3.select("#barLayer");

		
		barLayer.append("circle").attr("cx",900).attr("cy",50).attr("r", 6).style("fill", "#640113").attr("class","legend");
        barLayer.append("circle").attr("cx",900).attr("cy",70).attr("r", 6).style("fill", "#ffb980").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 55).text("Male").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 75).text("Female").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		let categories=["Sickness","Financial issues","Relation Troubles","Others Causes","Pressures of Society","Drug Abuse/Addiction","Physical Abuse (Rape/Incest Etc.)","Causes Not known"]


		// let categories=[]
		// for(let i=0;i<trialData.length;i++){
		// 	if(!categories.includes(trialData[i].Categories))
		// 	categories.push(trialData[i].Categories)
		// }


		var groups = ["Male", "Female"]


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);
		
		
		d3.selectAll(".axis-line").remove();
		let categoryAxis=barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(21.5,300)")
			.attr("id","catX")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll("#catX").selectAll(".tick").selectAll("text").attr("transform","translate(-37,10) rotate(90)").style("text-anchor", "start");
	
		

		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([0,(d3.max(trialData, d => parseInt(d.Total,10))+200)])
		    .range([300,0]);
		
		let yAxis = d3.axisLeft(y).ticks(5);
        barLayer.selectAll(".Yaxis")
          .call(yAxis);
		  
		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(20.5,0)")
		    .call(d3.axisLeft(y));


        barLayer.append("text") 
        .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x",-150)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("No. of Suicides");                  
		
		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-43])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#640113','#ffb980']);
			
		   barLayer.selectAll("rect")
					.data(trialData)
				
					.join("rect")
						.merge(barLayer)
		            .transition()
		            .duration(2000)
					  .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });


		

		}
		else{

	
		


		let AgeData=that.data.Age.filter(d=>d.Year==activeYear && d.State==State);

		
		
		let barLayer=d3.select("#barLayer");

		let categories=["Sickness","Financial issues","Relation Troubles","Others Causes","Pressures of Society","Drug Abuse/Addiction","Physical Abuse (Rape/Incest Etc.)","Causes Not known"]


		// let categories=[]
		// for(let i=0;i<AgeData.length;i++){
		// 	if(!categories.includes(AgeData[i].Categories))
		// 	categories.push(AgeData[i].Categories)
		// }

		d3.selectAll(".legend").remove();
		// ','',"","#",""
		barLayer.append("circle").attr("cx",950).attr("cy",50).attr("r", 6).style("fill", "#ffa600").attr("class","legend");
        barLayer.append("circle").attr("cx",950).attr("cy",70).attr("r", 6).style("fill", "#bc5090").attr("class","legend");
        barLayer.append("text").attr("x", 970).attr("y", 55).text("0-14").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 970).attr("y", 75).text("15-29").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("circle").attr("cx",950).attr("cy",90).attr("r", 6).style("fill", "#003f5c").attr("class","legend");
        barLayer.append("circle").attr("cx",950).attr("cy",110).attr("r", 6).style("fill", "#ff6361").attr("class","legend");
        barLayer.append("text").attr("x", 970).attr("y", 95).text("30-44").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 970).attr("y", 115).text("45-59").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("circle").attr("cx",950).attr("cy",135).attr("r", 6).style("fill", "#068f06").attr("class","legend");
        barLayer.append("text").attr("x", 970).attr("y", 140).text("60+").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width+20])
		      .padding([0.2]);
		
		d3.selectAll(".axis-line").remove();
		let categoryAxis=barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(21.5,300)")
			.attr("id","catX")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll("#catX").selectAll(".tick").selectAll("text").attr("transform","translate(-17,10) rotate(90)").style("text-anchor", "start");
		

		 // Add Y axis
		var groups=["0-14","15-29","30-44","45-59","60+"];
		var y = d3.scaleLinear()
		    .domain([0,d3.max(AgeData, d => parseInt(d.Total,10))])
		    .range([300,0]);
		
		let yAxis = d3.axisLeft(y).ticks(5);
        barLayer.selectAll(".Yaxis")
          .call(yAxis);
		  
		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(20.5,0)")
		    .call(d3.axisLeft(y));


		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, 100])
		    .padding([0.05])
		



		var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#ffa600','#bc5090',"#003f5c","#ff6361","#068f06"])
			
		barLayer.selectAll("rect")
					.data(AgeData)

					.join("rect")
					.merge(barLayer)
		            .transition()
		            .duration(2000)
					  .attr("x", function(d,i) {  return xSubgroup(d.Age_group)+x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Age_group); });

		
		}

	
	});



		
	}
		
}