let canvas;
let context;
let paintingRegion;
let pStyle;

let blueObj;
let redObj;
let greenObj;
let yellowObj;
let whiteObj;

let middle;

let buffer = [];
let alloweds = {
    blue: true,
    green: true,
    yellow: true,
    red: true,
    white: true,
};

const init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));
    context.lineWidth = 1;

    blueObj = {
        color: 'blue',
        vertexes: []
    }

    redObj = {
        color: 'red',
        vertexes: []
    }

    yellowObj = {
        color: 'yellow',
        vertexes: []
    }

    whiteObj = {
        color: 'white',
        vertexes: []
    }

    greenObj = {
        color: 'green',
        vertexes: []
    }

    middle = {
        x: parseInt(canvas.width/2),
        y: parseInt(canvas.height/2)
    }

    buildObjOnScreen(alloweds);
}

$("#reset").click((e) => {
    alloweds.blue = false;
    alloweds.green = false;
    alloweds.red = false;
    alloweds.white = false;
    alloweds.yellow = false;
    init();
})

$("#blueOnly").click((e) => {    
    alloweds.blue = true;    
    init();
})

$("#greenOnly").click((e) => {    
    alloweds.green = true;    
    init();
})

$("#redOnly").click((e) => {
    alloweds.red = true;
    init();
})

$("#yellowOnly").click((e) => {    
    alloweds.yellow = true;
    init();
})

$("#greenOnly").click((e) => {    
    alloweds.green = true;
    init();
})

$("#whiteOnly").click((e) => {    
    alloweds.white = true;    
    init();
})

$("#all").click((e) => {
    alloweds.blue = true;
    alloweds.green = true;
    alloweds.red = true;
    alloweds.white = true;
    alloweds.yellow = true;
    init();
})