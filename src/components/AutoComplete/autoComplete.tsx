import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from 'hooks/useDebounce'
import useClickOutside from 'hooks/useClickOutside'

interface DataSourceObject {
  value: string
}

// T & DataSourceObject 交叉类型
export type DataSourceType<T = {}> = T & DataSourceObject
// Omit => TS自带的方法, 忽略 InputProps 的 onSelect, 使用新的 onSelect
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  // 过滤条件
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  // 用户自定义模板
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSugestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false) // 用来判断, 是change事件(true)的时候, 才需要发送请求
  const componentRef = useRef<HTMLDivElement>(null) // 对这个组件的引用
  /** 里面会将inputValue做延迟更新, 将多次更新变为一次更新 */
  const debounceValue = useDebounce(inputValue, 500)
  const [showDropdown, setShowDropdown] = useState(false)
  useClickOutside(componentRef, () => {
    setSugestions([])
  })
  /** 更新debounceValue, 才会去发送请求 */
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setSugestions([])
    }
    setHighlightIndex(-1)
  }, [debounceValue])

  /** 这里只更改输入框的值 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const highlight = (index: number) => {
      if (index < 0) index = 0
      if (index >= suggestions.length) {
        index = suggestions.length - 1
      }
      setHighlightIndex(index)
    }
    switch (e.keyCode) {
      case 13:
        // 回车
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        // 上箭头
        highlight(highlightIndex - 1)
        break
      case 40:
        // 下箭头
        highlight(highlightIndex + 1)
        break
      case 27:
        // esc
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    onSelect && onSelect(item)
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setSugestions([])
        }}>
        <ul className='z-suggestion-list'>
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active ': index === highlightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className='z-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...restProps}
      />
      {loading && (
        <ul className='z-suggestion-list'>
          <li className='suggstions-loading-icon'>
            <Icon icon='spinner' spin />
          </li>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
