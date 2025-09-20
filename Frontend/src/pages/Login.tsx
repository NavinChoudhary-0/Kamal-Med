import LoginInterface from "../components/Authentication/LoginInterface";
import UserHistory from "../components/Authentication/UserInterface";
import { useAuth } from "../Provider/UserAuthContext";

const AuthScreen = () => {
  const { isAuthenticated } = useAuth();
  if(isAuthenticated){
    return <UserHistory/>
  }
  return <LoginInterface/>;
};

export default AuthScreen;
