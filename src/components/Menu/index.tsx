import { BoltIcon, HistoryIcon, HouseIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink className={styles.menuLink}
        href="/"
        aria-label='Ir para a Home'
        title='Home'
      >
        <HouseIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink}
        href="/history/"
        aria-label='Ver Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink}
        href="#"
        aria-label='Ir para as Configurações'
        title='Configurações'
      >
        <BoltIcon />
      </RouterLink>

      <RouterLink className={styles.menuLink}
        href="#"
        aria-label='Mudar Tema'
        title='Tema'
        onClick={event => handleThemeChange(event)}
      >
        { nextThemeIcon[theme] }
      </RouterLink>
    </nav>
  )
}