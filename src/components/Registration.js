import { useState, useEffect } from "react";

export default function Registration(props) {
  const { onToggle, setIsSignedUp } = props
  const generateAccountNum = () => {
    return Math.floor( 100000000000 + Math.random() * 900000000000)
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acountNum, setAccountNum] = useState();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userData = {
    name: name, 
    email: email,
    password: password,
    accountNum: acountNum,
    balance: balance,
  }

  const userOne = JSON.stringify({
  name: "Juan Cruz", email: "juan@gmail.com", password: "12345678", accountNum: 215488233578, balance:0})
  const userTwo = JSON.stringify({
  name: "Maria Clara", email: "maria@gmail.com", password: "12345678", accountNum: 817826505047, balance: 0})

  let localUsers = JSON.parse(localStorage.getItem("localUsers") || `[${userOne}, ${userTwo}]`);
  localStorage.setItem("localUsers",JSON.stringify(localUsers));
  let userExists = false;
  localUsers.forEach(element => {
    if(element.email === userData.email) {
      userExists = true;
    }
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(validate(userData));
    setIsSubmitted(true);
    setAccountNum(generateAccountNum())
    setBalance(0)
  } 

  useEffect(()=> {
    // console.log(error)
    if (Object.keys(error).length === 0 && isSubmitted) {
      setIsSignedUp("login")
      localUsers.push(userData)
      localStorage.setItem("localUsers",JSON.stringify(localUsers));
    }
  }, [error]);

  const validate = (value) => {
    const error = {};
    const nameRegex = /^\S+\s\S+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!nameRegex.test(value.name)) {
      error.name = "Please enter your full name";
    } else if (!emailRegex.test(value.email)) {
      error.email = "Please enter a valid email";
    } else if (userExists) {
      error.email = "This email is already taken"
    } else if((password.length <= 7)) {
      error.password = "Password must be at least 8 characters"
    } return error
  };

  return (
    <section className="flex min-h-screen place-content-center place-items-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg w-8/12">
      <h3 className="text-4xl py-3.5 text-center">Join us</h3>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>

        <label className="text-lg pt-3.5" htmlFor="name">Name:</label>
        <input className="indent-2 mx-1 my-1 focus:outline-slate-400 border-b-[1px] border-black w-auto h-8" type="text" 
        name="name" 
        id="name" 
        value={name}
        placeholder="Enter Full Name"
        onChange={(event) => setName(event.target.value)}/>
        <p className="text-red-400">{error.name}</p>

        <label className="text-lg pt-3.5" htmlFor="email">Email:</label>
        <input className="indent-2 mx-1 my-1 focus:outline-slate-400 border-b-[1px] border-black w-auto h-8" type="text" 
        name="email" 
        id="email" 
        value={email}
        placeholder="Enter email"
        onChange={(event) => setEmail(event.target.value)}/>
        <p className="text-red-400">{error.email}</p>

        <label className="text-lg pt-3.5" htmlFor="password">Password:</label>
        <input className="indent-2 mx-1 my-1 focus:outline-slate-400 border-b-[1px] border-black w-auto h-8" type="password" 
        name="password" 
        id="password" 
        value={password}
        placeholder="Enter password"
        onChange={(event) => setPassword(event.target.value)}/>
        <p className="text-red-400">{error.password}</p>

        <button className="text-2xl mt-8 py-3.5 bg-slate-400 rounded-lg
         hover:bg-slate-500 hover:text-slate-200 ease-in duration-200" 
        type="submit">Register</button>
      </form>
      <p className="pt-5">Already have an account? 
        <button className="text-cyan-500" onClick={onToggle}>Log in</button>
      </p>
      </div>
    </section>
  );
};
