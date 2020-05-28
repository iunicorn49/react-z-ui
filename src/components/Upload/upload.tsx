import React, { FC, useRef, ChangeEvent } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string
  beforUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (data: any, file: File) => void
  onChange?: (file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onError,
    onSuccess,
    beforUpload,
    onChange,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforUpload) {
        post(file)
      } else {
        const result = beforUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile))
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            onProgress && onProgress(percentage, file)
          }
        },
      })
      .then((res) => {
        onSuccess && onSuccess(res.data, file)
        onChange && onChange(file)
      })
      .catch((err) => {
        onError && onError(err, file)
        onChange && onChange(file)
      })
  }

  return (
    <div className='z-upload-component'>
      <Button btnType='primary' onClick={handleClick}>
        UPLOAD FILE
      </Button>
      <input
        onChange={handleFileChange}
        style={{ display: 'none' }}
        type='file'
        className='z-file-input'
        ref={fileInput}
      />
    </div>
  )
}

export default Upload
