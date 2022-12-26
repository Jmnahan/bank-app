import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Login(props) {
  const { onToggle } = props
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [didMatch, setDidMatch] = useState(false);

  const inputData = {
    email: email, 
    password: password
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(validate(inputData));

    let localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const userLoggedIn = [];
      localUsers.forEach(element => {
        if(element.email === email && element.password === password) {
          setDidMatch(true)
          navigate("./Dashboard")
          userLoggedIn.push(element);
          localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn))
        }
      });
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && didMatch) {
      console.log(inputData);
      navigate("/Dashboard");
    }
  },[error]);

  const validate = (value) => {
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!value.email) {
      error.email = "Email is required"
    } else if (!emailRegex.test(value.email)) {
      error.email = "Please enter a valid email"
    } else if (!value.password) {
      error.password = "Password is required"
    } else if (!didMatch) {
      error.password = "Incorrect email or password"
    } return error;
  }

  return (
    <section className="flex min-h-screen place-content-center place-items-center bg-slate-100 ">
      <div className="bg-white p-8 rounded-lg w-8/12">
      <h3 className="text-4xl py-3.5 text-center">Log in to your account</h3>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <label className="text-lg pt-3.5" htmlFor="email">Email:</label>
          <input className="indent-2 mx-1 my-1 focus:outline-slate-400 border-b-[1px] border-black w-auto h-8" type="text" 
          name="email" 
          id="email" 
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}/>
          <p className="text-red-400">{error.email}</p>

        <label className="text-lg pt-3.5" htmlFor="password">Password:</label>
          <input className="indent-2 mx-1 my-1 focus:outline-slate-400 border-b-[1px] border-black w-auto h-8" type="password" 
          name="password" 
          id="password" 
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}/>
          <p className="text-red-400">{error.password}</p>

      <button className="text-2xl mt-8 py-3.5 bg-slate-400 rounded-lg
       hover:bg-slate-500 hover:text-slate-200 ease-in duration-200" 
       type="submit">Login</button>
      </form>
      <p className="pt-5">Create a new account? 
        <button className="text-cyan-500" onClick={onToggle}>Register</button>
      </p>
      </div>
    </section>
  );
};
