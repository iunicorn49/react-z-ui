import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  ...testProps,
  mode: 'vertical',
}

const TestMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>a</MenuItem>
      <MenuItem disabled index={1}>
        b
      </MenuItem>
      <MenuItem index={2}>c</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  /**
   * beforeEach, 在每个测试函数开始前, 都会执行一遍
   */
  beforeEach(() => {
    wrapper = render(TestMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('a')
    disabledElement = wrapper.getByText('b')
  })
  afterEach(() => {
    cleanup()
  })
  it('should render correct Menu and MenuUtem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('c')
    fireEvent.click(thirdItem)
    expect(activeElement).not.toHaveClass('is-active')
    expect(thirdItem).toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    // cleanup() // 清除 beforeEach
    const wrapper = render(TestMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    console.log('menuElement:', menuElement)
    expect(menuElement).toHaveClass('menu menu-vertical test')
  })
})
