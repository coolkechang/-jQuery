jQuery('.test').addClass('red').addClass('blue')
//jquery 不返回 elements , 返回的是 api 对象
//因为jQuery是全局变量，这里是window.jquery的简写
//addClass 的作用就是遍历所有刚才获取的元素，返回前面的東西，這裡是api
//链式操作：用api调了一个函数，这个函数返回了前面的对象，于是可以继续调 addClass 。能如此做到的原因就是“ return 对象  ”;如过“ return null ”,那么就只加一个，链不下去了。
/*
上述代码是以下代码的简写，省略了声明

const api = window.jQuery(".test"); 
api.addClass("red").addClass("blue"); 

*/

const api1 = jQuery('.test1')
const api2 = api1.find('.child').addClass('red').addClass('green')
//jQuery('.test1').find('.child').addClass('red').addClass('green');
const oldApi = api2.end().addClass('yellow')

const x = jQuery('.test2').find('.child')
x.each((div) => console.log(div))
/*
这句代码表示打印出x对应的元素。（对应jQuery.js中 each部分）
x是可以操作child的api ; 
(div) => console.log(div) 就是函数fn，它会被each调用
div是参数，对应着elements[i]。可以改成xy等
*/

const y = jQuery('.test2')
y.parent().print()
y.children().print()
