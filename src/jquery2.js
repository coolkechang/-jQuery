//使用原型把共用属性（函数）全都放到 $.prototype 上：（节约内存）

window.$ = window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }

  const api = Object.create(jQuery.prototype) //创建一个对象，这个对象的 __proto__ 为括号里的东西
  //这句话相当于：const api = {__proto__: jQuery.prototype} 但是 jquery 不支持这种写法
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi,
  })
  //Object.assign的意思是把后面对象里面的属性一个一个复制到前面来。这里只有一个oldApi,把它复制给api
  //在这里相当于 api.oldApi = selectorOrArray.oldApi 。如果有多个属性，需要api.xxx = ... 这样一个一个写。
  return api
}

jQuery.fn = jQuery.prototype = {
  //jQuery 给 jQuery.prototype 取了个别名 jQuery.fn
  constructor: jQuery, //写这句话是因为：jQuery.prototype 一开始就有 constructor 属性，不写这句话会被覆盖
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className)
    }
    return this
  },
  find(selector) {
    let array = []
    for (let i = 0; i < this.elements.length; i++) {
      const element2 = Array.from(this.elements[i].querySelectorAll(selector))
      array = array.concat(element2)
    }
    array.oldApi = this
    return jQuery(array)
  },
  end() {
    return this.oldApi
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i)
    }
    return this
  },
  parent() {
    const array = []
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode)
      }
    })
    return jQuery(array)
  },
  children() {
    const array = []
    this.each((node) => {
      array.push(...node.children)
    })
    return jQuery(array)
  },
  print() {
    console.log(this.elements)
  },
}
