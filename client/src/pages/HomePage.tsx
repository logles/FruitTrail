// import Header from '../components/Header.tsx';
// import Footer from '../components/Footer.tsx';
import TreeLogo from '../components/TreeLogo.tsx';
import LoginSignup from '@/components/LogInSignUp/LoginSignup.jsx';

function Home() {
    return (
        <>
            <header class="grid h-[175px] place-content-center place-items-center overflow-hidden w-screen">
                <div id="main_container"
                    class="relative grid place-content-center place-items-center">
                    <div class="flex justify-center items-center size-40 m-5">
                        <TreeLogo />
                    </div>

                    {/* <h2 class="cursive text-6xl font-thin text-fuchsia-600">Vice City</h2> */}
                </div>
            </header>
            <div>
                <LoginSignup />
            </div>
        </>
    );
}

export default Home;