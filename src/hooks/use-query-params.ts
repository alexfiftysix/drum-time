import { ParamKeyValuePair, useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // TODO: Don't ignore here, do the other thing
  const addParam = (toAdd: ParamKeyValuePair) => {
    setSearchParams({
      // @ts-ignore
      ...Object.fromEntries([...searchParams]),
      [toAdd[0]]: toAdd[1],
    })
  }

  const getParam = (name: string) => searchParams.get(name) || undefined

  return {
    addParam,
    getParam,
  }
}
