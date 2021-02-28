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

const bshRound = (start, end) => {
	let radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

	let increment = 1;
	
	if(radius >= 1)
		increment = 1/radius;	

	for(let i = 0; i < 360; i = i+increment) {
		context.fillStyle = "black";
		context.fillRect(Math.round(radius * Math.cos(i)) + start.x, Math.round(radius * Math.sin(i)) + start.y, 1, 1);
	}
}