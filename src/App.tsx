import React, { useState } from 'react'
import './App.scss'

import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import Submenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className='App'>
      <Menu>
        <Submenu title='一级菜单 - 1'>
          <MenuItem>二级菜单 - 1</MenuItem>
          <MenuItem>二级菜单 - 2</MenuItem>
        </Submenu>
        <MenuItem>一级菜单 - 2</MenuItem>
      </Menu>
      <Button size='lg' onClick={() => setShow(!show)}>
        Toggle
      </Button>
      <Transition in={show} timeout={300} animation='zoom-in-left'>
        <div>lalala</div>
      </Transition>
      <Transition wrapper in={show} timeout={300} animation='zoom-in-left'>
        <Button size='lg'>A Large Button</Button>
      </Transition>
    </div>
  )
}

export default App
