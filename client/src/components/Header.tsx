import React from 'react';
// uncommment once Nav component is done --- if needed ???
// import Navigation from './Navigation.jsx';
import TreeLogo from './TreeLogo';
import "@/components/Assets/Header.css"

function Header() {
  return (

    <header id="header" className="grid h-[175px] place-content-center place-items-center overflow-hidden bg-gradient-to-b from-green-900 to-amber-700">

      <div id="main_container"
        className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
        <div className="flex justify-center items-center size-40 m-5">
          <TreeLogo />
          <h1 id= "h1" className="title text-6xl font-black text-green-500">FruitTrail</h1>
        </div>

        {/* <h2 className="cursive text-6xl font-thin text-fuchsia-600">Vice City</h2> */}
      </div>
    </header>

  );
}


export default Header;