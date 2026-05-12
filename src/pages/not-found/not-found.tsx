import type { ReactNode } from 'react';

import styles from './not-found.module.css';
export default function NotFound(): ReactNode {
  return (
    <div className={styles.notFound}>
      <h1 className="text text_type_main-large">Страница не найдена(</h1>
    </div>
  );
}
