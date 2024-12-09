// plugins/number-scroll.ts
import type { DirectiveBinding } from 'vue'
import { defineNuxtPlugin } from '#app'

// 定义指令选项接口
interface NumberScrollOptions {
  startVal?: number // 起始值
  endVal?: number // 结束值
  duration?: number // 动画持续时间（毫秒）
  decimals?: number // 小数位数
  useEasing?: boolean // 是否使用缓动函数
  decimal?: string // 小数点符号
}

// 缓动函数：创建一个非线性的动画效果
function easingFn(t: number, b: number, c: number, d: number): number {
  return c * (-(2 ** (-10 * t / d)) + 1) * 1024 / 1023 + b
}

// 定义并导出 Nuxt 插件
export default defineNuxtPlugin((nuxtApp) => {
  // 注册自定义指令 'number-scroll'
  nuxtApp.vueApp.directive('number-scroll', {
    // 当绑定元素插入到 DOM 中时调用
    mounted(el: HTMLElement, binding: DirectiveBinding<NumberScrollOptions>) {
      // 解构指令选项，设置默认值
      const options = binding.value || {}
      const startVal = options.startVal ?? 0
      const endVal = options.endVal ?? 0
      const duration = options.duration ?? 2000
      const decimals = options.decimals ?? 0
      const useEasing = options.useEasing !== false
      const decimal = options.decimal ?? '.'

      let frameVal = startVal
      let startTime: number | null = null

      // 格式化数字，处理小数点
      function formatNumber(num: number): string {
        return num.toFixed(decimals).replace('.', decimal)
      }

      // 计算并更新数值的函数
      function count(timestamp: number): void {
        if (!startTime)
          startTime = timestamp
        const progress = timestamp - startTime

        // 根据是否使用缓动来计算当前帧的值
        if (useEasing) {
          if (startVal > endVal) {
            frameVal = startVal - easingFn(progress, 0, startVal - endVal, duration)
          }
          else {
            frameVal = easingFn(progress, startVal, endVal - startVal, duration)
          }
        }
        else {
          frameVal = startVal + (endVal - startVal) * (progress / duration)
        }

        // 确保 frameVal 不会超过 endVal
        frameVal = startVal > endVal ? Math.max(endVal, frameVal) : Math.min(endVal, frameVal)

        // 更新元素文本
        el.textContent = formatNumber(frameVal)

        // 如果动画未完成，继续下一帧
        if (progress < duration) {
          requestAnimationFrame(count)
        }
        else {
          // 动画完成，设置最终值
          el.textContent = formatNumber(endVal)
        }
      }

      // 开始动画
      function startAnimation(): void {
        requestAnimationFrame(count)
      }

      // 仅在客户端执行
      if (import.meta.client) {
        // 创建 Intersection Observer 以检测元素是否可见
        const observer = new IntersectionObserver((entries) => {
          // 当元素可见时开始动画
          if (entries.length > 0 && entries[0] && entries[0].isIntersecting) {
            startAnimation()
            observer.disconnect() // 动画开始后停止观察
          }
        })

        // 开始观察元素
        observer.observe(el)
      }
    },
  })
})
