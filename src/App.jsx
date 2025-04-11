import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Search from './Components/Search'
import Edit from './Components/Edit'

let router=createBrowserRouter([
  {
    path:'/',
    element:<Search/>,
  },
  {
    path:'/edit/:id',
    element:<Edit/>
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
