//高阶函数-函数作为参数
/* function forEach(array,fn){
    for(let i = 0;i<array.length;i++){
        fn(array[i])
    }
}

function filter(array,fn){
    let results = []
    for(let i = 0;i<array.length;i++){
        if(fn(array[i])){
            results.push(array[i])
        }
    }
    return results
}

//测试
let arr = [1,2,3,4,5]
forEach(arr,function(i){
    console.log(i);
})

let r = filter(arr,function(i){
    return i % 2 === 0
})
console.log(r);//[2,4] */


//高阶函数-函数作为返回值
/* function makeFn(){
    let msg = "hello"
    return function(){
        console.log(msg);
    }
}
const fn = makeFn()
fn()
makeFn()() */

//once 函数
/* function once(fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}
let pay = once(function(money){
    console.log(`支付${money}RMB` );
    
})
pay(1)
pay(2)//只执行一次 */

//模拟常用高阶函数：map,every,some
//map
/* const map = (array,fn)=>{
    let results = []
    for(let value of array){
        results.push(fn(value))
    }
    return results
}

let array = [1,2,3,4]
array = map(array,v => v*2)
console.log(array); */

//every 函数对每一项返回true,则返回true
/* const every = (array,fn)=>{ 
    let result = true
    for(let value of array){
        result = fn(value)
        if(!result){
            break
        }
    }
    return result
}

let arr = [11,12,13]
let i = every(arr,(i)=>i>10)//检测大于10
console.log(i); */

//some 如果该函数对任一项返回true，则返回true
/* const some = (array,fn)=>{
    let result = false
    for(let value of array){
        result = fn(value)
        if(result){
            break
        }
    }
    return result
}

let arr = [11,8]
let i = some(arr,(i)=>i>10)//检测大于10(有一个就为true)
console.log(i); */

//纯函数和不纯函数
//slice / splice
// let arry = [1,2,3,4,5]
/* console.log(arry.splice(0,3));
console.log(arry.splice(0,3));
console.log(arry.splice(0,3)); *///得到的结果不同（不纯函数）
/* console.log(arry.slice(0,3));
console.log(arry.slice(0,3));
console.log(arry.slice(0,3)); *///得到结果相同 同样的输入 一样的输出（纯函数）

//纯函数
/* function getSum(n1,n2){
    return n1+n2
}
console.log(getSum(1,2));
console.log(getSum(1,2));
console.log(getSum(1,2)); */

//模拟 memoize 方法的实现(缓存)
/* function memoize(f){
    let cach = {}
    return function(){
        let key = JSON.stringify(arguments)
        cach[key] = cach[key] || f.apply(f,arguments)
        return cach[key]
    }
}

function getArea(r){
    console.log(r);
    return Math.PI *r *r    
}
let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4)); */

//柯里化演示
// function checkAge(age){
//     let min = 18
//     return age>=min
// }
//普通纯函数
// function checkAge(min,age){
//     return age>=min
// }
// console.log(checkAge(18,20));
// console.log(checkAge(18,24));
// console.log(checkAge(22,24));
//函数柯里化
/* function checkAge(min){
    return function(age){
        return age>=min
    }
}

let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)
console.log(checkAge18(20));
console.log(checkAge20(19));
 */
//箭头函数
/*  let checkAge = min => (age=>age >=min)
 let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)
console.log(checkAge18(20));
console.log(checkAge20(19)); */

//模拟实现lodash 中的curry方法
/* function curry(func) {
    return function curriedFn(...args) {
        //判断实参和形参的个数
        if (args.length < func.length) {
            return function () {
                //arguments 第二次传递的参数 ()(arguments)
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }

}

function getSum(a, b, c) {
    return a + b + c
}
const curried = curry(getSum)
console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3)); */


//函数组合演示 
/* function compose(f,g){
    return function(value){
        return f(g(value))
    }
}
function reverse(array){
    return array.reverse()
}
function first(array){
    return array[0]
}
const last = compose(first,reverse)
console.log(last([2,1,3,4]));
 */
//实现 _.flowRight 
/* function compose(...args) {
    return function (value) {
        return args.reverse().reduce(function (acc, fn) {
            return fn(acc)
        }, value)
    }
} */
// const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)
/* const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()
const f = compose(toUpper, first, reverse)
console.log(f(['one','two','three'])); */


// Functro 函子
/* class Container {
    constructor(value){
        this._value = value
    }
    map(fn){
        return new Container(fn(this._value))
    }
}
let r = new Container(5).map(x => x+1).map(x=>x*x)
console.log(r);//36 */

/* class Container {
    static of (value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return new Container(fn(this._value))
    }
}
let r = Container.of(5).map(x =>x+2).map(x=>x*x )
console.log(r); */

//演示null undefing 的问题
// Container.of(null).map(x=>x.toUpperCase())//报错

