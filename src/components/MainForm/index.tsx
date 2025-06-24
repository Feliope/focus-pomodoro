import { Input } from '../Input';
import { Cycles } from '../Cycles';
import { Button } from '../Button';

import { PlayCircleIcon } from 'lucide-react';

import styles from './styles.module.css';


export function MainForm() {
  return (
    <form className={styles.form} action="">
      <div className={styles.formRow}>
        <Input
          id='input'
          type='text'
          labelText='Nome do ciclo'
          placeholder='Dê um nome para o ciclo'
        />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <Cycles />
      </div>

      <div className={styles.formRow}>
        <Button
          icon={<PlayCircleIcon />}
          color='play'
        />
      </div>
    </form>
  )
}