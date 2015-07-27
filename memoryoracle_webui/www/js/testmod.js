define([], () => {

   function f(x) {
      return x*x;
   }

   var y = (x) => x*x;

   class Science {

      constructor(x, y) {
         this.x = x;
         this.y = y;
      }

      mult() {
         return x*y;
      }
   }

   class Magic extends Science {

      constructor(x, y, str) {
         super(x, y);
         this.str = str;
      }

      echo() {
         console.log(`hello, ${str}`);
      }
   }

   var ret = new Object();
   ret.Science = Science;
   ret.Magic = Magic;
   return ret;
});