//MayBe 函子
/* class MayBe {
    static of(value) {
        return new MayBe(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }

    isNothing() {
        return this._value === null || this._value === undefined
    }
} */

// let r = MayBe.of('Hello Word').map(x=>x.toUpperCase())
// console.log(r);
// let r = MayBe.of(null).map(x=>x.toUpperCase())
// console.log(r);
// let r = MayBe.of('Hello Word').map(x=>x.toUpperCase()).map(x => null).map(x=>x.split(''))
// console.log(r);



// Either 函子
/* class Left {
    static of(value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return this
    }
}

class Right {
    static of(value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Right.of(fn(this._value))
    }
}
 */
//   let r1 = Right.of(12).map(x => x + 2)
//   let r2 = Left.of(12).map(x => x + 2)

//   console.log(r1)
//   console.log(r2)


/* function parseJSON(str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({ error: e.message })
    }
}

//   let r = parseJSON('{ name: zs }')
//   console.log(r)
let r = parseJSON('{ "name": "zs" }')
    .map(x => x.name.toUpperCase())
console.log(r) */


// IO 函子
/* const fp = require('lodash/fp')
class IO {
  static of (value) {
      //
    return new IO(function () {
      return value
    })
  }
  //返回一个函数 延迟处理 解决不纯操作问题 惰性求值
  constructor (fn) {
    this._value = fn
  }
  map (fn) {
      //把当前的value 和传入的fn组合成一个新的函数
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用 process node对象 此时是纯操作
let r = IO.of(process).map(p => p.execPath)
// console.log(r)
//把不纯的操作 延迟到调用时处理
console.log("value",r._value()) */



// folktale 中的 compose、curry
/* const { compose, curry } = require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')
// let f = curry(2, (x, y) => {
//   return x + y
// })
// console.log(f(1, 2))
// console.log(f(1)(2))
let f = compose(toUpper, first)
console.log(f(['one', 'two'])) */


// Task 处理异步任务
/* const fs = require('fs')
const { task } = require('folktale/concurrency/task')
const { split, find } = require('lodash/fp')

function readFile (filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)

      resolver.resolve(data)
    })
  })
} */

//转换成数组 寻找version 对象
/* readFile('package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err)
    },
    onResolved: value => {
      console.log(value)
    }
  }) */



  // IO Monad
/* const fs = require('fs')
const fp = require('lodash/fp')
class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }
  constructor (fn) {
    this._value = fn
  }
  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
  join () {//解决 IO函子 需要_value()调用问题
    return this._value()
  }
  flatMap (fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}
let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

let r = readFile('package.json')
          // .map(x => x.toUpperCase())
          .map(fp.toUpper)
          .flatMap(print)
          .join()

console.log(r) */

//内存空间管理

//申请
/* let obj = {}
//使用
obj.name = 'lg'
//释放
obj =null */


//lodash/fp 学习使用

const _ = require('lodash');
const fp = require('lodash/fp')
/* const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase() */

// const f = _.flowRight(toUpper, first, reverse)
// const f = _.flowRight(_.toUpper,_.first,_.reverse)
//结合律 使用flowRight 任意结合
// const f =  _.flowRight(_.toUpper,_.flowRight(_.first,_.reverse))
// console.log(f(['one','two','three']));

//函数组合 调试
//NEVER SAY DIE--》 never-say-die

// const log = v => {
//   console.log(v)
//   return v
// }

/* const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})
// _.split()
const split = _.curry((sep, str) => _.split(str, sep)) */
// _.toLower()
/* const join = _.curry((sep, array) => _.join(array, sep))
const map = _.curry((fn, array) => _.map(array, fn))
const f = _.flowRight(join('-'), trace('map 之后'), map(_.toLower), trace('split 之后'), split(' '))
console.log(f('NEVER SAY DIE')) */

// lodash 的 fp 模块
// NEVER SAY DIE  --> never-say-die
/* const fp = require('lodash/fp')
const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))
console.log(f('NEVER SAY DIE')) */



// lodash 和 lodash/fp 模块中 map 方法的区别 
/* console.log(_.map(['23', '8', '10'], parseInt)) //23 NAN 2
//函数接收参数有三个 
// parseInt('23', 0, array)
// parseInt('8', 1, array)
// parseInt('10', 2, array)
//fp map 函数接收只有一个 parseInt(23)
console.log(fp.map(parseInt, ['23', '8', '10'])) */


//point free  类似函数的组合模式
//Hello World => hello_world
/* const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)
console.log(f('Hello World'));
 */

 //把一个字符串中的首字母提取并转换成大写，使用.作为分隔符
 //world wild web ==>W.W.W
//  const firstLetterToUpper = fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '))
// console.log(firstLetterToUpper("world wild web"));

