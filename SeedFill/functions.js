let canvas;
let context;
let paintingRegion;
let pStyle;
let middle;

const Init = () => {
    canvas = $("#canvas")[0]; 
    context = canvas.getContext('2d');
    paintingRegion = $("#paintRegion")[0];
    pStyle = getComputedStyle(paintingRegion);
    canvas.width = parseInt(pStyle.getPropertyValue('width'));
    canvas.height = parseInt(pStyle.getPropertyValue('height'));
  
    middle = {
        x: parseInt(canvas.width / 2 - 50),
        y: parseInt(canvas.height / 2 + 50)
    }

    Paint();
}

const Paint = () => {
    let vector = Array();
    let bshLineVar;

    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 0 }, { x: middle.x + 130, y: middle.y - 0 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 10 }, { x: middle.x + 130, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 70 }, { x: middle.x + 130, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 70, y: middle.y - 80 }, { x: middle.x + 130, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 130, y: middle.y - 0 }, { x: middle.x + 130, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 20 }, { x: middle.x + 130, y: middle.y - 20 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 30 }, { x: middle.x + 130, y: middle.y - 30 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 40 }, { x: middle.x + 130, y: middle.y - 40 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 50 }, { x: middle.x + 130, y: middle.y - 50 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 60 }, { x: middle.x + 130, y: middle.y - 60 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 70, y: middle.y - 0 }, { x: middle.x + 70, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 80, y: middle.y - 0 }, { x: middle.x + 80, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 90, y: middle.y - 0 }, { x: middle.x + 90, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 100, y: middle.y - 0 }, { x: middle.x + 100, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 110, y: middle.y - 0 }, { x: middle.x + 110, y: middle.y - 10 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 120, y: middle.y - 0 }, { x: middle.x + 120, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 80, y: middle.y - 70 }, { x: middle.x + 80, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 90, y: middle.y - 70 }, { x: middle.x + 90, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 100, y: middle.y - 70 }, { x: middle.x + 100, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 110, y: middle.y - 70 }, { x: middle.x + 110, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 70, y: middle.y - 70 }, { x: middle.x + 70, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 60 }, { x: middle.x + 0, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 60 }, { x: middle.x + 60, y: middle.y - 60 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 10, y: middle.y - 60 }, { x: middle.x + 10, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 20, y: middle.y - 60 }, { x: middle.x + 20, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 30, y: middle.y - 60 }, { x: middle.x + 30, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 40, y: middle.y - 60 }, { x: middle.x + 40, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 50, y: middle.y - 60 }, { x: middle.x + 50, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 0 }, { x: middle.x + 60, y: middle.y - 70 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 130 }, { x: middle.x + 70, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 120 }, { x: middle.x + 70, y: middle.y - 120 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 20, y: middle.y - 120 }, { x: middle.x + 20, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 30, y: middle.y - 120 }, { x: middle.x + 30, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 40, y: middle.y - 120 }, { x: middle.x + 40, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 50, y: middle.y - 120 }, { x: middle.x + 50, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 120 }, { x: middle.x + 60, y: middle.y - 130 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 80 }, { x: middle.x + 10, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 90 }, { x: middle.x + 10, y: middle.y - 90 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 100 }, { x: middle.x + 10, y: middle.y - 100 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 110 }, { x: middle.x + 10, y: middle.y - 110 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 0, y: middle.y - 120 }, { x: middle.x + 10, y: middle.y - 120 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 70 }, { x: middle.x + 60, y: middle.y - 120 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 80 }, { x: middle.x + 70, y: middle.y - 80 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 90 }, { x: middle.x + 70, y: middle.y - 90 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 100 }, { x: middle.x + 70, y: middle.y - 100 });
    vector.concat(bshLineVar);
    bshLineVar = bshLine({ x: middle.x + 60, y: middle.y - 110 }, { x: middle.x + 70, y: middle.y - 110 });
    vector.concat(bshLineVar);
}

const bshLine = (start, end) => {
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