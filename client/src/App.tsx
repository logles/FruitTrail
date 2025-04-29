import { Outlet } from 'react-router-dom';

// uncomment when Navbar component has been made
// import Navbar from './components/Navbar'; 

function App() {

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App