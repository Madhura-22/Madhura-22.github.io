class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }

}
class Map{
    constructor(data) {
        this.projection = d3.geoCylindricalEqualArea().scale(800,800).translate([-400, 700]);
        // this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.suicides = data.suicides;
     
    }

    drawMap(world) {
       

        console.log("in drawMap");
        let mapchart = d3.select("#map-chart").append("svg");
        let mapLayer=mapchart.append("g").attr("id","mapLayer");
       // console.log(world.objects)
        console.log(world)
        //console.lo(world.objects.IND_adm1.geometries)
       // let geoJSON = topojson.feature(world,world.objects.IND_adm1.geometries);
        //console.log(geoJSON);
         let Gpath = d3.geoPath().projection(this.projection);
        //console.log(Gpath)

        mapLayer.selectAll("path")
                    .data(world.features)
                    .enter()
                    .append("path")
                    .attr("d", Gpath);
                    // .attr("class", d => d.region)
                    // .classed("countries", true)
                    // .classed("boundary", true)
                    // .attr("id", d => d.id);



       
  

    
    }




}