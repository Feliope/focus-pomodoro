import { useRef } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { toastifyAdapter } from '../../adapter/toastifyAdapter';

import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { Tips } from '../Tips';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

import styles from './styles.module.css';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toastifyAdapter.dissmiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastifyAdapter.warn('Digite o nome da tarefa');
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

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })
    toastifyAdapter.success('Tarefa inciada com sucesso!');

  }

  function handleInterruptTask() {
    toastifyAdapter.dissmiss();
    toastifyAdapter.error('Tarefa interrompida!');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
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
          defaultValue={lastTaskName}
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