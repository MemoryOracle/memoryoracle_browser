define([
      "react"
], (React) => {
   this.initialize = () => {
      React.render(
         <h1>Hello, world</h1>,
         document.getElementById("example")
      );
      React.render(
         <h2>Science is a verb now</h2>,
         document.getElementById("example2")
      );
      React.render(
         <h3>Science is also also a verb now</h3>,
         document.getElementById("example3")
      );
   };
   return this;
});
