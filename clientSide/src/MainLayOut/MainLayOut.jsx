import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Spinner from "../Components/Spinner";

const MainLayOut = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Navbar />
            {
                navigation?.state === "loading" ?
                    <Spinner />
                    :
                    <div className="min-h-[80vh]">
                        <Outlet />
                    </div>
            }

        </div>
    )
}

export default MainLayOut