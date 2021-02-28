const buildObj = (obj) => {	
	switch(obj) {
		case 'blue':
			for (let x = 10; x < 30; x++) {
				for (let y = 20; y < 40; y++) {
					let vertex = {
						x: x,
						y: y,
						z: x ** 2 + y
					};
					blueObj.vertexes.push(vertex);
				}
			}
		break;

		case 'red':
			for (let x = 50; x < 100; x++) {
				for (let y = 30; y < 80; y++) {
					let vertex = {
						x: x,
						y: y,
						z: 3 * x - 2 * y + 5
					};
					redObj.vertexes.push(vertex);
				}
			}
		break;

		case 'yellow':			
			for (let x = 0; x < Math.PI * 2; x += 0.01) {				
				for (let y = 0; y < 50; y++) {
					let vertex = {
						x: parseInt(30 + y * Math.cos(x)),
						y: parseInt(50 + y * Math.sin(x)),
        		z: parseInt(10 * y)
					};					
					yellowObj.vertexes.push(vertex);
				}
			}
		break;

		case 'green':
			for (let x = 0; x < Math.PI * 2; x += 0.01) {
				for (let y = 0; y < Math.PI * 2; y += 0.01) {
					let vertex = {
						x: parseInt(100 + 30 * Math.cos(x) * Math.cos(y)),
						y: parseInt(50 + 30 * Math.cos(x) * Math.sin(y)),
						z: parseInt(20 + 30 * Math.sin(x))
					};
					greenObj.vertexes.push(vertex);
				}
			}
		break;

		case 'white':
			for (let x = -20; x < 20; x++) {
				for (let y = -20; y < 20; y++) {
					for (let z = -20; z < 20; z++) {
						let vertex = {
							x: x,
							y: y,
							z: z
						}
						whiteObj.vertexes.push(vertex);
					}
				}
			}
		break;
	}
}

const startBuffer = () => {
	for (let x = 0; x < canvas.width; x++) {
    buffer[x] = [];
    for (let y = 0; y < canvas.height; y++) {
      buffer[x][y] = { ZMax: -Infinity, color: 'black' };
    }
  }
}

const compare = (obj) => {
	for(let i = 0; i < obj.vertexes.length; i++) {
		let vertex = {
			x: obj.vertexes[i].x,
			y: obj.vertexes[i].y,
			z: obj.vertexes[i].z
		};

		if(vertex.z > buffer[vertex.x+middle.x][-vertex.y+middle.y].ZMax) {
			buffer[vertex.x+middle.x][-vertex.y+middle.y].ZMax = vertex.z;
			buffer[vertex.x+middle.x][-vertex.y+middle.y].color = obj.color;
		}
	}
}

const paint = () => {
	for (let x = 0; x < buffer.length; x++) {
    for (let y = 0; y < buffer[0].length; y++) {
      context.fillStyle = buffer[x][y].color;
      context.fillRect(x, y, 1, 1);
    }
  }
  context.fillStyle = 'black';
}

const buildObjOnScreen = (objs) => {
	if(objs.blue)
		buildObj('blue');
	if(objs.red)
		buildObj('red');
	if(objs.yellow)
		buildObj('yellow');	
	if(objs.green) 
		buildObj('green');	
	if(objs.white)
		buildObj('white');	

	startBuffer();

	compare(blueObj);
	compare(redObj);
	compare(yellowObj);
	compare(greenObj);
	compare(whiteObj);

	paint();
}