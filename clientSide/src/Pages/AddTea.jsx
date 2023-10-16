const AddTea = () => {
    return (
        <div className="w-[90%] mx-auto bg-orange-200 pt-3 rounded-md">
            <h1 className="text-center text-2xl font-semibold">Add Tea</h1>
            <div className="pt-5">
                <form className="space-y-10 py-10">

                    {/* name and quantity */}
                    <div className="flex items-center justify-center gap-10 px-10">
                        <input name="name" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Tea Name" type="text" />
                        <input name="quantity" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="quantity" type="text" />
                    </div>

                    {/*  */}
                    <div className="flex items-center justify-center gap-10 px-10">
                        <input name="taste" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Taste" type="text" />
                        <input name="color" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Color" type="text" />
                    </div>
                    <div className="flex items-center justify-center gap-10 px-10">
                        <input name="price" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Price" type="text" />
                        <input name="category" className="w-full py-2 rounded-md placeholder:pl-3" placeholder="Category" type="text" />
                    </div>
                    <div className="flex items-center justify-center gap-10 px-10">
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