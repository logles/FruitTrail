import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import TreeLogo from '../components/TreeLogo.tsx';

function Home() {
    return (
        <div>
            <Header />
        </div>
        
            <div>
                <TreeLogo />
            </div>

        <div>
            <Footer />
        </div>
    );
}

export default Home;