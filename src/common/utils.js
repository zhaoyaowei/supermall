// 防抖: 实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法
// 缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟
export function debounce(fn, delay) {
  // 创建一个标记来存放定时器的返回值
  let timer = null
  return function(...args) {
    // 每当用户操作时,把之前的计时器清零
    if (timer) clearTimeout(timer)
    // 然后又创建一个新的 setTimeout, 这样就能保证interval间隔内如果时间持续触发，就不会执行fn函数
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}