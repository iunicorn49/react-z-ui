import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from './button'

const defultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => {
  return (
    <div>
      <Button size='lg'>lager button</Button>
      <Button>normal button</Button>
      <Button size='sm'>small button</Button>
    </div>
  )
}

const buttonWithType = () => {
  return (
    <div>
      <Button btnType='primary'>primary button</Button>
      <Button btnType='danger'>danger button</Button>
      <Button btnType='link'>link button</Button>
    </div>
  )
}

storiesOf('Button Component', module)
  .add('Default Button', defultButton)
  .add('Button with size', buttonWithSize)
  .add('Button with type', buttonWithType)
