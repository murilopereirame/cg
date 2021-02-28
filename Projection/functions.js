const projection = (obj, type) => {
	let spots = Array(Array());
	let projectionMatrix;

	switch(type) {
		case 'ortogonal':
			projectionMatrix  = [
				[1, 0, 0, 0], 
				[0, 1, 0, 0], 
				[0, 0, 0, 0], 
				[0, 0, 0, 1]
			];
		break;

		case 'cavaleira':
			projectionMatrix = [
				[1, 0, 0, 0], 
				[0, 1, 0, 0], 
				[Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0, 0], 
				[0, 0, 0, 1]
			]
		break;

		case 'cabinet':
			projectionMatrix = [
				[1, 0, 0, 0], 
				[0, 1, 0, 0], 
				[0.4477 / 2, 0.8941 / 2, 0, 0], 
				[0, 0, 0, 1]
			]
		break;
	}

	for(let i = 0; i < obj.vertexes.length; i++) {
		spots.push(mpMatrix(obj.vertexes[i], projectionMatrix));
	}

	return spots;
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

const transform = (dx, dy, dz, spots, type) => {
	let newSpots = Array(Array());
	let transMatrix;

	switch(type) {
		case 'translate':
			transMatrix = [
				[1, 0, 0, dx], 
				[0, 1, 0, dy], 
				[0, 0, 1, dz], 
				[0, 0, 0, 1]
			];
		break;

		case 'scale':
			transMatrix = [
				[dx, 0, 0, 0], 
				[0, dy, 0, 0], 
				[0, 0, dz, 0]
			];
		break;
	}

	for(let i = 0; i < spots.length; i++)
		newSpots[i] = mpMatrix(spots[i], transMatrix);

	return newSpots;
}

const rotate = (radian, spots, axis) => {
	let newSpots = Array(Array());
	let transMatrix;

	switch(axis) {
		case 'X':
			transMatrix = [
				[1, 0, 0, 0], 
				[0, Math.cos(radian), -Math.sin(radian), 0], 
				[0, Math.sin(radian), Math.cos(radian), 0], 
				[0, 0, 0, 1]
			];
		break;

		case 'Y':
			transMatrix = [
				[Math.cos(radian), 0, Math.sin(radian), 0], 
				[0, 1, 0, 0], 
				[-Math.sin(radian), 0, Math.cos(radian), 0], 
				[0, 0, 0, 1]
			];
		break;

		case 'Z':
			transMatrix = [
				[Math.cos(radian), -Math.sin(radian), 0, 0], 
				[Math.sin(radian), Math.cos(radian), 0, 0], 
				[0, 0, 1, 0], 
				[0, 0, 0, 1]
			];
		break;
	}

	for(let i = 0; i < spots.length; i++)
		newSpots[i] = mpMatrix(spots[i], transMatrix);

	return newSpots;
}

const bshLine = (start, end) => {
	let dx = Math.abs(end.x - start.x);
	let dy = Math.abs(end.y - start.y);
	let m = (end.y - start.y) / (end.x - start.x);
	
	let actual = { x: 0, y: 0 };

	if (dx > dy) {
		actual.x = start.x;
		if (start.x <= end.x) {
			let limit = end.x + 1;
			while (actual.x < limit) {
				actual.y = parseInt(m * (actual.x - start.x) + start.y); 
				context.fillRect(actual.x, actual.y, 1, 1);
				actual.x++;
			}
		} else {
			while (actual.x > end.x) {
				actual.y = parseInt(m * (actual.x - start.x) + start.y);          
				context.fillRect(actual.x, actual.y, 1, 1);
				actual.x--;
			}
		}
	} else {
		actual.y = start.y;
		let limit = end.y + 1;
		if (start.y < limit) {
			while (actual.y <= end.y) {
				actual.x = (actual.y - start.y) / m + start.x;         
				context.fillRect(actual.x, actual.y, 1, 1);
				actual.y++;
			}
		} else {
			while (actual.y > end.y) {
				actual.x = (actual.y - start.y) / m + start.x;
				context.fillRect(actual.x, actual.y, 1, 1);
				actual.y--;
			}
		}
	}
}

const paint = (type) => {	
	let localProjection;
  
	localProjection = projection(projectionObject, type);
  
	for (let i = 0; i < projectionObject.lines.length; i++) {
    start.x = localProjection[projectionObject.lines[i][0] + 1][0];
    start.y = localProjection[projectionObject.lines[i][0] + 1][1];
    end.x = localProjection[projectionObject.lines[i][1] + 1][0];
    end.y = localProjection[projectionObject.lines[i][1] + 1][1];
    bshLine(start, end);
  }
}

const clear = () => {
	context.save();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.restore();
}

const applyScale = (X, Y, Z) => {
	projectionObject.vertexes = transform(X,Y,Z, projectionObject.vertexes, 'scale');
	clear();
	paint(type);
}

const applyTranslation = (X, Y, Z) => {	
	projectionObject.vertexes = transform(X,Y,Z, projectionObject.vertexes, 'translate');
	clear();
	paint(type);
}

const applyRotate = (RAD, axis) => {
	if(isNaN(RAD)) {
		alert('Insira um valor válido para rotação!');
		return;
	}

	if(axis.toUpperCase() === 'X')
		projectionObject.vertexes = rotate(RAD, projectionObject.vertexes, 'X');
	else if(axis.toUpperCase() === 'Y')
		projectionObject.vertexes = rotate(RAD, projectionObject.vertexes, 'Y');
	else if(axis.toUpperCase() === 'Z')
		projectionObject.vertexes = rotate(RAD, projectionObject.vertexes, 'Z');
	else {alert('Eixo inválido!\nVálidos: X, Y, Z'); return;}

	clear();
	paint(type);
}