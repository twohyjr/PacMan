import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts,{

     screenWidth:  20,
     screenHeight: 15,
     x: 0,
     y: 0,
     squareSize: 40,

     ctx: Ember.computed(function(){
          let canvas = document.getElementById('myCanvas');
          let ctx = canvas.getContext('2d');
          return ctx;
     }),

     didInsertElement: function(){
          this.drawCircle();
     },

     drawCircle: function(){
          let ctx = this.get('ctx');
          let x = this.get('x');
          let y = this.get('y');
          let squareSize = this.get('squareSize');

          let pixelX = (x+1/2) * squareSize;
          let pixelY = (y+1/2) * squareSize;

          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(pixelX, pixelY, squareSize/2, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fill();
     },

     clearScreen: function(){
          let ctx = this.get('ctx');
          let screenPixelWidth  = this.get('screenWidth')  * this.get('squareSize');
          let screenPixelHeight = this.get('screenHeight') * this.get('squareSize');

          ctx.clearRect(0, 0, screenPixelWidth, screenPixelHeight);
     },

     collidedWithBorder: function(){
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

     movePacMan: function(direction, amount){
          this.incrementProperty(direction, amount);

          if(this.collidedWithBorder()){
               this.decrementProperty(direction, amount);
          }

          this.clearScreen();
          this.drawCircle();
     },

     keyboardShortcuts:{
          up:    function(){ this.movePacMan('y', -1); this.clearScreen(); this.drawCircle(); return false; },
          down:  function(){ this.movePacMan('y',  1); this.clearScreen(); this.drawCircle(); return false; },
          left:  function(){ this.movePacMan('x', -1); this.clearScreen(); this.drawCircle(); return false; },
          right: function(){ this.movePacMan('x',  1); this.clearScreen(); this.drawCircle(); return false; }
     }

});