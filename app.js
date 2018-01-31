//Define min and max year in range 
var years = d3.extent(birthData, d=> d.year);

var maxBirths = d3.max(birthData, d => d.births);

//Measurements for svg
var width = 600;
var height = 450;
var padding = 50;

//Measurements for bars
var numBars = 12;
var barPadding = 10;
var barWidth = (width - 50)/numBars - barPadding ;



//Init for y-Axis
var yScale = d3.scaleLinear()
    .domain(d3.extent(birthData, d=> d.births))
    .range([height, 0]);

var yAxis = d3.axisLeft(yScale)
    .tickSize(-width + padding )
    .tickSizeOuter(0);

// Init for x-axis
var xScale = d3.scaleLinear()
    .domain([1,12])
    .range([padding ,width - padding]);

var xAxis = d3.axisBottom(xScale);



//Default value for input
d3.select('input')
    .property('min', years[0])
    .property('max',years[1])
    .property('value', years[0]);


//Bars 
d3.select('svg')
    .attr('width', width)
    .attr('height', height + 40)
    .selectAll('rect')
        .data(birthData.filter(d => d.year === years[0]))
        .enter()
        .append('rect')
            .attr('width', barWidth)
            .attr('height', d => height - yScale(d.births))
            .attr('y', d => yScale(d.births))
            .attr('x', (d,i) => (barWidth + barPadding) *i)
            .attr('fill', 'orangered')
    

//Change year via input and define bars for each year
d3.select('input')
    .on('input', () => {
        var year = +d3.event.target.value;
        d3.select('#year')
            .text(year);
        d3.selectAll('rect')
            .data(birthData.filter( d => d.year === year))
            .attr('height', d => height - yScale(d.births))
            .attr('y', d => yScale(d.births));
});

//Draw axises
// y-Axis
d3.select('svg')
.append('g')
    .call(yAxis);
// x-Axis
d3.select('svg')
    .append('g')
        .attr("transform", "translate(" + (-barWidth+4) + ", " + (height) + ")")
        .call(xAxis)

//Labels
//for x-Axis
d3.select('svg')
    .append("text")
        .attr('x', (width-padding)/2)
        .attr('y', height + padding/2)
        .attr('dy', "1.5em")
        .style('text-anchor', 'middle')
        .text("Month number")

//for y-Axis
d3.select('svg')
    .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -(height+50) /2)
        .attr('y', -padding)
        .attr('dy', '-1.1em')
        .style('text-ancor', 'middle')
        .text('Births');
//Main Label
d3.select('svg')
    .append('text')
        .attr("x", (width-padding) / 2)
        .attr('y', -10)
        .style('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text("Data of births from 1967 to 2014");