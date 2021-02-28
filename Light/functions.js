const lightSpot = (spot, color) => {
	let normalVector = [], lightVector = [], newColor = [];
	let cosine, intensity, object;
	
	if (color[0] == 255) {
		normalVector[0] = spot.x - ball.middle[0];
		normalVector[1] = spot.y - ball.middle[1];
		normalVector[2] = spot.z - ball.middle[2];
		object = 0;
	}
	else {
		normalVector = [0, 0, 1];
		object = 1;
	}
	
	lightVector[0] = light.spot[0] - spot.x;
	lightVector[1] = light.spot[1] - spot.y;
	lightVector[2] = light.spot[2] - spot.z;
	
	cosine = ((normalVector[0] * lightVector[0]) + (normalVector[1] * lightVector[1]) + (normalVector[2] * lightVector[2])) /
		((Math.sqrt(Math.pow(normalVector[0], 2) + Math.pow(normalVector[1], 2) + Math.pow(normalVector[2], 2))) *
			(Math.sqrt(Math.pow(lightVector[0], 2) + Math.pow(lightVector[1], 2) + Math.pow(lightVector[2], 2))));
	
			if (object === 0)
		intensity = (light.ia * light.ka) + (light.il * ball.kd * cosine);
	else
		intensity = (light.ia * light.ka) + (light.il * plan.kd * cosine);
	
		newColor[0] = parseInt(color[0] * intensity);
	newColor[1] = parseInt(color[1] * intensity);
	newColor[2] = parseInt(color[2] * intensity);

	return newColor;
}

const specularHighlight = (spot, color) => {
	let normalVector = [], lightVector = [], newColor = [], vS = [], reflectionVector = [];
  let cosineAlfa, cosineTeta, intensity, object, aux;
  if (color[0] == 255) {
    normalVector[0] = spot.x - ball.middle[0];
    normalVector[1] = spot.y - ball.middle[1];
    normalVector[2] = spot.z - ball.middle[2];
    object = 0;
  }
  else {
    normalVector = [0, 0, 1];
    object = 1;
  }
  lightVector[0] = light.spot[0] - spot.x;
  lightVector[1] = light.spot[1] - spot.y;
  lightVector[2] = light.spot[2] - spot.z;

  vS[0] = viewer.spot[0] - spot.x;
  vS[1] = viewer.spot[1] - spot.y;
  vS[2] = viewer.spot[2] - spot.z;

  aux = (normalVector[0] * lightVector[0]) + (normalVector[1] * lightVector[1]) + (normalVector[2] * lightVector[2]);
  for (let i = 0; i < 3; i++) {
    reflectionVector[i] = aux * normalVector[i];
    reflectionVector[i] -= lightVector[i];
  }

  normalVector = standardization(normalVector);
  lightVector = standardization(lightVector);
  vS = standardization(vS);
  reflectionVector = standardization(reflectionVector);

  d = Math.sqrt(Math.pow(spot.x - viewer.spot[0], 2) + Math.pow(spot.y - viewer.spot[1], 2) + Math.pow(spot.z - viewer.spot[2], 2)) / 200;

  cosineTeta = ((normalVector[0] * lightVector[0]) + (normalVector[1] * lightVector[1]) + (normalVector[2] * lightVector[2])) /
    ((Math.sqrt(Math.pow(normalVector[0], 2) + Math.pow(normalVector[1], 2) + Math.pow(normalVector[2], 2))) *
      (Math.sqrt(Math.pow(lightVector[0], 2) + Math.pow(lightVector[1], 2) + Math.pow(lightVector[2], 2))));
  cosineAlfa = ((reflectionVector[0] * vS[0]) + (reflectionVector[1] * vS[1]) + (reflectionVector[2] * vS[2])) /
    ((Math.sqrt(Math.pow(reflectionVector[0], 2) + Math.pow(reflectionVector[1], 2) + Math.pow(reflectionVector[2], 2))) *
      (Math.sqrt(Math.pow(vS[0], 2) + Math.pow(vS[1], 2) + Math.pow(vS[2], 2))));

  if (object === 0)
    intensity = (light.ia * light.ka) + ((light.il / d) * (ball.kd * cosineTeta) + (ball.ks * cosineAlfa ** 50));
  else {
    intensity = (light.ia * light.ka) + ((light.il / d) * (plan.kd * cosineTeta) + (plan.ks * cosineAlfa ** 5));
  }
  newColor[0] = parseInt(color[0] * intensity);
  newColor[1] = parseInt(color[1] * intensity);
  newColor[2] = parseInt(color[2] * intensity);
  return (newColor);
}

const standardization = (vector) => {
	let normVector = norm(vector);
  vector[0] /= normVector;
  vector[1] /= normVector;
  vector[2] /= normVector;
  return vector;
}

const norm  = (spot) => {
	return Math.sqrt(Math.pow(spot[0], 2) + Math.pow(spot[1], 2) + Math.pow(spot[2], 2));
}

const paint = () => {
	console.log(buffer);
	for (let x = 0; x < buffer.length; x++) {
    for (let y = 0; y < buffer[0].length; y++) {
      context.fillStyle = buffer[x][y].color;
      context.fillRect(x, y, 1, 1);
    }
  }
  context.fillStyle = 'black';
}

const compare = (obj) => {
	let newColor = [];

	for(let i = 0; i < obj.vertexes.length; i++) {
		if (obj.vertexes[i].z > buffer[obj.vertexes[i].x][obj.vertexes[i].y].ZMax) {
      buffer[obj.vertexes[i].x][obj.vertexes[i].y].ZMax = obj.vertexes[i].z;
			if(type === 'spot')
      	newColor = lightSpot(obj.vertexes[i], obj.color);
			else
      	newColor = specularHighlight(obj.vertexes[i], obj.color);
      buffer[obj.vertexes[i].x][obj.vertexes[i].y].color = `RGB(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    }
	}
}

const buildObj = (obj) => {
	switch(obj) {
		case 'ball':
			for (let x = -Math.PI / 2; x < Math.PI / 2; x += 0.02) {
				for (let y = -Math.PI; y < Math.PI; y += 0.02) {
					let location = { x: 0, y: 0, z: 0 };
					location.x = parseInt(ball.radius * Math.cos(x) * Math.cos(y) + canvas.width / 2);
					location.y = parseInt(ball.radius * Math.cos(x) * Math.sin(y) + canvas.height / 2);
					location.z = parseInt(ball.radius * Math.sin(x));
					ball.vertexes.push(location);
				}
			}
		break;

		case 'plan':
			for (let i = plan.start[0]; i < plan.end[0]; i++)
				for (let j = plan.start[1]; j < plan.end[1]; j++)
					plan.vertexes.push({ x: parseInt(i + canvas.width / 2), y: parseInt(-j + canvas.height / 2), z: 0 });	
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

const buildObjOnScreen = () => {
	buildObj('ball');
	buildObj('plan');	

	startBuffer();

	compare(ball);
	compare(plan);

	paint();
}