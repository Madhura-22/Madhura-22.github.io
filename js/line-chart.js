class Liney{
	
	
    constructor(data) 
	{
        this.data = data;
        this.activeState = "null";

    }

    drawLine(activeYear,State) {
      // d3.select(".switch").classed("hidden",false);


      //trial
		let width=900;
        let height=300;
        d3.selectAll(".lableline").remove();

        let stateData = this.data.Total.filter(d => d.Year=="2012");
        let totalStates = [];
        for(let i=0;i<stateData.length;i++){
          if(stateData[i].State != State){
            totalStates.push(stateData[i].State)
          }
        }
        totalStates.push("Select")
        let that = this;
        let select = d3.select("#selection").append('select')
        .attr('class','select')
        .on('change', function(d){
          let selectValue = d3.select('select').property('value');
          that.updateLineTwo(selectValue);
        });

        let options = select.selectAll('option')
        .data(totalStates).enter().append('option')
        .text(function (d) { return d; })
        .property("selected", function(d){ return d === "Select"; });

        d3.selectAll("#selection").classed("hidden",true);

        let lineChart = d3.select("#line-plot").append("svg").attr("height",600).attr("width",1000).attr("transform","translate(20,0)");

		let lineLayer= lineChart.append("g").attr("id","lineLayer").attr("transform", "translate(0,20)");

             
  }

	
	updateLine(activeYear,State) {
    d3.select("#selection").classed("hidden",false);
    d3.selectAll(".axis-line-chart").remove();
    d3.selectAll(".lableline").remove();

    d3.selectAll(".legendline").remove()


    this.activeState = State;

        let width = 900;
        let height = 300;
        let trialData = this.data.Total.filter(d => d.State==State);
		
        let lineLayer=d3.select("#lineLayer");
        let totalyears = [];
        	for(let i=0;i<trialData.length;i++){
                if(!totalyears.includes(trialData[i].Year))
                
        		totalyears.push(trialData[i].Year.toString())
        	}
        
          // lineLayer.selectAll(".myXaxis").remove();
          // lineLayer.selectAll(".myYaxis").remove();
          lineLayer.selectAll("path").remove();
       
        let x = d3.scaleBand()
        .domain(totalyears).range([80,width]).padding([0.8]);


        

    	lineLayer.append("g").attr("class","axis-line-chart")
		.attr("transform","translate(0,300)")
	    .call(d3.axisBottom(x));

        
        let y = d3.scaleLinear()
        .domain([0, d3.max(trialData, d => parseInt(d.Total,10))])
        .range([height, 0]);
          // let yAxis = d3.axisLeft(y).ticks(5);

       lineLayer.append("text") 
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",-130)
      .attr("dy", "1em")
      .attr("class","lableline")
      .style("text-anchor", "middle")
      .text("No. of Suicides");  
         


    	lineLayer.append("g").attr("class","axis-line-chart")
		.attr("transform","translate(80,0)")
	    .call(d3.axisLeft(y));

        let lineGrp = lineLayer.selectAll(".lineTest").data([trialData]);
        
          // Updata the line
        let line1=lineGrp.enter()
			            .append("path")
			            .attr("class","lineTest")
			            .merge(lineGrp)
			            // .transition()
			            // .duration(2000)
			            .attr("d", d3.line()
			              .x(function(d) { return x(d.Year); })
			              .y(function(d) { return y(parseInt(d.Total,10)); }))
			              .attr("fill", "none")
			              .attr("stroke", "#003F5C")
			              .attr("stroke-width", 2.5);

		let totalLength = line1.node().getTotalLength();
				    line1      
				      .attr("stroke-dasharray", totalLength + " " + totalLength)
				      .attr("stroke-dashoffset", totalLength)
				      .transition()
				      .duration(2000)
				      .attr("stroke-dashoffset", 0);


		//lineLayer.append("circle").attr("cx",900).attr("cy",50).attr("r", 6).style("fill", "#e41a1c").attr("class","legend");
        lineLayer.append("circle").attr("cx",850).attr("cy",70).attr("r", 6).style("fill", "#003f5c").attr("class","legendline");
        //lineLayer.append("text").attr("x", 920).attr("y", 55).text("0-14").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        lineLayer.append("text").attr("x", 860).attr("y", 75).text(State).style("font-size", "15px").attr("alignment-baseline","right").attr("class","legendline");

		// barLayer.append("circle").attr("cx",60).attr("cy",50).attr("r", 6).style("fill", "#e41a1c").attr("class","legend");
  //       barLayer.append("circle").attr("cx",60).attr("cy",70).attr("r", 6).style("fill", "#377eb8").attr("class","legend");
  //       barLayer.append("text").attr("x", 60).attr("y", 55).text("0-14").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
  //       barLayer.append("text").attr("x", 60).attr("y", 75).text("15-29").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");




		
    } 

    updateLineTwo(secondState) {

     d3.selectAll(".legendline").remove();


      let width = 900;
      let height = 300;
      let that = this;
      let trialData1 = this.data.Total.filter(d => d.State==that.activeState);  
      let trialData2 = this.data.Total.filter(d => d.State==secondState);


      d3.selectAll(".axis-line-chart").remove();
      d3.selectAll(".lableline").remove();
  
      let lineLayer=d3.select("#lineLayer");
      let totalyears = [];
        for(let i=0;i<trialData1.length;i++){
              if(!totalyears.includes(trialData1[i].Year))
              
          totalyears.push(trialData1[i].Year.toString())
        }
      
      
      lineLayer.selectAll("path").remove();

      let x = d3.scaleBand()
      .domain(totalyears).range([80,width]).padding([0.8]);
      

      lineLayer.append("g").attr("class","axis-line-chart")
		.attr("transform","translate(0,300)")
	    .call(d3.axisBottom(x));

      
      let y = d3.scaleLinear()
      .domain([0,50])
      .range([height, 0]);
        
      lineLayer.append("circle").attr("cx",850).attr("cy",50).attr("r", 6).style("fill", "#ff9900").attr("class","legendline");
        lineLayer.append("circle").attr("cx",850).attr("cy",70).attr("r", 6).style("fill", "#003f5c").attr("class","legendline");
        lineLayer.append("text").attr("x", 860).attr("y", 55).text(secondState).style("font-size", "15px").attr("alignment-baseline","right").attr("class","legendline");
        lineLayer.append("text").attr("x", 860).attr("y", 75).text(that.activeState).style("font-size", "15px").attr("alignment-baseline","right").attr("class","legendline");







        lineLayer.append("g").attr("class","axis-line-chart")
		.attr("transform","translate(80,0)")
	    .call(d3.axisLeft(y));


      let lineGrp1 = lineLayer.selectAll(".lineTest1").data([trialData1]);
      let lineGrp2 = lineLayer.selectAll(".lineTest2").data([trialData2]);
        // Updata the line
      let line1=  lineGrp1.enter()
          .append("path")
          .attr("class","lineTest1")
          .merge(lineGrp1)
          // .transition()
          // .duration(2000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(parseInt(d.Percentage,10)); }))
            .attr("fill", "none")
            .attr("stroke", "#003F5C")
            .attr("stroke-width", 2.5);

        let totalLength = line1.node().getTotalLength();
				    line1      
				      .attr("stroke-dasharray", totalLength + " " + totalLength)
				      .attr("stroke-dashoffset", totalLength)
				      .transition()
				      .duration(2000)
				      .attr("stroke-dashoffset", 0);



     let line2= lineGrp2.enter()
        .append("path")
        .attr("class","lineTest2")
        .merge(lineGrp2)
        // .transition()
        // .duration(2000)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Year); })
          .y(function(d) { return y(parseInt(d.Percentage,10)); }))
          .attr("fill", "none")
          .attr("stroke", "#FF9900")
          .attr("stroke-width", 2.5);


           lineLayer.append("text") 
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",-130)
      .attr("dy", "1em")
      .attr("class","lableline")
      .style("text-anchor", "middle")
      .text("Percentage of Suicides");  

       let totalLength1 = line2.node().getTotalLength();
				    line2      
				      .attr("stroke-dasharray", totalLength1 + " " + totalLength1)
				      .attr("stroke-dashoffset", totalLength1)
				      .transition()
				      .duration(2000)
				      .attr("stroke-dashoffset", 0);

        

  
  }   
}