// Importing the authentication context
import AuthContext from "./authContext";

// Creating the context provider component
const AuthState = (props) => {
  // You can later fetch and update this user value using state and backend data
  const user = null;

  return (
    // Providing the context value to all child components that consume AuthContext
    <AuthContext.Provider value={{ user }}>
      {props.children} {/* All nested components will have access to `user` via AuthContext */}
    </AuthContext.Provider>
  );
};

export default AuthState;
