import { observer } from 'mobx-react-lite'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { ScaleSelector } from '../scaleSelector/ScaleSelector'
import { SwingSetter } from '../sequencer/swingSetter/SwingSetter'
import { Clear } from '../clear/Clear'
import { Share } from '../share/Share'
import { LengthSetter } from '../noteCountSetter/LengthSetter'
import { GoStop } from '../goStop/GoStop'

export const Controller = observer(() => (
  <div className={styles.root}>
    <GoStop />
    <Clear />
    <ScaleSelector />
    <LengthSetter />
    <TempoSetter />
    <SwingSetter />
    <Share />
  </div>
))
