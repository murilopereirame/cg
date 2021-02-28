let canvas;
let context;
let paintingRegion;
let pStyle;
let pointer = { x: 0, y: 0 };
let first = { x: 0, y: 0 };
let last = { x: 0, y: 0 };
let tap = 0;
let limits = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
let coordinates = {
    XMin: undefined,
    XMax: undefined,
    YMin: undefined,
    YMax: undefined
}

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
    context.lineWidth = 1;
    write = true;
}

$("#canvas").mousemove(function(event) {
    pointer.x = event.pageX - this.offsetLeft;
    pointer.y = event.pageY - this.offsetTop;
});

$("#canvas").click(function(event) {
    HandleClick();
});