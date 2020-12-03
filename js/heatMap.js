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
class Map {
    constructor(data) {
        this.projection = d3.geoCylindricalEqualArea().scale(1200, 1200).translate([-900, 900]);
        this.suicides = data.suicides;
        this.Total = data.Total
        this.data = data;
        this.activeYear = 2002;
        this.selectedState = "null";
        this.barChart = new Bar(this.data);
        this.lineChart = new Liney(this.data);
        this.draw_Scroll();
        this.storyTell();

    }

    drawMap(world) {

        d3.selectAll("#bar-plot").classed("hidden", true);
        d3.selectAll("#selection").classed("hidden", true);
        d3.selectAll("#line-plot").classed("hidden", true);
        let mapchart = d3.select("#map-chart").append("svg");
        let mapLayer = mapchart.append("g").attr("id", "mapLayer");
        let that = this;
        //let barChart = new Bar(this.data);



        let mapBrew = ['#2d0000', '#6e0014', '#b60016', '#ff0000', '#ff7d39', '#ffb980', '#ffe4c6'];
        let mapRange = [30, 25, 20, 15, 10, 5, 0];

        //       var keys=[10000-12000,8000-10000,6000-8000,4000-6000,2000-4000,0-2000,0]

        let yearTotalData = that.data.Total.filter(d => d.Year == this.activeYear);

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        //Drawing the map   
        let Gpath = d3.geoPath().projection(this.projection);
        this.barChart.drawBar(that.activeYear, "Karnataka");
        this.lineChart.drawLine(that.activeYear, "Karnataka");
        var svg = d3.select("#mapLayer")

        // Handmade legend
        svg.append("text").text("% of suicides").attr("x", 50).attr("y", 110).style("font-size", "15px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        // svg.append("text").text("committed by population").attr("x", 30).attr("y", 115).style("font-size", "15px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline","right")

        // svg.append("circle").attr("cx",100).attr("cy",140).attr("r", 6).style("fill", "#2d0000")
        svg.append("rect").attr("x", 90).attr("y", 130).attr("width", 20).attr("height", 20).style("fill", "#2d0000");
        svg.append("text").attr("x", 112).attr("y", 134).text("35").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        // svg.append("circle").attr("cx",100).attr("cy",160).attr("r", 6).style("fill", "#6e0014")
        svg.append("rect").attr("x", 90).attr("y", 150).attr("width", 20).attr("height", 20).style("fill", "#6e0014");
        svg.append("text").attr("x", 112).attr("y", 154).text("30").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        // svg.append("circle").attr("cx",100).attr("cy",180).attr("r", 6).style("fill", "#b60016")
        svg.append("rect").attr("x", 90).attr("y", 170).attr("width", 20).attr("height", 20).style("fill", "#b60016");
        // svg.append("circle").attr("cx",100).attr("cy",200).attr("r", 6).style("fill", "#ff0000")
        svg.append("rect").attr("x", 90).attr("y", 190).attr("width", 20).attr("height", 20).style("fill", "#ff0000");
        svg.append("text").attr("x", 112).attr("y", 174).text("25").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        svg.append("text").attr("x", 112).attr("y", 194).text("20").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        // svg.append("circle").attr("cx",100).attr("cy",220).attr("r", 6).style("fill", "#ff7d39")
        svg.append("rect").attr("x", 90).attr("y", 210).attr("width", 20).attr("height", 20).style("fill", "#ff7d39");
        // svg.append("circle").attr("cx",100).attr("cy",240).attr("r", 6).style("fill", "#ffb980")
        svg.append("rect").attr("x", 90).attr("y", 230).attr("width", 20).attr("height", 20).style("fill", "#ffb980");
        svg.append("text").attr("x", 112).attr("y", 214).text("15").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        svg.append("text").attr("x", 112).attr("y", 234).text("10").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")

        // svg.append("circle").attr("cx",100).attr("cy",260).attr("r", 6).style("fill", "#ffe4c6")
        svg.append("rect").attr("x", 90).attr("y", 250).attr("width", 20).attr("height", 20).style("fill", "#ffe4c6");
        svg.append("text").attr("x", 112).attr("y", 254).text("5").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")
        svg.append("text").attr("x", 112).attr("y", 274).text("0").style("font-size", "10px").attr("font-family", "BioRhyme, serif").attr("alignment-baseline", "right")

        mapLayer.selectAll("path")
            .data(world.features)
            .enter()
            .append("path")
            .attr("d", Gpath)
            .attr("class", function(d) {
                let cname = d.properties.NAME_1;
                return cname.split(" ").join("");
            })
            .style("stroke", "white")
            .style("stroke-width", "0.6")
            // Coloring for the heatmap
            .style("fill", function(d) {

                for (let i = 0; i < yearTotalData.length; i++) {
                    //console.log(yearTotalData);

                    if (d.properties.NAME_1 == yearTotalData[i].State) {


                        var colors = mapBrew,
                            range = mapRange;

                        return yearTotalData[i].Percentage > range[0] ? colors[0] :
                            yearTotalData[i].Percentage > range[1] ? colors[1] :
                            yearTotalData[i].Percentage > range[2] ? colors[2] :
                            yearTotalData[i].Percentage > range[3] ? colors[3] :
                            yearTotalData[i].Percentage > range[4] ? colors[4] :
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
                div.html(that.tooltipRender(d, yearTotalData))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("click", function(d) {

                if (that.selectedState != "null") {
                    let temp = that.selectedState.split(" ").join("");
                    let selstate = d3.select("." + temp);
                    selstate.classed("highlightstate", false);
                }
                that.selectedState = d.properties.NAME_1;
                let classname = d.properties.NAME_1

                let selstate = d3.select("." + classname.split(" ").join(""));
                selstate.classed("highlightstate", true);
                d3.selectAll("#Information").classed("hidden", true);
                d3.selectAll("#bar-plot").classed("hidden", false);
                d3.selectAll("#selection").classed("hidden", false);
                d3.selectAll("#line-plot").classed("hidden", false);
                d3.select('#selected-state').text(that.selectedState);
                d3.select('#boop').property('checked', false);
                that.barChart.updateBar(that.activeYear, d.properties.NAME_1)
                d3.select('.select').property('value', "Select");
                that.lineChart.updateLine(that.activeYear, d.properties.NAME_1);
            });




        //Story Telling



    }

    updateMap() {


        let that = this;
        let mapLayer = d3.selectAll("#mapLayer");

        let mapBrew = ['#2d0000', '#6e0014', '#b60016', '#ff0000', '#ff7d39', '#ffb980', '#ffe4c6'];
        let mapRange = [30, 25, 20, 15, 10, 5, 0];


        let yearTotalData = that.data.Total.filter(d => d.Year == this.activeYear);

        //remove tooltip

        d3.selectAll(".tooltip").remove();

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        mapLayer.selectAll("path")
            .style("fill", function(d) {
                for (let i = 0; i < yearTotalData.length; i++) {
                    if (d.properties.NAME_1 == yearTotalData[i].State) {

                        var colors = mapBrew,
                            range = mapRange;

                        return yearTotalData[i].Percentage > range[0] ? colors[0] :
                            yearTotalData[i].Percentage > range[1] ? colors[1] :
                            yearTotalData[i].Percentage > range[2] ? colors[2] :
                            yearTotalData[i].Percentage > range[3] ? colors[3] :
                            yearTotalData[i].Percentage > range[4] ? colors[4] :
                            yearTotalData[i].Percentage > range[5] ? colors[5] :
                            colors[6];

                    }

                }
            })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(that.tooltipRender(d, yearTotalData))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })




    }

    draw_Scroll() {
        // Working on the year scroll
        d3.select('#map-chart')
            .append('div').attr('id', 'activeYear-bar');


        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([2001, 2012]).range([0, 700]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .attr("width", 600)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 2001)
            .attr('max', 2012)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg')
            .attr("height", 30);

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        sliderText.attr('x', yearScale(this.activeYear) + 30);
        sliderText.attr('y', 25);

        yearSlider.on('input', function() {
            sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value) + 30);
            that.activeYear = this.value;
            that.updateMap()
            if (that.selectedState != "null") {
                d3.select('#boop').property('checked', false);
                that.barChart.updateBar(that.activeYear, that.selectedState)
                that.lineChart.updateLine(that.activeYear, that.selectedState);

            }

        });

    }

    tooltipRender(data, yearTotalData) {
        let ind;
        for (let i = 0; i < yearTotalData.length; i++) {
            if (data.properties.NAME_1 == yearTotalData[i].State) {
                ind = i;
                break;
            }
        }

        let text = "<h3>" + data.properties.NAME_1 + "</h3>" + "<p> total:" + yearTotalData[ind].Total + "</p>";
        return text;
    }

    storyTell() {


        let entirebody = d3.select("body")
            .insert("div")

            .style("opacity", 0)
            .attr("id", "entirebody")
            // .attr("x",30)
            // .attr("y",40)
            .style("background-color", "white")
            .style("top", 0)
            .style("left", 0)
            .attr("class", "div5")
            .style("position", "absolute")
            .style("height", 1800)
            .style("width", 1800)
            .classed("hidden", true);



        let button = d3.select("#Story");



        button.on("click", function(d) {

            console.log("in story");

            entirebody.style("opacity", 0)
                .html("story")
                .classed("hidden", false);

            let storytext2 = "<h3> Least suicide rate </h3>" + "<p> State: Uttar Pradesh </p>" + "<p> Population: 199812</p>" + "<p> Suicide Rate: 2%</p>"
            let tooltip2 = d3.select("body")
                .append("div")
                .attr("class", "story-tooltip")
                .style("left", 620 + "px")
                .style("top", -380 + "px")
                .style("position", "relative")
                .attr("id", "tooltip1")
                .html(storytext2);


            let storytext3 = "<h3> Highest suicide rate </h3>" + "<p> Name: Kerala </p>" + "<p> Population: 33406</p>" + "<p> Suicide Rate: 29%</p>"
            let tooltip3 = d3.select("body")
                .append("div")
                .attr("class", "story-tooltip")
                .style("left", 50 + "px")
                .style("top", -615 + "px")
                .attr("id", "tooltip3")
                .html(storytext3);

            let linesvg1 = d3.select("body")
                .append("svg")
                .attr("height", 100 + "px")
                .attr("class", "lines")
                .attr("width", 300 + "px")
                .style("left", 100 + "px")
                .style("top", -790 + "px")
                .style("position", "relative");

            let lData1 = [{
                "x": 70,
                "y": 5
            }, {
                "x": 70,
                "y": 50
            }, {
                "x": 250,
                "y": 50
            }];

            let linepath1 = linesvg1.append("path")
                .data([lData1])
                .attr("d", d3.line()
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    }))
                // .interpolate("linear")
                .attr("stroke", "#003f5ca1")
                .attr("stroke-width", 3)
                .attr("fill", "none");

            let totalLength1 = linepath1.node().getTotalLength();
            linepath1
                .attr("stroke-dasharray", totalLength1 + " " + totalLength1)
                .attr("stroke-dashoffset", totalLength1)
                .transition()
                .duration(2000)
                .attr("stroke-dashoffset", 0);



            let linesvg2 = d3.select("body")
                .append("svg")
                .attr("height", 270 + "px")
                .attr("class", "lines")
                .attr("width", 380 + "px")
                .style("left", 120 + "px")
                .style("top", -1058 + "px")
                .style("position", "relative");

            let lData2 = [{
                "x": 300,
                "y": 235
            }, {
                "x": 300,
                "y": 40
            }, {
                "x": 40,
                "y": 40
            }, {
                "x": 40,
                "y": 70
            }];
            let linepath2 = linesvg2.append("path")
                .data([lData2])
                .attr("d", d3.line()
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    }))
                // .interpolate("linear")
                .attr("stroke", "#003f5ca1")
                .attr("stroke-width", 3)
                .attr("fill", "none");

            let totalLength2 = linepath2.node().getTotalLength();
            linepath2
                .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
                .attr("stroke-dashoffset", totalLength2)
                .transition()
                .duration(2000)
                .attr("stroke-dashoffset", 0);
        });


        entirebody.on("click", function(d) {

                entirebody.classed("hidden", true);
                d3.selectAll("#tooltip1").classed("hidden", true);
                d3.selectAll("#tooltip3").classed("hidden", true);
                d3.selectAll(".lines").classed("hidden", true);

            }

        )

    }

}