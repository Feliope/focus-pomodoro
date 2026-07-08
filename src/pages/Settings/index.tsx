import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { SaveIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { toastifyAdapter } from '../../adapter/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import styles from '../../components/MainForm/styles.module.css';

export function Settings() {
  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
      document.title = 'Configurações | Focus Pomodoro';
    }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastifyAdapter.dismiss();

    const formErrors: string[] = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números válidos para TODOS os campos.');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('O tempo de foco deve ser entre 1 e 99 minutos.');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('O tempo de descanso curto deve ser entre 1 e 30 minutos.');
    }
    
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('O tempo de descanso longo deve ser entre 1 e 99 minutos.');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => toastifyAdapter.error(error));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime
      }
    });
    toastifyAdapter.success('Configurações salvas com sucesso!');
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>
          Configurações
        </Heading>
      </Container>
      
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e descanso longo.
        </p>
      </Container>

      <Container>
        <form onSubmit={ handleSaveSettings } action='' className={styles.form}>
          <div className={styles.formRow}>
            <Input
              id='workTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <Input
              id='shortBreakTime'
              labelText='Descanso Curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <Input
              id='longBreakTime'
              labelText='Descanso Longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <Button
              icon={<SaveIcon />}
              aria-label='Salvar Configurações'
              title='Salvar Configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  )
}