import { Container } from './components/Container/';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import './styles/theme.css';
import './styles/global.css';
import { CountDown } from './components/CountDown';
import { Input } from './components/Input';


export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <form className="form" action="">
          <div className="formRow">
            <Input
              id='input'
              type='text'
              labelText='Nome do ciclo'
              placeholder='Dê um nome para o ciclo'
            />
          </div>

          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className="formRow">
            <p>Ciclos</p>
            <p>0 0 0 0 0 0</p>
          </div>

          <div className="formRow">
            <button>enviar</button>
          </div>
        </form>
      </Container>
    </>
  )
}