import './styles/application.scss';
import ReactDOM from 'react-dom/client';
import Init from './Init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await Init());
};

app();
