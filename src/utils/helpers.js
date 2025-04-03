export const formatSize = (size) => {
    const sizes = {
      small: '12px',
      medium: '14px',
      large: '16px'
    }
    return sizes[size] || sizes.medium
  }
  
  export const debounce = (fn, delay = 300) => { // 节流：在指定时间内只执行一次
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }