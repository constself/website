import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // 定义一个名为 'animate' 的自定义指令
  nuxtApp.vueApp.directive('animate', {
    // mounted 钩子在指令绑定到元素后调用
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // 从 binding.value 中获取动画参数,如果未提供则使用默认值
      const name = binding.value.name || 'fadeIn' // 动画名称
      const duration = binding.value.duration || '1s' // 动画持续时间
      const delay = binding.value.delay || '0s' // 动画延迟时间
      const iterationCount = binding.value.iterationCount || '1' // 动画重复次数
      const threshold = binding.value.threshold || 0.1 // 交叉观察器的阈值

      // 创建一个 IntersectionObserver 实例
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // 当元素进入视口时
          if (entry.isIntersecting) {
            // 添加动画类和设置动画属性
            el.classList.add('animate__animated', `animate__${name}`)
            el.style.setProperty('--animate-duration', duration)
            el.style.setProperty('--animate-delay', delay)
            el.style.setProperty('--animate-repeat', iterationCount)
            // 停止观察元素
            observer.unobserve(el)
          }
        })
      }, { threshold }) // 设置观察器的阈值

      // 开始观察元素
      observer.observe(el)
    },
    // unmounted 钩子在指令与元素解绑时调用
    unmounted(el: HTMLElement) {
      // 清理观察器,防止内存泄漏
      const observer = IntersectionObserver.prototype
      if (observer) {
        observer.unobserve(el)
      }
    },
  })
})
