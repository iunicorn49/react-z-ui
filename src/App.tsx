import React from 'react'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import './App.scss'

// import Button, { ButtonType, ButtonSize } from './components/Button/button'
// import Menu from './components/Menu/menu'
// import MenuItem from './components/Menu/menuItem'
// import Submenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
library.add(fas)
function App() {
  return (
    <div className='App'>
      <div>
        <Icon icon='arrow-down' size='lg' theme='danger' />
      </div>
    </div>
  )
}

export default App
