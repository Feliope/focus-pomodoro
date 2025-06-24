import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </Container>
    </MainTemplate>
  )
}