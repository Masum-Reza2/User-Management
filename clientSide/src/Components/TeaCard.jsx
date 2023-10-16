import { Link } from "react-router-dom";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const TeaCard = ({ tea, teas, setTeas }) => {

    const { name, price, photo, _id } = tea;

    const handleDelete = (id) => {
        //  are you sure you want to delete
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/teas/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        // update UI state here
                        if (data.acknowledged) {
                            let remaining = teas?.filter(tea => tea._id !== id);
                            setTeas(remaining);
                        }
                    })

                Swal.fire(
                    'Deleted!',
                    'Your tea has been deleted.',
                    'success'
                )
            }
            else {
                Swal.fire(
                    'Cancelled!',
                    'Your file is safe!.',
                    'error'
                )
            }
        })
    }

    return (
        <div>
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                        src={photo}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {name}
                        </p>
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            ${price}
                        </p>
                    </div>
                    <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                        With plenty of talk and listen time, voice-activated Siri access, and an
                        available wireless charging case.
                    </p>
                </div>
                <div className="btn-group pb-3 justify-center space-x-2">
                    <button className="btn">View</button>
                    <Link to={`/updateTea/${_id}`}>
                        <button className="btn">Update</button>
                    </Link>
                    <button className="btn" onClick={() => handleDelete(_id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TeaCard