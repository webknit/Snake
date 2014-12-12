/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/

// JS EXAMPLE

var Base = Base || {};

Base.Snake = function() {	

	// Create the Canvas Object tell it 2d
	var canvas = $("#canvas")[0];
    var ctx = canvas.getContext('2d');
    
    // The Canvas height and width
    var w = $('#canvas').width();
	var h = $('#canvas').height();
	
	// Some basic settings
	
	// Size of our snake blocks
	var snakeBlockSize = 10;
	
	// Starting direction
	var direction = 'right';
	
	function init() {
	
		create_snake();
	
		if(typeof game_loop != "undefined") {
		 
			clearInterval(game_loop);
			
		}
		
		game_loop = setInterval(paint, 60);
		
	}
	
	function paintCanvas() {
		// Fill the canvas
		// fillStyle sets the style
		ctx.fillStyle = 'white';
		// fillRect draws a filled rectangle based on the fillStyle
		ctx.fillRect(0, 0, w, h);
		// Sets the stroke style
		ctx.strokeStyle = "black";
		// strokeRect draws a rectangle with a strokeStyle
		ctx.strokeRect(0, 0, w, h);
	}

	// Making the snake
	// This array includes the cells
	var snake_array; 
	
	function create_snake() {
	
		// Initial length of the snake
		var length = 5;
		
		// Make the variable into an empty array, making it global too
		snake_array = [];
		
		// Count down from the length of the snake in for loop
		for(i = length - 1; i >= 0; i--) {
		
			// Push some objects of the number of snake elements into the x axis
			snake_array.push({x: i, y:0});
			
		}
		
	}
	
	create_snake();
	
	// Output the initial snake onto the canvas
	function paint() {
	
		paintCanvas()
		
		// Need to find out where the head of the snake is in the array
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		
		// We need to find where the new head of the snake should be
		// So we have the directions and either -- or ++ them
		
		// If we're going right then we're adding to the x axis
		// E.g first one will be right so it's adding the x axis to 6 when it started at 5
		
		console.log(direction);
		
		if(direction == "right") {
		
			nx++;
			
		}
		
		// If we're going left then we're subtracting from the x axis
		else if(direction == "left") {
		
			nx--;
			
		} 
		
		// If we're going up then we're subtracting from the y axis
		else if(direction == "up") {
		
			ny--;
		
		} 
		
		// If we're going down then we're adding to the y axis
		else if(direction == "down") {
		
			ny++;
		
		}
		
		// Lets add the game over clauses now
		// This will restart the game if the snake hits the wall
		if(nx == -1 || nx == w/snakeBlockSize || ny == -1 || ny == h/snakeBlockSize) {
		
			//restart game
			init();
			return;
			
		}
		
		// Pop removes the last element of an array
		// We store it in a variable
		var tail = snake_array.pop();
		
		// Set the x axis of the tail to the thing we calcualted above
		tail.x = nx;
		tail.y = ny;
		
		// Add new cell to the beginning of the array with the new position
		snake_array.unshift(tail); 
	
		// For loop runs through the snake_array length
		for(i = 0; i < snake_array.length; i++) {
		
			// Access each of the axis stuff in the snake_array
			var c = snake_array[i];
			
			// Paint onto the canvas using methods used previously
			// Fill the rectangles taking the x and y from the snake_array and
			// * by the default block size to paint our blocks
			ctx.fillStyle = "blue";
			ctx.fillRect(c.x*snakeBlockSize, c.y*snakeBlockSize, snakeBlockSize, snakeBlockSize);
			// Add the outline to the snake boxes
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*snakeBlockSize, c.y*snakeBlockSize, snakeBlockSize, snakeBlockSize);
			
		}
	}
	
	//Lets add the keyboard controls now
	$(document).keydown(function(e){
	
		var key = e.which;
		
		if(key == "37" && direction != "right") {
		
			direction = "left";
			
		}
		
		else if(key == "38" && direction != "down") {
		 
			direction = "up";
			
		}
		
		else if(key == "39" && direction != "left") {
		
			direction = "right";
			
		}
		
		else if(key == "40" && direction != "up") {
		
			direction = "down";
		
		}

	})
	
	init();
		
};

// ON DOC READY
$(function()
{	
	new Base.Snake();
	
});

