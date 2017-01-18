import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts,{

     screenWidth:  Ember.computed(function(){
          return this.get('grid.firstObject.length');
     }),
     screenHeight: Ember.computed(function(){
          return this.get('grid.length');
     }),

     x: 0,
     y: 0,
     squareSize: 40,

     score: 0,
     levelNumber: 1,

     walls: [
          {x:1, y:1},
          {x:8, y:5}
     ],

     //0 is a blankspace
     //1 is a wall
     //2 is a pellet
     grid: [
          [2,2,2,2,2,2,2,1],
          [2,1,2,1,2,2,2,1],
          [2,2,1,2,2,2,2,1],
          [2,2,2,2,2,2,2,1],
          [2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,1],
     ],

     ctx: Ember.computed(function(){
          let canvas = document.getElementById('myCanvas');
          let ctx = canvas.getContext('2d');
          return ctx;
     }),
     screenPixelWidth: Ember.computed(function(){
          return this.get('screenWidth') * this.get('squareSize');
     }),
     screenPixelHeight: Ember.computed(function(){
          return this.get('screenHeight') * this.get('squareSize');
     }),

     didInsertElement(){
          this.drawGrid();
          this.drawPac();
     },

     drawCircle(x, y, radiusDivisor){
          let ctx = this.get('ctx');
          let squareSize = this.get('squareSize');

          let pixelX = (x+1/2) * squareSize;
          let pixelY = (y+1/2) * squareSize;

          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(pixelX, pixelY, squareSize/radiusDivisor, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fill();
     },

     drawPac(){
          let x = this.get('x');
          let y = this.get('y');
          let radiusDivisor = 2;
          this.drawCircle(x, y, radiusDivisor);
     },

     drawGrid(){
          let squareSize = this.get('squareSize');
          let ctx = this.get('ctx');
          ctx.fillStyle = '#000';

          let grid = this.get('grid');
          grid.forEach((row, rowIndex)=>{
               row.forEach((cell, columnIndex)=>{
                    if(cell == 1){
                         this.drawWall(columnIndex, rowIndex);
                    }
                    if(cell == 2){
                         this.drawPellet(columnIndex, rowIndex);
                    }
               })
          })
     },

     drawWall(x,y){
          let ctx = this.get('ctx');
          let squareSize = this.get('squareSize');

          ctx.fillStyle = '#000';
          ctx.fillRect(
               x * squareSize,
               y * squareSize,
               squareSize,
               squareSize
          )
     },

     drawPellet(x,y){
          let radiusDivisor = 6;
          this.drawCircle(x, y, radiusDivisor);
     },

     clearScreen(){
          let ctx = this.get('ctx');

          ctx.clearRect(0, 0, this.get('screenPixelWidth'), this.get('screenPixelHeight'));
     },

     collidedWithBorder(){
          let x = this.get('x');
          let y = this.get('y');
          let screenHeight = this.get('screenHeight');
          let screenWidth  = this.get('screenWidth');

          let pacOutOfBounds = x < 0             ||
                               y <  0            ||
                               x >= screenWidth  ||
                               y >= screenHeight;
          return pacOutOfBounds;
     },

     collidedWithWall(){
          let x = this.get('x');
          let y = this.get('y');
          let grid = this.get('grid');

          return grid[y][x] == 1;
     },

     processAnyPellets(){
          let x = this.get('x');
          let y = this.get('y');
          let grid = this.get('grid');

          if(grid[y][x] == 2){
               grid[y][x] = 0;
               this.incrementProperty('score');

               if(this.levelComplete()){
                    this.incrementProperty('levelNumber');
                    this.restartLevel();
               }
          }
     },

     levelComplete(){
          let hasPelletsLeft = false;
          let grid = this.get('grid');

          grid.forEach((row)=>{
               row.forEach((cell)=>{
                    if(cell == 2){
                         hasPelletsLeft = true
                    }
               })
          })
          return !hasPelletsLeft;
     },

     restartLevel(){
          this.set('x', 0);
          this.set('y', 0);

          let grid = this.get('grid');
          grid.forEach((row, rowIndex)=>{
               row.forEach((cell, columnIndex)=>{
                    if(cell == 0){
                         grid[rowIndex][columnIndex] = 2;
                    }
               })
          })
     },

     movePacMan(direction, amount){
          this.incrementProperty(direction, amount);

          if(this.collidedWithBorder() || this.collidedWithWall()){
               this.decrementProperty(direction, amount);
          }

          this.processAnyPellets();

          this.clearScreen();
          this.drawGrid();
          this.drawPac();
     },

     keyboardShortcuts:{
          up:    function(){ this.movePacMan('y', -1); this.clearScreen(); this.drawGrid(); this.drawPac(); return false; },
          down:  function(){ this.movePacMan('y',  1); this.clearScreen(); this.drawGrid(); this.drawPac(); return false; },
          left:  function(){ this.movePacMan('x', -1); this.clearScreen(); this.drawGrid(); this.drawPac(); return false; },
          right(){ this.movePacMan('x',  1); this.clearScreen(); this.drawGrid(); this.drawPac(); return false; }
     }

});
