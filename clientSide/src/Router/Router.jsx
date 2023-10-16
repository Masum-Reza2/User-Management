import { createBrowserRouter } from "react-router-dom"
import MainLayOut from "../MainLayOut/MainLayOut"
import Home from "../Pages/Home"
import AddTea from "../Pages/AddTea"
import Users from "../Pages/Users"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayOut />,
        errorElement: <h1>Opps something wrong</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/addTea', element: <AddTea /> },
            { path: '/users', element: <Users /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> }
        ]
    }
])

export default Router