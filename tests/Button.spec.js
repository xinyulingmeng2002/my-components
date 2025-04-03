// tests/Button.spec.js
import { mount } from '@vue/test-utils'
import Button from '../src/components/Button/Button.vue'

describe('Button 组件', () => {
  test('正确渲染内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '点击我'
      }
    })
    expect(wrapper.text()).toContain('点击我')
  })

  test('触发点击事件', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})