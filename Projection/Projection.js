let canvas;
let context;
let paintingRegion;
let pStyle;

let type = 'ortogonal';

let start = {x: 0, y: 0};
let end = {x: 0, y: 0};

let projectionObject;

const Init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));

    projectionObject = {
			vertexes: [
				[100, 100, 100, 1],
				[200, 100, 100, 1],
				[100, 200, 100, 1],
				[200, 200, 100, 1],
				[100, 100, 200, 1],
				[200, 100, 200, 1],
				[100, 200, 200, 1],
				[200, 200, 200, 1],
				[150, 100, 250, 1],
				[150, 200, 250, 1]
			],
			lines: [
				[0, 1],
				[1, 3],
				[2, 3],
				[2, 0],
				[4, 5],
				[5, 7],
				[6, 7],
				[6, 4],
				[0, 4],
				[1, 5],
				[2, 6],
				[3, 7],
				[4, 8],
				[8, 5],
				[6, 9],
				[9, 7],
				[8, 9]
			],
    }

		paint(type);
}

$('input:radio[name="type"]').change((e) => {
    type = e.target.value;
    Init();
});

$("#translate").click((e) => {
	let X = parseFloat($("#X").val());
	let Y = parseFloat($("#Y").val());
	let Z = parseFloat($("#Z").val());

	applyTranslation(X, Y, Z);
});

$("#scale").click((e) => {
	let X = parseFloat($("#SX").val());
	let Y = parseFloat($("#SY").val());
	let Z = parseFloat($("#SZ").val());

	applyScale(X, Y, Z);
});

$("#rotate").click((e) => {
	let RAD = parseFloat($("#RAD").val());
	let axis = $("#axis").val();	

	applyRotate(RAD, axis);
})