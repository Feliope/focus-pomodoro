import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

import styles from './styles.module.css';
import { Tips } from '../Tips';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    };

    dispatch({type: TaskActionTypes.START_TASK, payload: newTask})
  }

  function handleInterruptTask() {
    dispatch({type: TaskActionTypes.INTERRUPT_TASK})
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <Input
          id='input'
          type='text'
          labelText='Nome do ciclo'
          placeholder='Dê um nome para o ciclo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className={styles.formRow}>
        {Tips(state, nextCycleType)}
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask ? (
          <Button
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            icon={<PlayCircleIcon />}
            type='submit'
            color='play'
            key='button_submit'
          />
        ) : (
          <Button
            aria-label='Parar tarefa em andamento'
            title='Parar tarefa em andamento'
            icon={<StopCircleIcon />}
            type='button'
            color='stop'
            onClick={handleInterruptTask}
            key='button_interrupt'
          />
        )}
      </div>
    </form>
  )
}