// import Header from '../components/Header.tsx';
// import Footer from '../components/Footer.tsx';
import TreeLogo from '../components/TreeLogo.tsx';
import LoginSignup from '@/components/LogInSignUp/LoginSignup.jsx';

function Home() {
    return (
        <>      
            <div>
                <TreeLogo />
            </div>
            <div>
                <LoginSignup />
            </div>
        </>
    );
}

export default Home;