import './styles/theme.css';
import './styles/global.css';
import { Heading } from './components/Heading/';
import { Container } from './components/Container/';

export function App() {
  return (
    <>
      <Container>
        <Heading>Welcome to Ignite Lab</Heading>
      </Container>
    </>
  )
}