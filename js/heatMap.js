class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, total) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.total = total;
        console.log("yayyyyy");
        console.log(this.total);
    }

}
class Map{
    constructor(data) {
        this.projection = d3.geoCylindricalEqualArea().scale(800,800).translate([-400, 700]);
        this.suicides = data.suicides;
        this.Total=data.Total
        this.data=data;
		this.activeYear = 2002;
        this.selectedState="null";
        this.barChart = new Bar(this.data);
		this.draw_Scroll();
     
    }

    drawMap(world) {
       
		
		let mapchart = d3.select("#map-chart").append("svg");
		let mapLayer=mapchart.append("g").attr("id","mapLayer");
		let that=this;
		//let barChart = new Bar(this.data);

		
		
		let mapBrew =['rgb(128,0,0)','rgb(178,34,34)','rgb(255,0,0)','rgb(255,69,0)','rgb(255,99,71)','rgb(240,128,128)','rgb(255,160,122)'];
		let mapRange = [30,25,20,15,10,5,0]; 

  //       var keys=[10000-12000,8000-10000,6000-8000,4000-6000,2000-4000,0-2000,0]

		 let yearTotalData=that.data.Total.filter(d=>d.Year==this.activeYear);
		
		// Define the div for the tooltip
		var div = d3.select("body").append("div")   
			.attr("class", "tooltip")               
			.style("opacity", 0);
		
        //Drawing the map 
		let Gpath = d3.geoPath().projection(this.projection);
        this.barChart.drawBar(that.activeYear,"Karnataka");

        var svg = d3.select("#mapLayer")

        // Handmade legend
        svg.append("text").attr("x", 220).attr("y", 125).text("% of suicides").style("font-size", "15px").attr("alignment-baseline","left")
        svg.append("circle").attr("cx",200).attr("cy",140).attr("r", 6).style("fill", "rgb(128,0,0)")
        svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "rgb(178,34,34)")
        svg.append("text").attr("x", 220).attr("y", 145).text("30% +").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("text").attr("x", 220).attr("y", 165).text("25-30%").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("circle").attr("cx",200).attr("cy",180).attr("r", 6).style("fill", "rgb(255,0,0)")
        svg.append("circle").attr("cx",200).attr("cy",200).attr("r", 6).style("fill", "rgb(255,69,0)")
        svg.append("text").attr("x", 220).attr("y", 185).text("20-25%").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("text").attr("x", 220).attr("y", 205).text("15-20%").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "rgb(255,99,71)")
        svg.append("circle").attr("cx",200).attr("cy",240).attr("r", 6).style("fill", "rgb(240,128,128)")
        svg.append("text").attr("x", 220).attr("y", 225).text("10-15%").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("text").attr("x", 220).attr("y", 245).text("5-10%").style("font-size", "15px").attr("alignment-baseline","right")
        svg.append("circle").attr("cx",200).attr("cy",260).attr("r", 6).style("fill", "rgb(255,160,122)")
        svg.append("text").attr("x", 220).attr("y", 265).text("0-5%").style("font-size", "15px").attr("alignment-baseline","right")


        mapLayer.selectAll("path")
                    .data(world.features)
                    .enter()
                    .append("path")
                    .attr("d", Gpath)
					// Coloring for the heatmap
                    .style("fill",function(d){ 

                        for(let i=0;i<34;i++){

                         if(d.properties.NAME_1==yearTotalData[i].State){
                            
                            var colors=mapBrew,
                                 range = mapRange;

                            return  yearTotalData[i].Percentage > range[0] ? colors[0] :
                                    yearTotalData[i].Percentage > range[1] ? colors[1] :
                                    yearTotalData[i].Percentage > range[2] ? colors[2] :
                                    yearTotalData[i].Percentage > range[3] ? colors[3] :
                                    yearTotalData[i].Percentage> range[4] ? colors[4] :
                                    yearTotalData[i].Percentage > range[5] ? colors[5] :
                                    colors[6];

                            }

						}
                        })
						   



					// Hover tooltip
                    .on("mouseover", function(d) {      
						div.transition()        
							.duration(200)      
							.style("opacity", .9);      
						div .html(that.tooltipRender(d,yearTotalData))  
							.style("left", (d3.event.pageX) + "px")     
							.style("top", (d3.event.pageY - 28) + "px");    
						})                  
                    .on("mouseout", function(d) {       
						div.transition()        
							.duration(500)      
							.style("opacity", 0);   
                        })
					.on("click", function(d){
                    that.selectedState=d.properties.NAME_1;
                    d3.select('#boop').property('checked', false);
					that.barChart.updateBar(that.activeYear,d.properties.NAME_1);
					});

    
    }
	
	updateMap() {
       
		
		let that = this;
		let mapLayer=d3.selectAll("#mapLayer");
		
		let mapBrew =['rgb(128,0,0)','rgb(178,34,34)','rgb(255,0,0)','rgb(255,69,0)','rgb(255,99,71)','rgb(240,128,128)','rgb(255,160,122)'];
		let mapRange = [30,25,20,15,10,5,0]; 


		let yearTotalData=that.data.Total.filter(d=>d.Year==this.activeYear);
		
		//remove tooltip

        d3.selectAll(".tooltip").remove();

        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

        mapLayer.selectAll("path")
				.style("fill",function(d){ 
					for(let i=0;i<34;i++){
					 if(d.properties.NAME_1==yearTotalData[i].State){
						
						var colors=mapBrew,
							 range = mapRange;

						return  yearTotalData[i].Percentage > range[0] ? colors[0] :
								yearTotalData[i].Percentage > range[1] ? colors[1] :
								yearTotalData[i].Percentage > range[2] ? colors[2] :
								yearTotalData[i].Percentage > range[3] ? colors[3] :
								yearTotalData[i].Percentage> range[4] ? colors[4] :
								yearTotalData[i].Percentage > range[5] ? colors[5] :
								colors[6];

						}

					}
					})
                 .on("mouseover", function(d) {      
                        div.transition()        
                            .duration(200)      
                            .style("opacity", .9);      
                        div .html(that.tooltipRender(d,yearTotalData))  
                            .style("left", (d3.event.pageX) + "px")     
                            .style("top", (d3.event.pageY - 28) + "px");    
                        })                  
                    .on("mouseout", function(d) {       
                        div.transition()        
                            .duration(500)      
                            .style("opacity", 0);   
                        })


						   

    
    }
	
	draw_Scroll()
	{
		// Working on the year scroll
		d3.select('#map-chart')
            .append('div').attr('id', 'activeYear-bar');
		

        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([2001, 2012]).range([30, 730]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 2001)
            .attr('max', 2012)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        sliderText.attr('x', yearScale(this.activeYear));
        sliderText.attr('y', 25);

        yearSlider.on('input', function () {
			sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value));
			that.activeYear = this.value;
			that.updateMap()
            if(that.selectedState!="null"){
                d3.select('#boop').property('checked', false);
                that.barChart.updateBar(that.activeYear,that.selectedState);
            }
           
			
        });
    
	}
	
	tooltipRender(data,yearTotalData) {
		let ind;
		for(let i=0;i<34;i++){
            if(data.properties.NAME_1==yearTotalData[i].State)
			{
				ind = i;
				break;
			}
		}
                            
		let text = "<h3>" + data.properties.NAME_1 + "</h3>" + "<p> total:" + yearTotalData[ind].Total + "</p>";
		return text;
    }




}