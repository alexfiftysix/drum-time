import { ParamKeyValuePair, useSearchParams } from 'react-router-dom'
import { NoteOnly, ScaleBase } from '../utilities/numbered-scales'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // TODO: Don't ignore here, do the other thing
  const setParam = (toAdd: ParamKeyValuePair) => {
    setSearchParams({
      // @ts-ignore
      ...Object.fromEntries([...searchParams]),
      [toAdd[0]]: toAdd[1],
    })
  }

  const getParam = (name: keyof Param) => searchParams.get(name) || undefined

  return {
    scaleBase: (getParam('scaleBase') || 'major') as ScaleBase,
    startNote: (getParam('startNote') || 'c') as NoteOnly,
    mode: parseInt(getParam('mode') || '0'),

    setParam,
  }
}

type Param = {
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
}
