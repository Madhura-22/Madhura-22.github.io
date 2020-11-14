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
		let mapRange = [12000,10000,8000,6000,4000,2000,0]; 

		let yearTotalData=that.data.Total.filter(d=>d.Year==this.activeYear);
		
		// Define the div for the tooltip
		var div = d3.select("body").append("div")   
			.attr("class", "tooltip")               
			.style("opacity", 0);
		
        //Drawing the map 
		let Gpath = d3.geoPath().projection(this.projection);
        this.barChart.drawBar(that.activeYear,"Karnataka");

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

                            return  yearTotalData[i].Total > range[0] ? colors[0] :
                                    yearTotalData[i].Total > range[1] ? colors[1] :
                                    yearTotalData[i].Total > range[2] ? colors[2] :
                                    yearTotalData[i].Total > range[3] ? colors[3] :
                                    yearTotalData[i].Total> range[4] ? colors[4] :
                                    yearTotalData[i].Total > range[5] ? colors[5] :
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
		let mapRange = [12000,10000,8000,6000,4000,2000,0]; 

		let yearTotalData=that.data.Total.filter(d=>d.Year==this.activeYear);
		

        mapLayer.selectAll("path")
				.style("fill",function(d){ 
					for(let i=0;i<34;i++){
					 if(d.properties.NAME_1==yearTotalData[i].State){
						
						var colors=mapBrew,
							 range = mapRange;

						return  yearTotalData[i].Total > range[0] ? colors[0] :
								yearTotalData[i].Total > range[1] ? colors[1] :
								yearTotalData[i].Total > range[2] ? colors[2] :
								yearTotalData[i].Total > range[3] ? colors[3] :
								yearTotalData[i].Total> range[4] ? colors[4] :
								yearTotalData[i].Total > range[5] ? colors[5] :
								colors[6];

						}

					}
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