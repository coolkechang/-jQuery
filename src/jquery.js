window.$ = window.jQuery = function (selectorOrArray) {
  //一行代码有多个等号时，从右向左执行
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }

  return {
    addClass(className) {
      //jquery接受一个选择器（selector），根据这个选择器获取一些元素（elements），但是返回一个对象，这个对象有一个方法可以操作这个元素（这里指api 可以操作 element）
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
      }
      return this
    },
    //注意这里代码直接 return 的意思，原本是声明一个对象，名字是api，然后返回这个对象。上述代码直接返回对象，不用取名字了
    //这里 api 是对象，写法是ES6提供的简写方式；原语法是：const api = {"addClass":function(className){for(...){...}}...;} 也就是把引号和function删掉了。
    //闭包：函数访问外部变量。在这里就是 addClass 访问了 elements

    find(selector) {
      //查找 #xxx 里的 .red 元素。声明一个临时数组用来储存查找的元素，然后遍历elements，去找想要的元素
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const element2 = Array.from(elements[i].querySelectorAll(selector))
        array = array.concat(element2)
        //用之前的空数组连接上新的元素，把连接上新元素的数组放回到array。（得到的是伪数组，需要用Array.from转化成数组再放回）
      }
      array.oldApi = this //this是旧的api
      return jQuery(array) //是 const newApi = jQuery(array);然后return newApi;的简写
    },

    oldApi: selectorOrArray.oldApi,
    //加这句话是因为，前面把oldApi放在了array上面，并不是在api上（api是操作数组的），所以需要插上这个操作
    end() {
      //查找 #xxx 里的 .red 元素后返回上一级
      return this.oldApi //this是新的api（可以看一下main.js中相关的代码理解）
    },

    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this //这个this是api对象
    }, //遍历elements，每个elements调用fn，this是空，第一个参数是elements[i]，第二个参数是i
    parent() {
      const array = []
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          //这里=== -1 其实是<=0个的意思，即如果没有push就push一下，push过了就不push了，避免重复
          array.push(node.parentNode)
        }
      })
      return jQuery(array)
    }, //检查其爸爸时，如果有多个元素对应一个爸爸，它会重复打印出来，实际我们只需要一个，所以加一个判断条件。
    children() {
      const array = []
      this.each((node) => {
        array.push(...node.children) //...是指展开操作符，就是把数组展开作为第一二三...个参数展示
      })
      return jQuery(array)
    },
    print() {
      console.log(elements)
    }, //用print()来表示打印。
  }
}

jQuery.prototype = {
  //使用原型把共用属性（函数）全都放到 $.prototype
  constructor: jQuery, //jQuery.prototype 一开始就有 constructor 属性，不写这句话会被覆盖
}
