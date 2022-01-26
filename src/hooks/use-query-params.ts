import { useSearchParams } from 'react-router-dom'
import { NoteOnly, ScaleBase } from '../utilities/scales'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const setParam = <T extends keyof Param>(toAdd: MyParamKeyValuePair<T>) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      [toAdd[0]]: toAdd[1].toString(),
    })
  }

  const getParam = (name: keyof Param) => searchParams.get(name) || undefined

  return {
    tempo: parseInt(getParam('tempo') || '120'),
    swing: parseInt(getParam('swing') || '0'),
    songData: getParam('songData') || '',

    setParam,
  }
}

type Param = {
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
  tempo: number
  swing: number
  songData: string
}

type MyParamKeyValuePair<T extends keyof Param> = [T, Param[T]]
