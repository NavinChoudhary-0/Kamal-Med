import { CartProvider } from "./CartContext";
import { UserAuthServicesProvider } from "./UserAuthContext";
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserAuthServicesProvider>
      <CartProvider>{children}</CartProvider>
    </UserAuthServicesProvider>
  );
};
export default AppProviders;
