const buildObj = (obj) => {	
	switch(obj) {
		case 'red':
			plans[0].vertexes.push({ x: 60, y: 0, z: 0 });
			plans[0].vertexes.push({ x: 180, y: 0, z: 0 });
			plans[0].vertexes.push({ x: 60, y: 0, z: 60 });
			plans[0].vertexes.push({ x: 180, y: 0, z: 60 });
			plans[0].color = 'red'
		break;

		case 'blue':
			plans[1].vertexes.push({ x: 0, y: 0, z: 60 });
			plans[1].vertexes.push({ x: 60, y: 0, z: 60 });
			plans[1].vertexes.push({ x: 0, y: 240, z: 60 });
			plans[1].vertexes.push({ x: 60, y: 240, z: 60 });
			plans[1].color = 'blue'
		break;

		case 'yellow':			
			plans[2].vertexes.push({ x: 60, y: 0, z: 0 });
			plans[2].vertexes.push({ x: 60, y: 240, z: 0 });
			plans[2].vertexes.push({ x: 60, y: 0, z: 60 });
			plans[2].vertexes.push({ x: 60, y: 240, z: 60 });
			plans[2].color = 'yellow'
		break;

		case 'cyan':
			plans[3].vertexes.push({ x: 120, y: 0, z: 0 });
			plans[3].vertexes.push({ x: 60, y: 240, z: 0 });
			plans[3].vertexes.push({ x: 120, y: 0, z: 60 });
			plans[3].vertexes.push({ x: 60, y: 240, z: 60 });
			plans[3].color = 'cyan'
		break;

		case 'green':
			plans[4].vertexes.push({ x: 0, y: 240, z: 0 });
			plans[4].vertexes.push({ x: 60, y: 240, z: 0 });
			plans[4].vertexes.push({ x: 0, y: 240, z: 60 });
			plans[4].vertexes.push({ x: 60, y: 240, z: 60 });
			plans[4].color = 'green'
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
	for(let i = 0; i < obj.spots.length; i++) {
		let vertex = {
			x: parseInt(obj.spots[i].x),
			y: parseInt(obj.spots[i].y),
			z: parseInt(obj.spots[i].z)
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

const mpMatrix = (spot, transMatrix) => {
	let spots = [];
	for(let i = 0; i < transMatrix[0].length; i++) {
		spots[i] = 0;
		for(let j = 0; j < transMatrix.length; j++) {
			spots[i] += spot[j] * transMatrix[j][i];
		}
	}
	return spots;
}

const buildPlans = (objs) => {
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

const interpolation = (plan) => {
	for (let u = 0; u <= 1; u += 0.002) {
    for (let v = 0; v <= 1; v += 0.002) {
      let spot = {
        x: (1 - u) * (1 - v) * plan.vertexes[0].x +
          (1 - u) * v * plan.vertexes[1].x +
          u * (1 - v) * plan.vertexes[2].x +
          u * v * plan.vertexes[3].x,
        y: (1 - u) * (1 - v) * plan.vertexes[0].y +
          (1 - u) * v * plan.vertexes[1].y +
          u * (1 - v) * plan.vertexes[2].y +
          u * v * plan.vertexes[3].y,
        z: (1 - u) * (1 - v) * plan.vertexes[0].z +
          (1 - u) * v * plan.vertexes[1].z +
          u * (1 - v) * plan.vertexes[2].z +
          u * v * plan.vertexes[3].z,
      }
      plan.spots.push(spot);
    }
  }
}

const rotate = (rad, spots, axis) => {
	let transMatrix;
	switch(axis) {
		case 'X':
			transMatrix = [
				[1, 0, 0, 0], 
				[0, Math.cos(rad), -Math.sin(rad), 0], 
				[0, Math.sin(rad), Math.cos(rad), 0], 
				[0, 0, 0, 1]
			];
		break;

		case 'Y':
			transMatrix = [
				[Math.cos(rad), 0, Math.sin(rad), 0], 
				[0, 1, 0, 0], 
				[-Math.sin(rad), 0, Math.cos(rad), 0], 
				[0, 0, 0, 1]
			];
		break;

		case 'Z':
			transMatrix = [
				[Math.cos(rad), -Math.sin(rad), 0, 0], 
				[Math.sin(rad), Math.cos(rad), 0, 0], 
				[0, 0, 1, 0], 
				[0, 0, 0, 1]
			];
		break;
	}

	for (let i = 0; i < spots.length; i++) {
    let vertexes = [];
    vertexes = mpMatrix([spots[i].x, spots[i].y, spots[i].z, 1], transMatrix);
    spots[i].x = vertexes[0];
    spots[i].y = vertexes[1];
    spots[i].z = vertexes[2];
  }
}

const clear = () => {
	context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.restore();
}