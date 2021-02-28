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

const LogicalAnd = (arr, arr2) => {
    let aux = [];

    arr.forEach((element, index) => {
        if(element === '1' && arr2[index] === '1')
            aux[index] = '1';
        else
            aux[index] = '0';
    });

    return aux;
}

const Diagonals = (cod, type) => {
    let trueIndexes = [];
    let sides = {
        p1: undefined,
        p2: undefined
    }

    let mainInter = {x: 0, y:0};
    let secInter = {x: 0, y:0};

    cod.forEach((element, index) => {
        if(element === '1')
            trueIndexes.push(index);
    })

    if(trueIndexes.length === 1)
        return type;

    sides.p2 = trueIndexes.pop();
    sides.p1 = trueIndexes.pop();

    let m = (last.y - first.y)/(last.x - first.x);

    if(sides.p1 === 0) {
        mainInter.y = coordinates.YMax;
        mainInter.x = (1/m) * (coordinates.YMax - first.y) + first.x;        
    } else {
        mainInter.y = coordinates.YMin;
        mainInter.x = (1/m) * (coordinates.YMin - first.y) + first.x;        
    }

    if(sides.p2 === 2) {
        secInter.x = coordinates.XMax;
        secInter.y = m * (coordinates.XMax - first.x) + firxt.y;
    } else {
        secInter.x = coordinates.XMin;
        secInter.y = m * (coordinates.XMin - first.x) + firxt.y;
    }

    if(Cross(mainInter))
        return mainInter;

    return secInter;
}

const PaintLine = () => {
    let mainCode = ComputeCoordinates(first);
    let secCode = ComputeCoordinates(last);

    if(mainCode.join('') === '0000' && secCode.join('') === '0000') {
        bshLine(first, last);
        return;
    }

    let newCode = LogicalAnd(mainCode, secCode);
    
    if(newCode.join('') === '0000') {
        let invY = {x: 0, y: coordinates.YMin};
        let norY = {x: 0, y: coordinates.YMax};
        let left = {x: coordinates.XMin, y: 0};
        let right = {x: coordinates.XMax, y: 0};

        let m = (last.y - first.y) / (last.x - first.x);
        let fPoint;
        let lPoint;
        let index;

        if(mainCode.join('') === '0000') {
            index = secCode.indexOf('1');
            fPoint = first;
            index = Diagonals(secCode, index);
        } else if(secCode.join('') === '0000') {
            index = mainCode.indexOf('1');
            fPoint = last;
            index = Diagonals(mainCode, 1);
        }

        if(fPoint) {
            if(index === 0) {
                norY.x = (1/m)*(coordinates.YMax-first.y) + first.x;
                bshLine(fPoint, norY);
            } else if(index === 1) {
                invY.x = (1/m)*(coordinates.YMin-first.y) + first.x;
                bshLine(fPoint, invY);
            } else if(index === 2) {
                right.y = (m)*(coordinates.XMax-first.x) + first.y;
                bshLine(fPoint, right);
            } else if(index === 3) {
                left.y = (m)*(coordinates.XMin-first.x) + first.y;
                bshLine(fPoint, left);
            }

            return;
        } else {
            norY.x = (1/m) * (coordinates.YMax - first.y) + first.x;
            invY.x = (1/m) * (coordinates.YMin - first.y) + first.x;
            left.y = (m)*(coordinates.XMin-first.x) + first.y;
            right.y = (m)*(coordinates.XMax-first.x) + first.y;

            if(Cross(norY))
                fPoint = norY;
            if(Cross(invY)) {
                if(fPoint)
                    lPoint = invY;
                else
                    fPoint = invY;
            }
            if(Cross(left)) {
                if(fPoint)
                    lPoint = left;
                else
                    fPoint = left;
            }
            if(Cross(right)) {
                if(fPoint)
                    lPoint = right;
                else
                    fPoint = right;
            }

            bshLine(fPoint, lPoint);
        }
    }

}

const ComputeCoordinates = (pos) => {
    let aux = [];
    if(pos.x < coordinates.XMin) {
        aux[3] = 1;
        aux[2] = 0;
    } else if(pos.x > coordinates.XMax) {
        aux[3] = 0;
        aux[2] = 1;
    } else {
        aux[3] = 0;
        aux[2] = 0;
    }

    if(pos.y < coordinates.YMin) {
        aux[1] = 1;
        aux[0] = 0;
    } else if(pos.y > coordinates.YMax) {
        aux[1] = 0;
        aux[0] = 1;
    } else {
        aux[1] = 0;
        aux[0] = 0;
    }

    return aux;
}

const Cross = (pos) => {
    if(pos.x <= coordinates.XMax && pos.x >= coordinates.XMin)
        if(pos.y <= coordinates.YMax && pos.y >= coordinates.YMin)
            return true;

    return false;
}

const HandleClick = () => {
    if(tap === 0) {
        limits[0].x = pointer.x;
        limits[0].y = pointer.y;
        ++tap;
    } else {
        tap = 0;

        limits[1].x = pointer.x;
        limits[1].y = pointer.y;
        limits[2].x = limits[0].x;
        limits[2].y = limits[1].y;
        limits[3].x = limits[1].x;
        limits[3].y = limits[0].y;

        if(limits[0].x >= limits[1].x) {
            coordinates.XMax = limits[0].x;
            coordinates.XMin = limits[1].x;
        } else {
            coordinates.XMax = limits[1].x;
            coordinates.XMin = limits[0].x;
        }

        if(limits[0].y >= limits[1].y) {
            coordinates.YMax = limits[0].y;
            coordinates.YMin = limits[1].y;
        } else {
            coordinates.YMax = limits[1].y;
            coordinates.YMin = limits[0].y;
        }

        bshLine(limits[0], limits[2]);
        bshLine(limits[2], limits[1]);
        bshLine(limits[1], limits[3]);
        bshLine(limits[3], limits[0]);

        $("#canvas").click(function firstAction (event) {
            HandleSpecialClick();      
        })
    }
}

const HandleSpecialClick = () => {
    first.x = pointer.x;
    first.y = pointer.y;
    $("#canvas").click(function lastAction (event) {
        last.x = pointer.x;
        last.y = pointer.y;
        PaintLine();
        $("#canvas").click(function(event) {
            HandleSpecialClick();
        })
    })
}