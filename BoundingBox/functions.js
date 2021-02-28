function bshLine(start, end) {
  let dx = Math.abs(end.x - start.x);
  let dy = Math.abs(end.y - start.y);
  let m = (end.y - start.y) / (end.x - start.x);
  let vertexs = [];
  let actual = { x: 0, y: 0 };

  if (dx > dy) {
    actual.x = start.x;
    if (start.x <= end.x) {
      let limit = end.x + 1;
      while (actual.x < limit) {
        actual.y = parseInt(m * (actual.x - start.x) + start.y);

        if (!(actual.x === end.x && actual.y === end.y)) {
          vertexs.push({ x: actual.x, y: actual.y });
        }

        context.fillRect(actual.x, actual.y, 1, 1);
        actual.x++;
      }
    } else {
      while (actual.x > end.x) {
        actual.y = parseInt(m * (actual.x - start.x) + start.y);
        if (!(actual.x === end.x && actual.y === end.y))
          vertexs.push({ x: actual.x, y: actual.y });
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
        if (!(actual.x === end.x && actual.y === end.y))
          vertexs.push({ x: actual.x, y: actual.y });
        context.fillRect(actual.x, actual.y, 1, 1);
        actual.y++;
      }
    } else {
      while (actual.y > end.y) {
        actual.x = (actual.y - start.y) / m + start.x;
        if (!(actual.x === end.x && actual.y === end.y))
          vertexs.push({ x: actual.x, y: actual.y });
        context.fillRect(actual.x, actual.y, 1, 1);
        actual.y--;
      }
    }
  }
  return vertexs;
}

function initBBPoints(boundBox) {
	let dXBox = boundBox.max.x - boundBox.min.x;
  for (let i = 0; i < dXBox; i++) {
    boundBox.sides[i] = [];
		let dYBox = boundBox.max.y - boundBox.min.y;
    for (let j = 0; j < dYBox; j++) {
      boundBox.sides[i].push("white");
    }
  }
}

function initVertex(polygon, boundBox) {
  let max = {
    x: Number.MIN_SAFE_INTEGER,
    y: Number.MIN_SAFE_INTEGER
  };

  let min = {
    x: Number.MAX_SAFE_INTEGER,
    y: Number.MAX_SAFE_INTEGER
  }
  
	for (let i = 0; i < polygon.vertexs.length; i++) {
    if (max.x < polygon.vertexs[i].x)
      max.x = polygon.vertexs[i].x;
    if (min.x > polygon.vertexs[i].x)
      min.x = polygon.vertexs[i].x;
    if (max.y < polygon.vertexs[i].y)
      max.y = polygon.vertexs[i].y;
    if (min.y > polygon.vertexs[i].y)
      min.y = polygon.vertexs[i].y;
  }

  boundBox.vertexs.push(min);
  boundBox.vertexs.push({ x: min.x, y: max.y });
  boundBox.vertexs.push(max);
  boundBox.vertexs.push({ x: max.x, y: min.y });
  boundBox.max = max;
  boundBox.min = min;
}

function paint(point, boundBox) {	
	let init = {
		x: parseInt(point.x),
		y: parseInt(point.y)
	}
	
	for (let i = init.x - boundBox.min.x; i < boundBox.max.x - boundBox.min.x; i++)
    if (boundBox.sides[i][init.y - boundBox.min.y] == '#278AB0')
      boundBox.sides[i][init.y - boundBox.min.y] = 'white';		
    else
      boundBox.sides[i][init.y - boundBox.min.y] = '#278AB0';		
}

function showBB(boundBox, context) {
  for (let i = 0; i < boundBox.max.x - boundBox.min.x; i++) {
    for (let j = 0; j < boundBox.max.y - boundBox.min.y; j++) {
      context.fillStyle = boundBox.sides[i][j];
      context.fillRect(i + boundBox.min.x, j + boundBox.min.y, 1, 1);
    }
  }
}

function connectDots(context, polygon, boundBox) {
  context.fillStyle = "green";             
  for (let i = 1; i < polygon.vertexs.length; i++)
      polygon.sides.push(bshLine(polygon.vertexs[i - 1], polygon.vertexs[i]));

  let index = polygon.vertexs.length - 1;
  let line = bshLine(polygon.vertexs[0], polygon.vertexs[index]);
  polygon.sides.push(line);                             

  initVertex(polygon, boundBox);
  initBBPoints(boundBox);  
  context.fillStyle = '#1DC690';

  for (let i = 1; i < boundBox.vertexs.length; i++)
      bshLine(boundBox.vertexs[i - 1], boundBox.vertexs[i]);
  
  index = boundBox.vertexs.length - 1;
  bshLine(boundBox.vertexs[0], boundBox.vertexs[index]);
}