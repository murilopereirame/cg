let canvas;
let context;
let paintingRegion;
let pStyle;

let middle;

let buffer = [];
let plans = [];

const init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));
    context.lineWidth = 1;

    buffer = [];
    plans = [];

    middle = {
        x: parseInt(canvas.width/2),
        y: parseInt(canvas.height/2+100)
    }

    for (let i = 0; i < 5; i++) {
			let plan = {
				vertexes: [],
				spots: [],
				color: '',
			}
			plans.push(plan);			
		}

		startBuffer();

		buildObj('red');
		buildObj('blue');
		buildObj('yellow');
		buildObj('cyan');
		buildObj('green');

		for (let i = 0; i < 5; i++) {			
			interpolation(plans[i]);
			rotate(-Math.PI / 9, plans[i].spots, 'X');
			rotate(Math.PI / 9, plans[i].spots, 'Y');
			compare(plans[i]);
		}

		paint();
    //buildPlans();
}

$('body').keypress((e) => {    
	let keyCode = e.keyCode || e.which;
	

	if(
		keyCode === 97 || 
		keyCode === 100 || 
		keyCode === 119 || 
		keyCode === 115 || 
		keyCode === 122 || 
		keyCode === 120
	) {
		clear();
		startBuffer();
	}

	switch(keyCode) {
		case 97:	
			for (let i = 0; i < plans.length; i++) {
				rotate(-Math.PI / 18, plans[i].spots, 'Y');
				compare(plans[i]);
			}			
		break;

		case 100:			
			for (let i = 0; i < plans.length; i++) {
				rotate(Math.PI / 18, plans[i].spots, 'Y');
				compare(plans[i]);
			}			
		break;

		case 119:	
			for (let i = 0; i < plans.length; i++) {
				rotate(Math.PI / 18, plans[i].spots, 'X');
				compare(plans[i]);
			}			
		break;

		case 115:
			for (let i = 0; i < plans.length; i++) {
				rotate(-Math.PI / 18, plans[i].spots, 'X');
				compare(plans[i]);
			}			
		break;

		case 122:			
			for (let i = 0; i < plans.length; i++) {
				rotate(- Math.PI / 18, plans[i].spots, 'Z');
				compare(plans[i]);
			}			
		break;

		case 120:		
			for (let i = 0; i < plans.length; i++) {
				rotate(Math.PI / 18, plans[i].spots, 'Z');
				compare(plans[i]);
			}
		break;
	}
	if(
		keyCode === 97 || 
		keyCode === 100 || 
		keyCode === 119 || 
		keyCode === 115 || 
		keyCode === 122 || 
		keyCode === 120
	) 
		paint(buffer);
});

$("#reset").click((e) => {
	init();
})