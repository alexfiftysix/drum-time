import { useSearchParams } from 'react-router-dom'
import { NoteOnly, ScaleBase } from '../utilities/numbered-scales'

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
    scaleBase: (getParam('scaleBase') || 'major') as ScaleBase,
    startNote: (getParam('startNote') || 'c') as NoteOnly,
    mode: parseInt(getParam('mode') || '0'),
    tempo: parseInt(getParam('tempo') || '120'),
    swing: parseInt(getParam('swing') || '0'),

    setParam,
  }
}

type Param = {
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
  tempo: number
  swing: number
}

type MyParamKeyValuePair<T extends keyof Param> = [T, Param[T]]
