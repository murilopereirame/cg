let canvas;
let context;
let paintingRegion;
let pStyle;

let type = 'spot';

let ball;
let plan;
let light;
let viewer;

let buffer = [];

const Init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));

    light = {
        spot: [canvas.width / 2 + 100, canvas.height / 2, 100],
        ia: 0.5,
        il: 0.7,
        ka: 0.5
    };

    viewer = {
        spot: [canvas.width / 2, canvas.height / 2, 100]
    };

    plan = {
        start: [0, 0, 0],
        end: [100, 100, 0],
        vertexes: [],
        color: [0, 0, 255],
        kd: 0.7,
        ks: 0.4
    };

    ball = {
        middle: [canvas.width / 2, canvas.height / 2, 0],
        vertexes: [],
        radius: 50,
        color: [255, 0, 255],
        kd: 0.3,
        ks: 0.8
    };

    buildObjOnScreen();
}

$('input:radio[name="op"]').change((e) => {
    type = e.target.value;
    Init();
});