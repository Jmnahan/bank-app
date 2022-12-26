import TransactionsIcon from "../assets/Transactions.png";

export default function Transactions(props) {
  const { transRecords } = props

  const records = transRecords.map(record => {
    return <tr className="mx-5 w-full text-center odd:bg-slate-200 even:bg-slate-300">
            <td className="w-1/6 py-2 px-1">{record.id}</td>
            <td className="w-1/7">{record.type}</td>
            <td className="w-1/7">₱ {record.amount}</td>
            <td className="w-1/7">{record.date}</td>
            <td className="w-1/7">{record.time}</td>
            <td className="w-1/7">{record.from}</td>
            <td className="w-1/7">{record.to}</td>
           </tr>
  })
  
  return(
    <section className="flex flex-col mt-10 px-5 py-5 ">
      <div className="flex">
        <img className="h-3/5 w-3/5" alt="transaction-icon" src={TransactionsIcon}/>
        <div className="flex flex-col ml-8">
          <h2 className="text-2xl">Transaction History</h2>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur neque recusandae molestias et rerum fugiat voluptates enim.</p>
        </div>
      </div>
        <table className="bg-slate-300 rounded-tl-lg rounded-tr-lg border">
          <thead className="">
            <tr className="bg-slate-400">
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">Id</th>
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">Type</th>
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">Amount </th>
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">Date</th>
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">Time</th>
              <th className="py-2 border-black border-b-[1px] border-r-[1px]">From</th>
              <th className="py-2 border-black border-b-[1px]">To</th>
            </tr>
          </thead>
          <tbody>
            {records}
          </tbody>
        </table>
    </section>
  )
}
