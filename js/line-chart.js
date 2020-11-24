class Liney{
	
	
    constructor(data) 
	{
        this.data = data;

    }

    drawLine(activeYear,State) {
       
		// console.log("happpy")
		let width=700;
        let height=400;
        
        let trialData = this.data.Total.filter(d => d.State==State);
		// console.log(trialData)



        // let bScale = d3
        // .scaleLinear()
        // .domain([0, d3.max(trialData, d => d.deaths)])
        // .range([0, 200]);

        let iScale_area = d3
        .scaleLinear()
        .domain([0, 15])
        .range([0, 260]);

        let lineChart = d3.select("#line-plot").append("svg").attr("height",500).attr("width",700);
		let lineLayer= lineChart.append("g").attr("id","lineLayer");
        lineLayer.append("g")
          .attr("transform", "translate(0,300)")
          .attr("class","myXaxis")
        lineLayer.append("g")
          .attr("class","myYaxis")


		
	}
	
	updateLine(activeYear,State) {

        let width = 700;
        let height = 300;
        let trialData = this.data.Total.filter(d => d.State==State);

        // d3.selectAll(".myXaxis").remove();
        // d3.selectAll(".myYaxis").remove();
       
        // let iScale_area = d3
        // .scaleLinear()
        // .domain([0, 15])
        // .range([0, 260]);
		
        let lineLayer=d3.select("#lineLayer");
        let totalyears = []
        	for(let i=0;i<trialData.length;i++){
                if(!totalyears.includes(trialData[i].Year))
                
        		totalyears.push(trialData[i].Year.toString())
        	}

       
        console.log(totalyears);

        let x = d3.scaleBand()
        .domain(totalyears).range([0,width]).padding([0.8]);
        let xAxis = d3.axisBottom(x);
        lineLayer.selectAll(".myXaxis").transition()
          .duration(2000)
          .call(xAxis);

        let y = d3.scaleLinear()
        .domain([0, d3.max(trialData, d => d.Total)])
        .range([height, 0]);
          let yAxis = d3.axisLeft(y).ticks(5);
          lineLayer.selectAll(".myYaxis")
            .transition()
            .duration(2000)
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
              .y(function(d) { return y(d.Total); }))
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 2.5);

		
    }   
}