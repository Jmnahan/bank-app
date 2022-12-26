
export default function ExpensesModal(props) {
  const { clickExpenses, setClickExpenses, addExpenses, expDescrip, setExpDescrip, amount, setAmount, 
  addExpensError } = props

  if(!clickExpenses) return null

  return (
    <div className="bg-backdrop backdrop-blur-lg justify-center items-center flex fixed inset-0 z-10" 
    onClick={() => setClickExpenses(false)}>
      <div className="flex flex-col bg-slate-200 w-1/4 p-8 rounded-2xl h-1/2" 
      onClick={(e) => {e.stopPropagation()}}>
        <h1 className="self-start text-4xl">Expenses</h1>
        <form className="flex flex-col mt-6 relative" onSubmit={addExpenses}>
          <label className="mb-2">Description</label>
          <textarea className="mb-4 h-28 p-0.5 rounded indent-1 focus:outline-slate-600 resize-none" 
            type="text" 
            maxLength={100}
            placeholder="Grocery" 
            value={expDescrip}
            onChange={(event) => setExpDescrip(event.target.value)}/>

          <label className="mb-2">Cost</label>
          <input className="mb-4 p-0.5 w-32 rounded focus:outline-slate-600 indent-1"
            type="number" 
            placeholder="0"
            min={0}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}/>

          { 
            addExpensError && (
              <p className="text-red-400 bottom-20 absolute">Not enough funds</p>
            )
          }

          <button className="w-36 py-1 mt-16 rounded text-center justify-center flex items-center bg-slate-300"  
            type="submit">Add Expenses</button>
        </form>
      </div>
    </div>
  )
}
