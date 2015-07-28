define([], function(): Object {
   /**
    * A module for testing
    * @module
    */


   /**
    * Squares a number
    * @param {number} x - The number to square
    * @returns {number} - The square of x and all kinds of things
    */
   function f(x: number): number {
      return x*x;
   }

   function y(x: number): number {
      return x*x;
   }

   function g(arg: string): number {
      return arg.length;
   }

   function process_array(numbers: Array<number>): number {
      var result = 0;
      for (var i = 0; i < numbers.length; i++) {
         result += numbers[i];
      }
      return result;
   }

   class Science {

      constructor(x: number, y: number): Object {
         this.x = x;
         this.y = y;
      }

      mult(): number {
         return x*y;
      }

   }

   class Magic extends Science {

      constructor(x: number, y: number, str: string): Object {
         super(x, y);
         this.str = str;
      }

      echo() {
         console.log(`hello, ${str}`);
      }
   }

   var ret = {Science: Science, Magic: Magic};
   return ret;
});
