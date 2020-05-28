import React from 'react'
import { storiesOf } from '@storybook/react'
import { AutoComplete, DataSourceType } from './autoComplete'
type lake = {
  value: string
  number: number
}
const DefaultAutoComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items)
        const formatItems = items.slice(0, 10).map((item: any) => {
          return {
            value: item.login,
            ...item,
          }
        })
        return formatItems
      })
  }

  const handleSelect = (item: DataSourceType) => {
    console.log(item)
  }
  const renderOption = (item: DataSourceType) => {
    const itemWn = item as DataSourceType<lake>
    return <h1>{itemWn.value}</h1>
  }
  return (
    <AutoComplete
      onSelect={handleSelect}
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete', module).add('Default', DefaultAutoComplete)
