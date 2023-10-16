import Swal from "sweetalert2";
import useGlobal from "../Hooks/useGlobal";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { loginUser } = useGlobal();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // login user
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire('Login successful!')

                // updattin login time in database
                const lastLoginTime = user?.metadata?.lastSignInTime
                const doc = { email, lastLoginTime }
                fetch('https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/user', {
                    method: 'PATCH',
                    body: JSON.stringify(doc),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        navigate(state || '/')
                    });
            })
            .catch(error => {
                Swal.fire(error.message)
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-1/4">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Create Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login