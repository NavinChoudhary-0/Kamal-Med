import UserInterface from "../components/Authentication/LoginInterface";
import UserHistory from "../components/Authentication/UserInterface";
import { useUser } from "../Provider/UserContext";

const AuthScreen = () => {
  const { loggedIn} = useUser();
  if(loggedIn){
    return <UserHistory/>
  }
  return <UserInterface/>;
};

export default AuthScreen;
