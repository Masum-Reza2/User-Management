import Swal from 'sweetalert2'

const AddTea = () => {

    const handleAddTea = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const taste = form.taste.value;
        const color = form.color.value;
        const price = form.price.value;
        const category = form.category.value;
        const photo = form.photo.value;

        const newTea = { name, quantity, taste, color, price, category, photo };

        fetch('http://localhost:5000/tea', {
            method: 'POST',
            body: JSON.stringify(newTea),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Good Job',
                        text: 'Tea added successfully!',
                    })
                    form.reset();
                }
            });
    }

    return (
        <div className="w-[90%] mx-auto bg-orange-200 pt-3 rounded-md">
            <h1 className="text-center text-2xl font-semibold">Add Tea</h1>
            <div className="pt-5">
                <form onSubmit={handleAddTea} className="space-y-10 py-10">

                    {/* name and quantity */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="name" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Tea Name" type="text" />
                        <input name="quantity" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="quantity" type="text" />
                    </div>

                    {/*  */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="taste" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Taste" type="text" />
                        <input name="color" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Color" type="text" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="price" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Price" type="text" />
                        <input name="category" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Category" type="text" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-10">
                        <input name="photo" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Photo URL" type="text" />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-outline">Add Tea</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTea