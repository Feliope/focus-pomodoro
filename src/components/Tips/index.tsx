import type { TaskStateModel } from "../../models/TaskStateModel";

export function Tips(state: TaskStateModel, nextCycleType: 'workTime' | 'shortBreakTime' | 'longBreakTime') {
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <b>{state.config.workTime} min.</b></span>,
    shortBreakTime: <span>Descanse por <b>{state.config.shortBreakTime} min.</b></span>,
    longBreakTime: <span>Descanse por <b>{state.config.longBreakTime} min.</b></span>
  }

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de <b>{state.config.workTime} min.</b></span>,
    shortBreakTime: <span>Próximo ciclo é um descanso de <b>{state.config.shortBreakTime} min</b>.</span>,
    longBreakTime: <span>Próximo ciclo é um descanso de <b>{state.config.longBreakTime} min</b>.</span>
  }
  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  )
}