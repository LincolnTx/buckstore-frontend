import { ReactNode } from 'react';

import './styles.css';
interface NotFoundProps {
  children: ReactNode;
}

function NotFound({ children }: NotFoundProps) {
  return (
    <>
      <h1>NotFounded</h1>
      {children}
    </>
  );
}

export default NotFound;
