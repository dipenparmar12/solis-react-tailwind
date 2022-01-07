/**
 *
 * @param {*} fn
 * @param  {...any} args
 ```
function sum(a,b){ return a+b } 
function square(x){ return x*x }
function cube(x){ return x*x*x }
sumSquareCube = curried(sum)(square)(cube)
sumSquareCube(2,2) // 2+1 -> 3*3 + 9*9*9 -> 243
```
  TODO::
 */
function curried(...args) {}
