import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, Setauth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const ParseData = JSON.parse(data);
      Setauth({
        ...auth,
        user: ParseData.user,
        token: ParseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, Setauth]}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
