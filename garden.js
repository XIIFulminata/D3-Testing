var tomatoes = [
{"width":25,"height":71,"color":"red"},
{"width":25,"height":78,"color":"red"},
{"width":25,"height":65,"color":"red"},
{"width":25,"height":90,"color":"red"},
{"width":25,"height":63,"color":"red"},
{"width":25,"height":96,"color":"red"},
{"width":25,"height":77,"color":"red"},
{"width":25,"height":82,"color":"red"},
{"width":25,"height":75,"color":"red"},
{"width":25,"height":75,"color":"red"},
{"width":25,"height":69,"color":"red"},
{"width":25,"height":79,"color":"red"},
{"width":25,"height":93,"color":"red"},
{"width":25,"height":75,"color":"red"},
{"width":25,"height":69,"color":"red"},
{"width":25,"height":87,"color":"red"},
{"width":25,"height":62,"color":"red"},
{"width":25,"height":61,"color":"red"},
{"width":25,"height":94,"color":"red"},
{"width":25,"height":79,"color":"red"},
]


var w= 535;
var h= 250;
var svg= d3.select('svg')
    //.append('svg')
    .attr('width', w)
    .attr('height', h);

svg.selectAll('rect.colorBar')
    .data(tomatoes)
    .enter()
    .append('rect')
    .attr('width', function(d,i){
        return d.width
    })
    .attr('height', function(d,i){
        return d.height*2
    })
    .attr('x', function(d,i){
        return i * (d.width+2)
    })
    .attr('y', function(d,i){
        return h - d.height*2
    })
    .attr('fill', 'red')