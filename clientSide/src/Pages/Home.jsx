import { useLoaderData } from "react-router-dom"
import TeaCard from "../Components/TeaCard";
import { useState } from "react";

const Home = () => {
    const loadedTeas = useLoaderData();
    const [teas, setTeas] = useState(loadedTeas)
    return (
        <div className="w-[90%] mx-auto">

            <h1 className="text-center text-2xl font-bold">Available Teas : {teas?.length}</h1>

            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 place-items-center">
                {
                    teas?.map(tea => <TeaCard key={tea._id} tea={tea} teas={teas} setTeas={setTeas} />)
                }
            </div>
        </div>
    )
}

export default Home