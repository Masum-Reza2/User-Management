import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTea = () => {

    const oldTea = useLoaderData();
    const { name, quantity, taste, color, price, category, photo, _id } = oldTea;


    const handleupdateTea = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const taste = form.taste.value;
        const color = form.color.value;
        const price = form.price.value;
        const category = form.category.value;
        const photo = form.photo.value;

        const updatedTea = { name, quantity, taste, color, price, category, photo };

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to overwrite the data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {

                //  client side update operation
                fetch(`http://localhost:5000/tea/${_id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatedTea),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.acknowledged) {
                            Swal.fire(
                                'Updated!',
                                'Your file has been Updated.',
                                'success'
                            )
                        }
                        else {
                            Swal.fire(
                                'Oops!',
                                'Got some error.',
                                'error'
                            )
                        }
                    });
            }
        })

    }

    return (
        <div className="w-[90%] mx-auto bg-orange-200 pt-3 rounded-md">
            <h1 className="text-center text-2xl font-semibold">Update Tea</h1>
            <div className="pt-5">
                <form onSubmit={handleupdateTea} className="space-y-10 py-10">

                    {/* name and quantity */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="name" defaultValue={name} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Tea Name" type="text" />
                        <input name="quantity" defaultValue={quantity} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="quantity" type="text" />
                    </div>

                    {/*  */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="taste" defaultValue={taste} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Taste" type="text" />
                        <input name="color" defaultValue={color} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Color" type="text" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="price" defaultValue={price} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Price" type="text" />
                        <input name="category" defaultValue={category} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Category" type="text" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="photo" defaultValue={photo} className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Photo URL" type="text" />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-outline">Update Tea</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateTea