import React from 'react'
import './App.scss'

// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

const handleclick = (idx = 0) => {
  console.error('idx:', idx)
}

function App() {
  return (
    <div className='App'>
      <div>
        <Menu mode='vertical' defaultIndex={1} onSelect={handleclick}>
          <MenuItem index={0}>a</MenuItem>
          <MenuItem index={1}>b</MenuItem>
          <MenuItem index={2}>c</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default App
