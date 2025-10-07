import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.auth && 
					<><Link to="/login">
						<button className="btn btn-primary me-1">Login</button>
					</Link>
					<Link to="/register">
						<button className="btn btn-primary">Register</button>
					</Link>
					</>}
					
					{store.auth && <Link to="/private">
						<button className="btn btn-primary">Private</button>
					</Link>}

				</div>
			</div>
		</nav>
	);
};