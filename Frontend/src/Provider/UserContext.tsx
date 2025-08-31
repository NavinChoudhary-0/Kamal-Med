import { createContext, useContext ,ReactNode, useState} from 'react';
import User from '../interfaces/User';
import Order from '../interfaces/Order';

interface UserInterFace{
    user: User;
    setUser: (user: User) => void;
    orders: Order[];
    setOrders: (order: Order[]) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserInterFace|undefined>(undefined);

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

const UserProvider = ({children}: {children: ReactNode}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([{
        id: '',
        total: 0,
        date: '',
        status: '',
        products: [],
        trackingNumber: '',
        shippingAddress: '',
        estimatedDelivery: ''
    }]);
    const [user, setUser] = useState<User>({
        id: '0',
        firstName: 'Guest',
        lastName: '',
        email: '',
        contact: '',
        address: [],
        totalOrders: 0,
        loyaltyPoints: 0,
        totalSpent: 0
    })
    return (
        <UserContext.Provider value={{user, setUser, loggedIn, setLoggedIn, orders, setOrders}}>
            {children}
        </UserContext.Provider>
    )
}
export {useUser, UserProvider};