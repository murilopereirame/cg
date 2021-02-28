let canvas;
let context;
let paintingRegion;
let pStyle;

let type = "line";

let pointer;
let start;
let end;

$("#canvas").mousemove(function(e) {
    pointer.x = e.pageX - this.offsetLeft;
    pointer.y = e.pageY - this.offsetTop;
});

$("#canvas").mousedown(function(e) {
    start.x = pointer.x;
    start.y = pointer.y;    
});

$("#canvas").mouseup(function(e) {
    end.x = pointer.x;
    end.y = pointer.y;

    if(type === "line")
        bshLine(start, end);
    else
        bshRound(start, end);
});

$("#reset").click(function(e) {
    init();
});

$('input:radio[name="op"]').change((e) => {
    type = e.target.value;
});

function init() {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));
  
    pointer = {x: 0, y: 0};

    start = {x: 0, y: 0};

    end = {x: 0, y: 0};
}