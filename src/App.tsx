import React, { FC } from 'react'
import './App.scss'
import Upload from 'components/Upload/upload'

const App: FC = () => {
  const beforUpload = (file: File) => {
    console.log('beforUpload:', file)
    return true
  }
  const onChange = (file: File) => {
    console.log('onChange:', file)
  }
  const onSuccess = (data: any) => {
    console.log('onSuccess:', data)
  }
  const onError = (err: any) => {
    console.log('onError:', err)
  }
  const onProgress = (percentage: number, file: File) => {
    console.log('onProgress:', percentage, file)
  }
  return (
    <div className='app'>
      <div>
        <h1>UPLOAD</h1>
        <Upload
          beforUpload={beforUpload}
          onChange={onChange}
          onSuccess={onSuccess}
          onError={onError}
          onProgress={onProgress}
          action='http://jsonplaceholder.typicode.com/posts'
        />
      </div>
    </div>
  )
}

export default App
