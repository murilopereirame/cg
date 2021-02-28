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

        writeContext.fillRect(actual.x, actual.y, 1, 1);
        actual.x++;
      }
    } else {
      while (actual.x > end.x) {
        actual.y = parseInt(m * (actual.x - start.x) + start.y);
        if (!(actual.x === end.x && actual.y === end.y))
          vertexs.push({ x: actual.x, y: actual.y });
        writeContext.fillRect(actual.x, actual.y, 1, 1);
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
        writeContext.fillRect(actual.x, actual.y, 1, 1);
        actual.y++;
      }
    } else {
      while (actual.y > end.y) {
        actual.x = (actual.y - start.y) / m + start.x;
        if (!(actual.x === end.x && actual.y === end.y))
          vertexs.push({ x: actual.x, y: actual.y });
        writeContext.fillRect(actual.x, actual.y, 1, 1);
        actual.y--;
      }
    }
  }
  return vertexs;
}

const mpMatrix = (spot, transMatrix) => {
  let spots = [];
  for (let i = 0; i < transMatrix[0].length; i++) {
    spots[i] = 0;
    for (let j = 0; j < transMatrix.length; j++) {
      spots[i] += spot[j] * transMatrix[j][i];
    }
  }
  return spots;
};

const bshRound = (start, end) => {
  let radius = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  let increment = 0;

  if (radius >= 1) increment = 1 / radius;
  else increment = 1;

  for (let i = 0; i < 360; i = i + increment * 5)
    object.push({
      x: radius * Math.cos(i) + start.x,
      y: start.y,
      z: radius * Math.sin(i) + start.y,
    });		
};

const cavaleiraProjection = (spots) => {
  let newSpots = [];
  let transMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0, 0],
    [0, 0, 0, 1],
  ];

  for (let i = 0; i < spots.length; i++) {
    let mpM = mpMatrix([spots[i].x, spots[i].y, spots[i].z, 1], transMatrix);
    newSpots.push({ x: parseInt(mpM[0]), y: parseInt(mpM[1]) });
  }

  return newSpots;
};

const paint = (spots) => {
  for (let i in spots) context.fillRect(spots[i].x, spots[i].y, 1, 1);
};
