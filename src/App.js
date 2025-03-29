import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCandidate from './components/AddCandidate';
import ExistingApplicants from './components/ExistingApplicants';
import Applayout from './components/Applayout';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Applayout />,
      children: [
        {
          path: "/add-new-candidate",
          element: <AddCandidate />
        },
        {
          path: "/existing-applications",
          element: <ExistingApplicants />
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
