import { createBrowserRouter } from "react-router-dom"
import MainLayOut from "../MainLayOut/MainLayOut"
import Home from "../Pages/Home"
import AddTea from "../Pages/AddTea"
import Users from "../Pages/Users"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import UpdateTea from "../Components/UpdateTea"

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayOut />,
        errorElement: <h1>Opps something wrong</h1>,
        children: [
            { path: '/', element: <Home />, loader: () => fetch('http://localhost:5000/teas') },
            { path: '/addTea', element: <AddTea /> },
            { path: '/users', element: <Users />, loader: () => fetch('http://localhost:5000/users') },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/updateTea/:id', element: <UpdateTea />, loader: ({ params }) => fetch(`http://localhost:5000/tea/${params.id}`) }
        ]
    }
])

export default Router