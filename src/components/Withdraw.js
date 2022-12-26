import ProceedIcon from "../assets/right-to-bracket-solid.png";
import WithdrawIcon from "../assets/Withdraw.png";
import WithdrawFooter from "../assets/Humaaans - 2.png";

export default function Withdraw(props) {
  const { amount, setAmount, onWithdraw, withError } = props
  
  return(
    <section className="flex flex-col mx-5 mt-10 px-5 py-5">
      <div className="flex">
        <img className="h-2/5 w-2/5" alt="people-holding-money-img" src={WithdrawIcon}/>
        <div className="flex flex-col ml-8">
          <h2 className="text-2xl">Withdraw</h2>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur neque recusandae molestias et rerum fugiat voluptates enim.</p>
        </div>
      </div>
      <form className="flex flex-col items-start mt-32 relative" id="form" onSubmit={onWithdraw}>
        <label className="py-2 text-lg">Withdraw Amount</label>
        <input className="indent-1 py-0.5 rounded focus:outline-slate-600" 
          type="number" 
          placeholder="0"
          min={0}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}/>

          {
            withError && (
              <p className="text-red-400 py-4 my-16 absolute">Not enough funds</p>
            )
          }

        <div className="flex mt-24">
          <img className="mr-2 w-6" alt="proceed-icon" src={ProceedIcon}/>
          <button className="text-base" 
          type="submit">Withdraw</button>
        </div>
      </form>
      <img className="h-4/6 w-4/6 place-self-center mt-16" alt="person-art-img" src={WithdrawFooter}/>
    </section>
  )
}
