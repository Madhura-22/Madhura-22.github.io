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
    }

}
class Map{
    constructor(data) {
        this.projection = d3.geoCylindricalEqualArea().scale(1000,1000).translate([-600, 800]);
        this.suicides = data.suicides;
        this.Total=data.Total
        this.data=data;
		this.activeYear = 2002;
        this.selectedState="null";
        this.barChart = new Bar(this.data);
        this.lineChart = new Liney(this.data);
		this.draw_Scroll();
        this.storyTell();
     
    }

    drawMap(world) {
       
		
		let mapchart = d3.select("#map-chart").append("svg");
		let mapLayer=mapchart.append("g").attr("id","mapLayer");
		let that=this;
		//let barChart = new Bar(this.data);

		
		
		let mapBrew =['#2d0000', '#6e0014', '#b60016', '#ff0000', '#ff7d39', '#ffb980', '#ffe4c6'];
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
        this.lineChart.drawLine(that.activeYear,"Karnataka");
        var svg = d3.select("#mapLayer")

        // Handmade legend
       
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
					.attr("class", function(d){let cname = d.properties.NAME_1; return cname.split(" ").join("");})
					.style("stroke", "white")
					.style("stroke-width", "0.6")
					// Coloring for the heatmap
                    .style("fill",function(d){ 

                        for(let i=0;i<yearTotalData.length;i++){
						//console.log(yearTotalData);

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
						
						if(that.selectedState!= "null")
						{
							let temp =  that.selectedState.split(" ").join("");
							let selstate = d3.select("."+ temp);
							selstate.classed("highlightstate", false);
						}
						that.selectedState=d.properties.NAME_1;
						let classname = d.properties.NAME_1
						
						let selstate = d3.select("."+classname.split(" ").join("") );
						selstate.classed("highlightstate", true);
						
						d3.select('#boop').property('checked', false);
						that.barChart.updateBar(that.activeYear,d.properties.NAME_1)
						d3.select('.select').property('value',"Select");
						that.lineChart.updateLine(that.activeYear,d.properties.NAME_1);
					});




    //Story Telling


    
    }
	
	updateMap() {
       
		
		let that = this;
		let mapLayer=d3.selectAll("#mapLayer");
		
		let mapBrew =['#2d0000', '#6e0014', '#b60016', '#ff0000', '#ff7d39', '#ffb980', '#ffe4c6'];
		let mapRange = [30,25,20,15,10,5,0]; 


		let yearTotalData=that.data.Total.filter(d=>d.Year==this.activeYear);
		
		//remove tooltip

        d3.selectAll(".tooltip").remove();

        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

        mapLayer.selectAll("path")
				.style("fill",function(d){ 
					for(let i=0;i<yearTotalData.length;i++){
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
        let yearScale = d3.scaleLinear().domain([2001, 2012]).range([0, 500]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .attr("width",600)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 2001)
            .attr('max', 2012)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg')
            .attr("height",30);

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
                that.barChart.updateBar(that.activeYear,that.selectedState)
                that.lineChart.updateLine(that.activeYear,that.selectedState);
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

    storyTell(){


        let entirebody = d3.select("body")
        .insert("div")

          .style("opacity", 0)
          .attr("id","entirebody")
          // .attr("x",30)
        // .attr("y",40)
          .style("background-color", "white")
          .style("top",0)
          .style("left",0)
          .attr("class","div5")
          .style("position","absolute")
          .style("height",900)
          .style("width",1800)
          .classed("hidden",true);

        

        let button= d3.select("#Story");



        button.on("click",function(d){

            console.log("in story");

             entirebody.style("opacity",0.5)
                      .html("story")
                      .classed("hidden",false);

            let tooltip1 = d3.select("body")
            .append("div")
             .style("opacity", 0)
              
              .style("background-color", "blue")
              .style("border-radius", "5px")
              .style("padding", "20px")
             
              .attr("style", "outline: solid black;")
              
              .style("left",520+ "px")     
               .style("width",800+ "px")
              .style("top",  -740 + "px")
              .style("position","relative")
              .style("color", "black")
              .attr("id","tooltip1")
              .html("This visualization allows you to explore all these relations, we hope the information will allow viewers to recognize the importance of mental health and help themselves and people around them. 800-273-8255 and  1800 233 3330  are suicide prevention hotlines in the US and India respectively. Help is available.");


             let tooltip2 = d3.select("body")
            .append("div")
             // .attr("class", "tooltip")
              .style("background-color", "green")
              .style("border-radius", "5px")
              .style("padding", "10px")
              .attr("style", "outline: solid black;")
              .style("left",620+ "px")     
              .style("width",140+"px")
              .style("top",  -500 + "px")
              .style("position","relative")
              .style("color", "black")
              .attr("id","tooltip1")
              .html("Among states with a population greater than 10,000 people Kerala had the least suicide rates(2%)");


               let tooltip3 = d3.select("body")
            .append("div")
             //.style("opacity", 0)
             // .attr("class", "tooltip")
              .style("background-color", "red")
              .style("border-radius", "5px")
              .style("padding", "10px")
              
              .attr("style", "outline: solid black;")
              .style("width",140+"px")
              .style("left",140+ "px")     
              .style("top",  -350 + "px")
              .style("position","relative")
              .style("color", "black")
              .attr("id","tooltip3")
              .html("Among states with a population greater than 10,000 people Kerala had the worst suicide rates(29%)");

              let line3=d3.select("#tooltip3").append("line")
                      .attr("x1",120)
                      .style("opacity",0)
                      .attr("x2",160)
                      .attr("y1",-300)
                      .attr("y2",-300)
                       .attr('stroke-width', 5)
                     .attr("stroke","black");


            ///d3.select("#tooltip1").classed("hidden",false);

            //entirebody.translate("")

           

            // let lineselect=d3.select("#entirebody");

            // lineselect.append("line")
            //           .attr("x1",444)
            //           .attr("x2",444)
            //           .attr("y1",10)
            //           .attr("y2",500)
            //           .style("stroke","black")
                      
            //           .style("stroke-width",10);


        });


        entirebody.on("click",function(d){

            entirebody.classed("hidden",true);
            d3.selectAll("#tooltip1").classed("hidden",true);
            d3.selectAll("#tooltip3").classed("hidden",true);

        }

    )







       

    }






}