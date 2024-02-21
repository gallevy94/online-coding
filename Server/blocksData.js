const data = [
  {
    id: 1,
    title: "Print Hello World Case",
    code: `//Write a line of code that prints 'Hello World!' to the screen.
    //Don't forget ;
    
    `,
    solution: `//Write a line of code that prints 'Hello World!' to the screen.
    //Don't forget ;
    console.log('Hello World!');
    `,
  },
  {
    id: 2,
    title: "Find Maximum Number in an Array Case",
    code: `//Write a function that takes an array and return the maximum number in the array.
    //You can use Math
    //Don't forget ;
    function findMax(arr) {
      return
    }`,
    solution: `//Write a function that takes an array and return the maximum number in the array.
    //You can use Math
    //Don't forget ;
    function findMax(arr) {
      return Math.max(...arr);
    }`,
  },
  {
    id: 3,
    title: "Find Minimum Number in an Array Case",
    code: `//Write a function that takes an array and return the Minimum number in the array.
    //You can use Math
    //Don't forget ;
    function findMin(arr) {
      return
    }`,
    solution: `//Write a function that takes an array and return the Minimum number in the array.
    //You can use Math
    //Don't forget ;
    function findMin(arr) {
      return Math.min(...arr);
    }`,
  },
  {
    id: 4,
    title: "Check if a Number is Even Case",
    code: `//Write a function that takes a number and return true if the number is even and false if the number is odd.
    //Don't forget ;
    function isEven(num) { 
      return
    }`,
    solution: `//Write a function that takes a number and return true if the number is even and false if the number is odd.
    //Don't forget ;
    function isEven(num) { 
      return num % 2 === 0;
    }`,
  },
];

module.exports = { data };
