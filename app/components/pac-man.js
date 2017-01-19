import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Level from '../models/level';


     score: 0,
     levelNumber: 1,

     didInsertElement(){
     },

          let ctx = this.get('ctx');
          let squareSize = this.get('squareSize');


          ctx.fillStyle = '#000';
     },
     drawGrid(){
          let ctx = this.get('ctx');
          ctx.fillStyle = '#000';

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
     drawPellet(x,y){
          let radiusDivisor = 6;
          this.drawCircle(x, y, radiusDivisor, 'stopped');
     },
     clearScreen(){
          let ctx = this.get('ctx');
     },



     },

     },



     },

     processAnyPellets(){
          let x = this.get('x');

          if(grid[y][x] == 2){
               grid[y][x] = 0;
               this.incrementProperty('score');

               if(this.levelComplete()){
                    this.incrementProperty('levelNumber');
                    this.restartLevel();
               }
          }
     },

     },

     },

     keyboardShortcuts:{
});
