class Liney{
	
	
    constructor(data) 
	{
        this.data = data;
        this.activeState = "null";

    }

    drawLine(activeYear,State) {
      // d3.select(".switch").classed("hidden",false);
		let width=700;
        let height=300;

        let stateData = this.data.Total.filter(d => d.Year=="2012");
        let totalStates = [];
        for(let i=0;i<stateData.length;i++){
          if(stateData[i].State != State){
            totalStates.push(stateData[i].State)
          }
        }
        totalStates.push("Select")
        let that = this;
        let select = d3.select("#line-plot").append('select')
        .attr('class','select')
        .on('change', function(d){
          let selectValue = d3.select('select').property('value');
          that.updateLineTwo(selectValue);
        });

        let options = select.selectAll('option')
        .data(totalStates).enter().append('option')
        .text(function (d) { return d; })
        .property("selected", function(d){ return d === "Select"; });

        d3.selectAll(".select").classed("hidden",true);

        let lineChart = d3.select("#line-plot").append("svg").attr("height",500).attr("width",700);

		let lineLayer= lineChart.append("g").attr("id","lineLayer").attr("transform", "translate(0,20)");
        lineLayer.append("g")
          .attr("transform", "translate(0,300)")
          .attr("class","Xaxis")
        lineLayer.append("g")
        .attr("transform", "translate(80,0)")
          .attr("class","Yaxis")	
  }

	
	updateLine(activeYear,State) {
    d3.select(".select").classed("hidden",false);
    this.activeState = State;
        let width = 700;
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
        let xAxis = d3.axisBottom(x);
        lineLayer.selectAll(".Xaxis")
          // .duration(2000)
          .call(xAxis);

        
        let y = d3.scaleLinear()
        .domain([0, d3.max(trialData, d => parseInt(d.Total,10))])
        .range([height, 0]);
          let yAxis = d3.axisLeft(y).ticks(5);
          lineLayer.selectAll(".Yaxis")
            .call(yAxis);

        let lineGrp = lineLayer.selectAll(".lineTest").data([trialData]);
        
          // Updata the line
          lineGrp.enter()
            .append("path")
            .attr("class","lineTest")
            .merge(lineGrp)
            .transition()
            .duration(2000)
            .attr("d", d3.line()
              .x(function(d) { return x(d.Year); })
              .y(function(d) { return y(parseInt(d.Total,10)); }))
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 2.5);

		
    } 

    updateLineTwo(secondState) {

      let width = 700;
      let height = 300;
      let that = this;
      let trialData1 = this.data.Total.filter(d => d.State==that.activeState);  
      let trialData2 = this.data.Total.filter(d => d.State==secondState);
  
      let lineLayer=d3.select("#lineLayer");
      let totalyears = [];
        for(let i=0;i<trialData1.length;i++){
              if(!totalyears.includes(trialData1[i].Year))
              
          totalyears.push(trialData1[i].Year.toString())
        }
      
      // lineLayer.selectAll(".XaxisSingle").remove();
      // lineLayer.selectAll(".YaxisSingle").remove();
      lineLayer.selectAll("path").remove();

      let x = d3.scaleBand()
      .domain(totalyears).range([80,width]).padding([0.8]);
      let xAxis = d3.axisBottom(x);
      lineLayer.selectAll(".Xaxis")
        // .duration(2000
        .call(xAxis);

      
      let y = d3.scaleLinear()
      .domain([0,40])
      .range([height, 0]);
        let yAxis = d3.axisLeft(y).ticks(5);
        lineLayer.selectAll(".Yaxis")
          .call(yAxis);

      let lineGrp1 = lineLayer.selectAll(".lineTest1").data([trialData1]);
      let lineGrp2 = lineLayer.selectAll(".lineTest2").data([trialData2]);
        // Updata the line
        lineGrp1.enter()
          .append("path")
          .attr("class","lineTest1")
          .merge(lineGrp1)
          .transition()
          .duration(2000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(parseInt(d.Percentage,10)); }))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5);

      lineGrp2.enter()
        .append("path")
        .attr("class","lineTest2")
        .merge(lineGrp2)
        .transition()
        .duration(2000)
        .attr("d", d3.line()
          .x(function(d) { return x(d.Year); })
          .y(function(d) { return y(parseInt(d.Percentage,10)); }))
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 2.5);
        

  
  }   
}