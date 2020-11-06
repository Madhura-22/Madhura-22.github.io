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
        // this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.suicides = data.suicides;
        this.Total=data.Total
        console.log(data.Total)
        this.data=data;
     
    }

    drawMap(world) {
       

        console.log("in drawMap");
        let mapchart = d3.select("#map-chart").append("svg");
        let mapLayer=mapchart.append("g").attr("id","mapLayer");
       
        console.log(world);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(this.data.Total[0].State);
       
       let that=this;

         let mapBrew =['rgb(128,0,0)','rgb(178,34,34)','rgb(255,0,0)','rgb(255,69,0)','rgb(255,99,71)','rgb(240,128,128)','rgb(255,160,122)'];

        let mapRange = [12000,10000,8000,6000,4000,2000,0]; 

        //console.log(geoJSON);
         let Gpath = d3.geoPath().projection(this.projection);
        //console.log(Gpath)

        let yearTotalData=that.data.Total.filter(d=>d.Year=="2001");
        console.log("#############################")
        console.log(yearTotalData);

        // Define the div for the tooltip
        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

        console.log("****************************");
        console.log(world.features)
        mapLayer.selectAll("path")
                    .data(world.features)
                    .enter()
                    .append("path")
                    .attr("d", Gpath)

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

                      .on("mouseover", function(d) {      
                            div.transition()        
                                .duration(200)      
                                .style("opacity", .9);      
                            div .html(d.properties.NAME_1)  
                                .style("left", (d3.event.pageX) + "px")     
                                .style("top", (d3.event.pageY - 28) + "px");    
                            })                  
                        .on("mouseout", function(d) {       
                            div.transition()        
                                .duration(500)      
                                .style("opacity", 0);   
                        });

    
    }




}