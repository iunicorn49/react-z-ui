import React from 'react'
import './App.scss'

import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className='App'>
      <Button>普通</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Primary Large
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Danger Small
      </Button>
      <Button disabled>disabled</Button>
      <Button btnType={ButtonType.Link} href='www.baidu.com'>
        Link
      </Button>
      <Button btnType={ButtonType.Link} disabled href='www.baidu.com'>
        Link disabled
      </Button>
    </div>
  )
}

export default App
