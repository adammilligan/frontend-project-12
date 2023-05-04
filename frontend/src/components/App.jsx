import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
