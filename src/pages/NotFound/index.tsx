import { ReactNode } from 'react';

import './styles.css';
import Error from '../../assets/404..png';
import PageHeader from '../../components/PageHeader';

interface NotFoundProps {
  children: ReactNode;
}

function NotFound({ children }: NotFoundProps) {
  return (
   <>
    <PageHeader />
      <div className="not-found-container">
          <img src={Error} alt="erro 404" />
          <h2>A página que você esta procurando não existe</h2>
          <p>Talvez você tenha errado o endereçõ na barra</p>
        </div>
   </>
  );
}

export default NotFound;
