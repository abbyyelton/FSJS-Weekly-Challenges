//#Week 6 JQuery Code Challenge

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


//Objects
function Box(height, width, volume) {
	this.height = height;
	this.width = width;
	this.volume = volume;
	this.depth = volume/(height*width);
}

Box.prototype.calculateDepth = function() {
		this.depth = this.volume/(this.height*this.width);
}

Box.prototype.drawBox = function() {
	var offset = Math.sqrt((this.depth*this.depth)/2);
	var point1 = "0,0 ";
	var point2 = this.width + ",0 ";
	var point3 = this.width + "," + this.height + " ";
	var point4 = "0," + this.height + " ";
	var point5 = offset + "," + offset + " ";
	var point6 = (offset+this.width) + "," + offset + " ";
	var point7 = (offset+this.width) + "," + (offset+this.height) + " ";
	var point8 = offset + "," + (offset+this.height) + " ";
	var htmlString = "<svg width='100' height='100'><polygon points='";
	htmlString += point1 + point2 + point3 + point4 + point1 + point5 +point6 + point7 + point8 + point5
		+ point8 + point4 + point3 + point7 + point6 + point2;
	htmlString += "' style='fill:white;stroke:purple;stroke-width:2;' /></svg>";
	return htmlString;
}

Box.prototype.renderBox = function() {
	//add box creation to htmlString
	var htmlString = this.drawBox();
	//add text
	htmlString += "<p>" + round(this.height,2) + "x" + round(this.width,2) + "x" + round(this.depth,2);
  htmlString += " Volume: " + round(this.volume,2) + "</p>";
	$("#output").html(htmlString);
}

Box.prototype.changeAttribute = function( dimension, amount ) {
	this[dimension] += amount;
	this.calculateDepth();
}

var displayBox = new Box(20,20,8000);

//Code Challenge:
//Create an object named "Box" with 3 properties, height, width, volume.
//Create 2 buttons for Height. The first button decreases the Box Height by 1. The second button increases the Box Height by 1.
//Create a button that prints the object and its attributes to the page (use the span "output".

//Extra credit
//Create interactive buttons to decrease or increase the Width and Volume

$("#Print").click( function() {
	displayBox.renderBox();
});

$("#HeightDecrease").click( function() {
	if (displayBox.height > 1) {
		displayBox.changeAttribute( "height", -1 );
	}
});

$("#HeightIncrease").click( function() {
	displayBox.changeAttribute( "height", 1 );
});

$("#WidthDecrease").click( function() {
	if (displayBox.width > 1) {
		displayBox.changeAttribute( "width", -1 );
	}
});

$("#WidthIncrease").click( function() {
	displayBox.changeAttribute( "width", 1 );
});

$("#VolumeDecrease").click( function() {
	if (displayBox.volume > 1) {
		displayBox.changeAttribute( "volume", -1 );
	}
});

$("#VolumeIncrease").click( function() {
	displayBox.changeAttribute( "volume", 1 );
});
