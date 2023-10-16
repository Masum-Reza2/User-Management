import { useContext } from "react";
import { GlobalContext } from "../ControlRoom/ControlRoom";

const useGlobal = () => {
    const all = useContext(GlobalContext);
    return all;
}


export default useGlobal;