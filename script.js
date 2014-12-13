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
	
	// BASIC SNAKE VARIABLES
	
	// Size of our snake blocks
	var snakeBlockSize = 10;
	
	var gameSpeed = 60;
	
	// Create initial variables to be used later
	var snake_array; 
	var direction;
	var food;
	var score;
	var registered = false;
	var player;
	var PHPplayer;
	
	function init() {
	
		// Reset the direct and the score
		direction = 'right';
		score = 0;
		gameSpeed = 60;
	
		// Make the snake
		create_snake();
		
		// Create the food 
		create_food();
	
		// game_loop is == a number/object when it kicks in
		// then we clearInterval, if not we start fresh
		if(typeof game_loop != "undefined") {
		 
			clearInterval(game_loop);
			
		}
		
		// set up a loop for the game
		game_loop = setInterval(paint, gameSpeed);
		
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
	
	// Food object
	function create_food() {
	
		// Taking a random number and multiplying it by
		// width of canvas - the block size then / by block size  eg (450 - 10 = 440 / 10 = 44)
		// 0.47753685725842165 * 44 = 21 (with math round)
		food = {
		
			x: Math.round(Math.random()*(w - snakeBlockSize) / snakeBlockSize), 
			y: Math.round(Math.random()*(h - snakeBlockSize) / snakeBlockSize),
			
		};
		
	}
	
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
		
		// If the snake goes out of the box we need to reset
		// nx == -1 means if the placements are off the gid then it's game over 
		// nx == w/snakeBlockSize means if the snake is more than the width, eg hitting right
		// ny == -1 means if goes off at the top
		// ny == h/snakeBlockSize means if we shoot off at the bottom
		// check_collision referes to function below, it check if the head colides with parts of the body
		if(nx == -1 || nx == w/snakeBlockSize || ny == -1 || ny == h/snakeBlockSize || check_collision(nx, ny, snake_array)) {
		
			submitInfo(score);
				
			// Call the init and setInterval
			init();
			return;
			
		}
		
		// If the head of the snake hits the food coordinates then we need to add another block to the snake
		// We are skipping the pop here and jumping stright onto the unshift so it goes stright to the head
		if(nx == food.x && ny == food.y) {
		
			// tail
			var tail = {x: nx, y: ny};
			
			// Add score
			score++;
			
			clearInterval(game_loop);
			
			gameSpeed--;
			
			// set up a loop for the game
			game_loop = setInterval(paint, gameSpeed);
			
			//Create new food x y if we've hit it
			create_food();
			
		}
		
		else {
		
			// Pop removes the last element of an array
			// We store it in a variable
			var tail = snake_array.pop();
			
			// Set the x axis of the tail to the thing we calcualted above
			tail.x = nx;
			tail.y = ny;
			
		}
		
		// Add new cell to the beginning of the array with the new position
		snake_array.unshift(tail); 
	
		// For loop runs through the snake_array length
		for(i = 0; i < snake_array.length; i++) {
		
			// Access each of the axis stuff in the snake_array
			var c = snake_array[i];
			
			// Paint the cell from the snake array
			paint_cell(c.x, c.y);
			
			// Pain the food if it's changed
			paint_cell(food.x, food.y);
			
			// Output the score
			var score_text = "Score: " + score;
			$('.score').html(score_text);
			
		}
	}
	
	//Lets first create a generic function to paint cells
	function paint_cell(x, y) {
	
		// Fill colour
		ctx.fillStyle = "blue";
		// Fill coordinates
		ctx.fillRect(x * snakeBlockSize, y * snakeBlockSize, snakeBlockSize, snakeBlockSize);
		// Stroke style
		ctx.strokeStyle = "white";
		// add strokes
		ctx.strokeRect(x * snakeBlockSize, y * snakeBlockSize, snakeBlockSize, snakeBlockSize);
		
	}
	
	function check_collision(x, y, array) {
	
		// This checks if the new positions exist int he current snake
		// eg check_collision(nx, ny, snake_array))
		// Checks the new position with all the entries in the array
		for(var i = 0; i < array.length; i++) {
		
			if (array[i].x == x && array[i].y == y) {
			
				// Return true and reset the game
				return true;
				
			}
			 
		}
		
		// Return false as no collisions
		return false;
		
	}
	
	//Lets add the keyboard controls now
	$(document).keydown(function(e){
	
		// Find out which key press and change the variable
		// We added reverse && statements so if they press down when going up that's not possible
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

	});
	
	function submitInfo(playerScore) {
			
		$.ajax({
		
			type: "POST",
			url: "write.php", 
			data: {Info:playerScore, Name:PHPplayer},
			success: function(result) {
			
			     getHighScore();
			     
			}
			
		});
	    
	}
	
	function getHighScore() {
			
		$.ajax ({
		
            url: "leaders.txt",
            async: false,
            success: function (data){
            
                $('.highscore').html('Highest score: ' + data);
                
            }
            
        });
	    
	}
	

	
	person = prompt('Please enter your name');
		
	if (person != null && registered == false && person != '') {
	
        player = person;
        var PHPplayer = "-" + player;
        
        $('.player').html(player);
        
        init();
        
	}
		
};

// ON DOC READY
$(function()
{	
	new Base.Snake();
	
});

