// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  }; 

var chWidth = svgWidth - margin.left - margin.right;
var chHeight = svgHeight - margin.top - margin.bottom;

// Do a function calling the data and append it
d3.csv("data.csv").then(function(D3Data) {
  console.log(D3Data);
  D3Data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

// Create SVG element
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append and add margin
var chGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xScale=d3.scaleLinear()
              .domain([6, d3.max(D3Data, d=> d.poverty)])
              .range([0, chWidth]);

var yScale = d3.scaleLinear()
              .domain([3, d3.max(D3Data, d => d.healthcare)])
              .range([chHeight,0]);

var yAxis = d3.axisLeft(yScale); 
var xAxis = d3.axisBottom(xScale).ticks();

chGroup.append("g")
  .attr("transform", `translate(0, ${chHeight})`)
  .call(xAxis);

chGroup.append("g")
  .call(yAxis);

// Add circle
chGroup.selectAll("circle")
      .data(D3Data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r",8)
      .style("fill", "#F98800")
      .attr("opacity",'.7');
      
 // Add state to each circle
  chGroup.selectAll("#scatter")
    .data(D3Data)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare)) 
    .attr("font-size", "7px")
    .attr("text-anchor", "middle")
    .style("fill", "white");

  chGroup.append("g")
    .attr("transform", `translate(${chWidth/2}, ${chHeight+20})`);

  chGroup.append("text")
    .attr("y", chartHeight +1.5 * margin.bottom/2)
    .attr("x", chartWidth/ 2)
    .classed("axis-text", true)
    .text("In Poverty (%)");

  chGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");
});




