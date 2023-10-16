import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import Swal from "sweetalert2"

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)

    const handleDelete = (id) => {

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

                fetch(`https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/user/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.acknowledged) {
                            Swal.fire(
                                'Deleted!',
                                'Your user has been deleted.',
                                'success'
                            )
                            let remaining = users?.filter(user => user?._id !== id);
                            setUsers(remaining);
                        }
                        else {
                            Swal.fire(
                                'Something went wrong'
                            )
                        }
                    })
            }
            else {
                Swal.fire(
                    'Cancelled!',
                    'Your user is safe.',
                    'error'
                )
            }
        })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>isVerified</th>
                            <th>Account Created at</th>
                            <th>last Login Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.userEmail}</td>
                                <td>{user.userVerified ? 'Verified use' : 'Not verified'}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastLoginTime}</td>
                                <td className="btn btn-sm" onClick={() => handleDelete(user?._id)}>X</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users