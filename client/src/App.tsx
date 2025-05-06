import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apollo } from './api/apollo.ts';
// uncomment when Navbar component has been made
// import Navbar from './components/Navbar'; 

function App() {

  return (
    <ApolloProvider client={apollo}>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
    </ApolloProvider>
)
}

export default App

