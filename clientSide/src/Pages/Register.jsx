import Swal from "sweetalert2";
import useGlobal from "../Hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";

const Register = () => {
    const navigate = useNavigate();
    const { createUser } = useGlobal();

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // craeting user
        createUser(email, password)
            .then(result => {
                const newUser = result.user;
                console.log(newUser)
                //  signing out
                signOut(auth);
                Swal.fire('Account created!')
                form.reset()
                navigate('/login');

                // sending to database
                const userEmail = newUser?.email;
                const userVerified = newUser?.emailVerified;
                const createdAt = newUser?.metadata?.creationTime;
                const doc = { userEmail, userVerified, createdAt }
                fetch('https://server-side-fz2dd7k4e-masum-rezas-projects.vercel.app/user', {
                    method: 'POST',
                    body: JSON.stringify(doc),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.acknowledged) {
                            Swal.fire('User Data send to database!')
                        }
                        else {
                            Swal.fire('Something went wrong!')
                        }
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
                        <h1 className="text-5xl font-bold">Registration now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleRegister}>
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
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register