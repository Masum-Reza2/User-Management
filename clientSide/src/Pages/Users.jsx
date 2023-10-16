import { useLoaderData } from "react-router-dom"

const Users = () => {
    const users = useLoaderData()
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
                                <button className="btn btn-sm">X</button>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users