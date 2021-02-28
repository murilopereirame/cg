let canvas;
let context;
let paintingRegion;
let pStyle;

let writeCanvas;
let writeContext;
let writePaintingRegion;
let writePStyle;

let middle;

let lastPointer;
let pointer;

let scribble;
let object;

const init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));    

    writeCanvas = $("#writeCanvas")[0]; 
    writeContext = writeCanvas.getContext('2d');
    writePaintingRegion = $("#writeRegion")[0];
    writePStyle = getComputedStyle(writePaintingRegion);
    writeCanvas.width = parseInt(writePStyle.getPropertyValue('width'));
    writeCanvas.height = parseInt(writePStyle.getPropertyValue('height'));
    writeContext.lineWidth = 3;
    writeContext.lineJoin = 'round';
    writeContext.lineCap = 'round';

    middle = {
        x: parseInt(canvas.width/2) - 200,
        y: parseInt(canvas.height/2) - 300
    }

    lastPointer = {x: 0, y: 0};
    pointer = {x: 0, y: 0};

    scribble = [];
    object = [];

    bshLine(
		{
			x: middle.x, y: 0
		}, 
		{
			x: middle.x,
			y: canvas.height
		}
	);
}

$("#reset").click((e) => {
    init();

    $("#writeCanvas").off();
    $("#writeCanvas").mousemove(function(e) {
        pointer.x = e.pageX - this.offsetLeft;
        pointer.y = e.pageY - this.offsetTop;
    });

    $("#writeCanvas").mousedown(function(e) {
        writeContext.beginPath();
        writeContext.moveTo(pointer.x, pointer.y);
        lastPointer = {x: pointer.x, y: pointer.y};
        
        $("#writeCanvas").mousemove(function(e) {
            scribble = scribble.concat(bshLine(lastPointer, pointer));
            lastPointer = { x: pointer.x, y: pointer.y };
        });
    });

    $("#writeCanvas").mouseup(function(e) {
        $("#writeCanvas").off();
        $("#writeCanvas").mousemove(function(e) {
            pointer.x = e.pageX - this.offsetLeft;
            pointer.y = e.pageY - this.offsetTop;
        });
    })
})

$("#draw").click((e) => {
    for (let i in scribble)
      bshRound({
          x: 0, 
          y: scribble[i].y - middle.y 
        }, 
        { 
            x: scribble[i].x - middle.x, 
            y: scribble[i].y - middle.y 
        });
    
    let projectionSpots = cavaleiraProjection(object);

    projectionSpots.map((spot) => {
      spot.x += middle.x;
      spot.y += middle.y;
      return spot;
    })    

    paint(projectionSpots);
})

$("#writeCanvas").mousemove(function(e) {
    pointer.x = e.pageX - this.offsetLeft;
    pointer.y = e.pageY - this.offsetTop;
});

$("#writeCanvas").mousedown(function(e) {
    writeContext.beginPath();
    writeContext.moveTo(pointer.x, pointer.y);
    lastPointer = {x: pointer.x, y: pointer.y};
    
    $("#writeCanvas").mousemove(function(e) {
        scribble = scribble.concat(bshLine(lastPointer, pointer));
        lastPointer = { x: pointer.x, y: pointer.y };
    });
});

$("#writeCanvas").mouseup(function(e) {
    $("#writeCanvas").off();
    $("#writeCanvas").mousemove(function(e) {
        pointer.x = e.pageX - this.offsetLeft;
        pointer.y = e.pageY - this.offsetTop;
    });
});

