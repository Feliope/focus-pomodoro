import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { MainTemplate } from '../../templates/MainTemplate';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTaskOptions } from '../../utils/sortTasks';
import styles from './styles.module.css';
import { toastifyAdapter } from '../../adapter/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';


export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;


  const [sortTasksOptions, setSortTasksOptions] = useState<SortTaskOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc'
    };
  });

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field
      })
    }))
  }, [state.tasks]);

  useEffect(() => {
    document.title = 'Histórico de Tarefas | Focus Pomodoro';
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_TASK });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      toastifyAdapter.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTaskOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field
      }),
      direction: newDirection,
      field
    });
  }

  function handleResetHistory() {
    toastifyAdapter.dismiss();
    toastifyAdapter.confirm('Tem certeza que deseja apagar todo o histórico?', confirmation => {
      setConfirmClearHistory(confirmation);
    })
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <Button
                icon={<TrashIcon />}
                color='stop'
                aria-label='Apagar todo o histórico'
                title='Apagar Histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>
                    Tarefa ↕️
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>
                    Duração ↕️
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>
                    Data ↕️
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo'
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold'}}>Ainda não existem tarefas criadas</p>
        )}
      </Container>
    </MainTemplate>
  );
}