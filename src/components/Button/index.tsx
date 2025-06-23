import type React from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  icon: React.ReactNode;
  color?: 'play' | 'stop';
} & React.ComponentProps<'button'>;

export function Button ({ icon, color = 'play',  ...props }: ButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  )
}