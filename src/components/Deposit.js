import ProceedIcon from "../assets/right-to-bracket-solid.png";
import DepositIcon from "../assets/Deposit.png";
import DepositFooter from "../assets/Humaaans - 1.png";

export default function Deposit(props) {
  const { amount, setAmount, onDeposit, depError } = props

  return(
    <section className="flex flex-col mx-5 mt-10 px-5 py-5">
      <div className="flex">
        <img className="h-2/5 w-2/5" alt="piggy-bank-img" src={DepositIcon} />
        <div className="flex flex-col ml-8">
          <h2 className="text-2xl">Deposit</h2>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur neque recusandae molestias et rerum fugiat voluptates enim.</p>
        </div>  
      </div>
      <form className="flex flex-col items-start mt-32 relative" onSubmit={onDeposit}>
        <label className="py-2 text-lg">Deposit Amount</label>
        <input className="indent-1 py-0.5 rounded focus:outline-slate-600" 
          type="number" 
          placeholder="0"
          min={0}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}/>

          {
            depError && (
              <p className="text-red-400 py-4 my-16 absolute">Amount must not be 0</p>
            )
          }

        <div className="flex mt-24">
          <img className="mr-2 w-6" alt="proceed-icon" src={ProceedIcon}/>
          <button className="text-base" 
          type="submit">Deposit</button>
        </div>
      </form>
      <img className="h-4/6 w-4/6 place-self-center mt-16" alt="person-art-img" src={DepositFooter}/>
    </section>
  );
};
