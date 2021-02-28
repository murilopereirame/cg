let canvas;
let context;
let paintingRegion;
let pStyle;
let polygon;
let boundBox;
let write;

$("#canvas").click(function(e) {
    if(!write)
        return;
    let point = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop,
    }
    context.fillStyle = 'red';
    context.fillRect(point.x, point.y, 5, 5);
    polygon.vertexs.push(point);
});

$("#connect").click(function(e) {
    if (polygon.vertexs.length > 2) {
        connectDots(context, polygon, boundBox);
        write = false;
    } else { 
        alert("Insira pelo menos 3 pontos");
    }
});

$("#paint").click(function(e) {
    let last = 0;
    for (let i = 0; i < polygon.sides.length; i++) {
      for (let j = 0; j < polygon.sides[i].length; j++) {
        if (last != polygon.sides[i][j].y) {
            paint(polygon.sides[i][j], boundBox);
        }
        last = polygon.sides[i][j].y;
      }
    }
    showBB(boundBox, context);
    connectDots(context, polygon, boundBox);
});

$("#reset").click(function(e) {
    init();
});


function init() {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));
  
    polygon = {
        vertexs: [],
        sides: []
    }
    
    boundBox = {
        vertexs: [],
        sides: [],
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
    }

    write = true;
}