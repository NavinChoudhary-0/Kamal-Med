import Navbar from './Navbar';
import Footer from './Footer';
import {ReactNodeInterface} from '../../types/index';


const Layout = ({ children }: ReactNodeInterface) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;