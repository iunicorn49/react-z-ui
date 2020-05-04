import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend =
    index && context.mode === 'vertical' ? openSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpend)

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any

  /** 鼠标事件 */
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault() // 阻止默认行为
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}

  const mouseEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}
  const renderChildren = (
    menuOpen: boolean,
    pIndex: string,
    children: React.ReactNode
  ) => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${pIndex}-${idx}`,
        })
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })
    return (
      <Transition animation='zoom-in-top' in={menuOpen} timeout={300}>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...mouseEvents}>
      <div {...clickEvents} className='submenu-title'>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren(menuOpen, index as string, children)}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
