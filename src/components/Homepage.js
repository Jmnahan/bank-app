import { useState } from "react";
import Logo from "../assets/building-columns-solid.png";
import BgImage from "../assets/krakenimages-376KN_ISplE-unsplash.jpg";
import Registration from "./Registration";
import Login from "./Login";

export default function Homepage() {
  const [isSignedUp, setIsSignedUp] = useState("register")

  const onToggle = () => {
    setIsSignedUp(isSignedUp === "register" ? "login" : "register")
  }

  return (
    <section className="flex flex-row w-full" >
      <section className="w-3/5 min-h-screen flex flex-col place-self-center place-content-center relative" style={{ backgroundImage: `url(${BgImage})`,  backgroundSize: 'cover'}}>
        <div className="flex absolute top-12 left-12">
          <img className="w-10" alt="locale-bank-icon" src={Logo}/>
          <h1 className="ml-3 text-4xl text-slate-700">Locale Bank</h1>
        </div>
        <div className="flex flex-col place-self-center text-center bg-slate-100 p-12 rounded-lg">
          <p className="text-4xl">We also find ways</p>
          <p className="text-center mt-4">Protect your future by saving your money inside your locale storage.</p>
        </div>
      </section>
      <section className="w-2/5">
          {isSignedUp === "register" && (
            <Registration
            onToggle={onToggle}
            setIsSignedUp={setIsSignedUp}
            />
          )}
          {isSignedUp === "login" && (
            <Login
            onToggle={onToggle}
            />  
          )}
      </section>
    </section>
  );
};
