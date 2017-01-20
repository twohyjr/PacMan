import Ember from 'ember';
import SharedStuff from '../mixins/shared-stuff';
import Movement from '../mixins/movement';

export default Ember.Object.extend(SharedStuff, Movement, {

     draw(){
          let x = this.get('x');
          let y = this.get('y');
          let radiusDivisor = 2;
          this.drawCircle(x, y, radiusDivisor, this.get('direction'), '#F55');
     },

     changeDirection(){
          
     },

});
