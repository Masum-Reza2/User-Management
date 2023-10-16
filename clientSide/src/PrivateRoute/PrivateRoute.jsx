import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useGlobal from "../Hooks/useGlobal"

const PrivateRoute = ({ children }) => {

    const { user, loading } = useGlobal();
    const location = useLocation()
    console.log(location)

    if (loading) {
        return <Spinner />
    }
    if (user) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
}

export default PrivateRoute