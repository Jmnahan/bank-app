import ProceedIcon from "../assets/right-to-bracket-solid.png";
import TransferIcon from "../assets/Transfer.png";
import TransferFooter from "../assets/Humaaans - 3.png";

export default function Transfer(props) {
  const { onTransfer, acctNumError, fundsError, sameAcctError, receiverError, transError, receiverAcc, setReceiverAcc, setAmount, amount } = props

  return(
    <section className="flex flex-col mx-5 mt-10 px-5 py-5">
      <div className="flex">
        <img className="h-2/5 w-2/5" alt="people-transacting-img" src={TransferIcon}/>
        <div className="flex flex-col ml-8">
          <h2 className="text-2xl">Transfer</h2>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur neque recusandae molestias et rerum fugiat voluptates enim.</p>
        </div>
      </div>
      <form className="flex flex-col items-start mt-16 relative" onSubmit={onTransfer}>
        <label className="py-1 text-lg">Recipient account number</label>
          <input className="indent-1 py-0.5 rounded focus:outline-slate-600 decoration-transparent" 
          type="number" 
          placeholder="e.g 21273579354"
          min={0}
          value={receiverAcc}
          onChange={(event) => setReceiverAcc(event.target.value)}/>

          {
            acctNumError && (
              <p className="text-red-400 py-5 mt-12 absolute">Please enter a 12-digit account number</p>
            )
          }

          {
            sameAcctError && (
              <p className="text-red-400 py-5 mt-12 absolute">Must not be the same to your account number</p>
            )
          }

          {
            receiverError && (
              <p className="text-red-400 py-5 mt-12 absolute">User doesn't exist</p>
            )
          }

        <label className="mt-6 py-1 text-lg" htmlFor="">Transfer Amount</label>
          <input className="indent-1 py-0.5 rounded focus:outline-slate-600" 
          type="number" 
          placeholder="0"
          min={0}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          />

          { 
            transError && (
              <p className="text-red-400 py-3 mt-36 absolute">Amount must be more than 0</p>
            )
          }
          
          {
            fundsError && (
              <p className="text-red-400 py-3 mt-36 absolute">Not enough funds</p>
            )
          }

        <div className="flex mt-20">
          <img className="mr-2 w-6" alt="proceed-icon" src={ProceedIcon}/>
          <button className="text-base" type="submit">Transfer</button>
        </div>
      </form>
      <img className="h-4/6 w-4/6 place-self-center mt-16" alt="two-person-art-img" src={TransferFooter}/>
    </section>
  )
}