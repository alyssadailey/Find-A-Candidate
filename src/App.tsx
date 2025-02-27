import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
    {/* displays nav */}
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
