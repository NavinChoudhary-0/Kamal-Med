import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <CartProvider>
           <UserProvider>
                {children}
           </UserProvider>
        </CartProvider>
    );
  };
export default AppProviders;  