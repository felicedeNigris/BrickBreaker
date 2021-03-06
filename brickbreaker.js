      //vars
       var canvas = document.getElementById('canvas');
       var ctx = canvas.getContext('2d');
       var x = canvas.width/2;
       var y = canvas.height-30;
       var dx = -2;
       var dy =-1;
       var ballRadius = 10;
       var paddleHeight = 10;
       var paddleWidth = 75;
       var paddleX = (canvas.width-paddleWidth)/2;
       var rightPressed = false;
       var leftPressed = false;
       
       //brick variables
       var brickRowCount = 4;
       var brickColumnCount = 5;
       var brickWidth = 80;
       var brickHeight = 20;
       var brickPadding = 10;
       var brickOffsetTop = 30;
       var brickOffsetLeft = 30;
       //score variable
       var score = 0;
       var lives = 3;
       
       var bricks = [];
        for(c=0; c<brickColumnCount; c++) {
          bricks[c] = []; //brick columns array
          for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status:1 }; //bricks columns and rows 2-Dimensional array
          }
        }
       
       

       //when dwn key pressed execute keyDownHandler
       document.addEventListener('keydown', keyDownHandler, false);
       //when up key pressed execute keyUpHandler
       document.addEventListener('keyup', keyUpHandler, false);
       document.addEventListener("mousemove",mouseMoveHandler, false);
       
      function mouseMoveHandler(e){
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width){
          paddleX = relativeX - paddleWidth/2;
        }
      }
       
      function keyDownHandler(e){
        if(e.keyCode == 39){
          rightPressed = true;
        }
        else if(e.keyCode == 37){
          leftPressed = true;
        }
      }
      function keyUpHandler(e){
        if(e.keyCode == 39){
          rightPressed = false;
        }
        else if(e.keyCode == 37){
          leftPressed = false;
        }
      }

      function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
          for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
              var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#5BBFF0";
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }

      function collisionDetection(){ // loop over brick col and rows
        for(c=0; c<brickColumnCount; c++){
          for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];//var b holds onto bricks location position data
            //calculations
            if(b.status == 1){
              if(x>b.x && x<b.x+brickWidth && y > b.y && y < b.y+brickHeight){ //compares x+y pos to each brick position data
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount * brickColumnCount){
                  alert("YOU WIN, CONGRATULATIONS!");
                  document.location.reload();
                }
              }
            }
          }
        }
      }
       //drawing the ball
       function drawBall(){
          ctx.beginPath();
          ctx.arc(x,y,ballRadius, 0, Math.PI*2);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
       }

       function drawPaddle(){
         ctx.beginPath();
         ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
         ctx.fillStyle = "#0095DD";
         ctx.fill();
         ctx.closePath();
       }

      function drawScore(){
        ctx.font = '16px Helvetica';
        ctx.fillStyle = "0095DD";
        ctx.fillText("Score: "+score, 8, 20);
      }
      
      function drawLives(){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+ lives, canvas.width-65,20)
      }

     // clear the frame after every ball frame
     function draw(){
       ctx.clearRect(0,0,canvas.width, canvas.height);
       drawBricks();
       drawBall();
       drawPaddle();
       drawScore();
       drawLives();
       collisionDetection();

       //Make Ball Bounce on Y Plane
       if(y + dy < 0  + ballRadius){// if ball hits ceiling
         dy = -dy; //polarize the direction
       }
       else if(y + dy > canvas.height-ballRadius){
         if(x > paddleX && x < paddleX + paddleWidth){
           dy =-dy;
         }
       }
       if(y + dy > canvas.height - ballRadius){ //if ball hits floor
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
       }
       // Make Ball Bounce on X plane
       if(x + dx < 0 + ballRadius){
         dx = -dx; 
       }
       if(x + dx > canvas.width - ballRadius){
         dx = -dx;//polarize the direction
       }
       
       //Move left or right
       if(rightPressed && paddleX < canvas.width - paddleWidth){
         paddleX += 7;
       }
       else if(leftPressed && paddleX > 0){
         paddleX -= 7;
       }
       x += dx;
       y += dy;
       requestAnimationFrame(draw);
     }

    draw(); 