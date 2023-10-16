import { createBrowserRouter } from "react-router-dom"
import MainLayOut from "../MainLayOut/MainLayOut"
import Home from "../Pages/Home"
import AddTea from "../Pages/AddTea"
import Users from "../Pages/Users"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import UpdateTea from "../Components/UpdateTea"
import PrivateRoute from "../PrivateRoute/PrivateRoute"

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayOut />,
        errorElement: <h1>Opps something wrong</h1>,
        children: [
            { path: '/', element: <PrivateRoute><Home /></PrivateRoute>, loader: () => fetch('https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/teas') },
            { path: '/addTea', element: <PrivateRoute><AddTea /></PrivateRoute> },
            { path: '/users', element: <PrivateRoute><Users /></PrivateRoute>, loader: () => fetch('https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/users') },


            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/updateTea/:id', element: <UpdateTea />, loader: ({ params }) => fetch(`https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/tea/${params.id}`) }
        ]
    }
])

export default Router