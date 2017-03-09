//data from http://www.nasdaq.com/symbol/fb/historical

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//date format is m/d/yyyy -> mm/dd/yyyy =>
//%m - month as a decimal number [01,12].
//%d - zero-padded day of the month as a decimal number [01,31].
//%y - year without century as a decimal number [00,99].
var parseTime = d3.timeParse("%m/%d/%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

d3.csv("fb_5year.csv", function(d) {
  d.date = parseTime(d.date);
  d.close = +d.close;
  d.volume = +d.volume;
  d.high = +d.high;    
  d.low = +d.low;    
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.low; }));
   // y.domain(d3.extent(data, function(d) { return d.high; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      //translates x axis labels to bottom
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)") //turns axis label vertical
      .attr("y", 6) //label spacing from axis line
      .attr("dy", "0.71em") //label spacing from axis line
      .attr("text-anchor", "end")
      .text("Stock Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});