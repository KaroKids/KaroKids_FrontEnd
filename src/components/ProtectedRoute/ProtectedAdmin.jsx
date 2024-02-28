import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/AuthContext";
import { getUserByEmail } from "@/redux/userAction";

export const ProtectedAdmin = ({ children }) => {
	const dispatch = useDispatch();
	const { user } = useContext(authContext);
	const userGlobal = useSelector((state) => state.users.user);

	useEffect(() => {
		dispatch(getUserByEmail(user.email));
	}, [dispatch, user.email]);

	console.log(userGlobal.roles);

	if (userGlobal && userGlobal.roles === "client") {
		return <Navigate to="/" replace />;
	} else {
		return children;
	}
};
