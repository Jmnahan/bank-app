import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v1 as uuidv1} from 'uuid';
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";
import Transactions from "./Transactions";
import ExpensesModal from "./ExpensesModal";
import Modal from "./Modal";
import ExpensList from "./ExpensList";
import Logo from "../assets/building-columns-solid.png";
import PlusSign from "../assets/plus-solid.png";
import NotifIcon from "../assets/envelope-solid.png";
import CardBgImg from "../assets/card-bg.jpg";
import DashboardBg from "../assets/Dashboard-bg.jpg";


export default function Dashboard() {
  const navigate = useNavigate();
  const [userActions, setUserActions] = useState("Deposit");
  const [clickModal, setClickModal] = useState(false);
  const [clickExpenses, setClickExpenses] = useState(false);

  const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn") || "[]");

  const [amount, setAmount] = useState(0);
  const [depError, setDepError] = useState(false);
  const [withError, setWithError] = useState(false);
  const [transError, setTransError] = useState(false);
  const [acctNumError, setAcctNumError] = useState(false);
  const [sameAcctError, setSameAcctError] = useState(false);
  const [receiverError, setReceiverError] = useState(false);
  const [fundsError, setFundsError] = useState(false);
  const [receiverAcc, setReceiverAcc] = useState(0);
  const doesUserExist = localUsers.some(user => user.accountNum === Number(receiverAcc))
  const amt = Number(amount);
  let receiverBalance = 0;
  let newBalance = 0;
  let user = {};
  let receiverAccount = {};
  
  localUsers.forEach(element => {
    if(element.email === userLoggedIn[0].email) {
      user = element;
    } else if (element.accountNum === Number(receiverAcc)) {
      receiverAccount = element;
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/")
    localStorage.removeItem("records");
    localStorage.getItem("userLoggedIn", JSON.stringify(userLoggedIn));
    localStorage.removeItem("userLoggedIn");
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [expDescrip, setExpDescrip] = useState("");
const [expensRecord, setExpensRecord] = useState([]);
const [addExpensError, setAddExpensError] = useState(false);
const [expenses, setExpenses] = useState({
  id: "",
  description: "",
  cost: 0,
})

const addToExpenses = (expenses) => {
  if(amt < prevBalance && amt !== 0) {
    setExpensRecord([expenses, ...expensRecord]);
  }
}

const addExpenses = (e) => {
  e.preventDefault();
  setExpDescrip("")
  setAmount(0)
  validateWith()

  addToExpenses({...expenses, 
    id: uuidv1(),
    description: expDescrip,
    cost: amt.toLocaleString()
    });
}

const deleteExpens = (id, cost) => {
  setExpensRecord(expensRecord.filter(expenses => expenses.id !== id));

  const addtoBalance = Number(cost);
  newBalance = (user.balance + addtoBalance);
  user.balance = newBalance  
  saveToLocal()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [transRecords, setTransRecords] = useState([]);
  const [transRecord, setTransRecord] = useState({
    id: "",
    type: "",
    from: "",
    to: "",
    amount: 0,
    date: ""
  })
    
  const addTransRecord = (transRecord) => {
    if(amt !== 0) {
      setTransRecords([transRecord, ...transRecords]);
    }
  }

  const onDeposit = (e) => {
    e.preventDefault()
    validateDep()
    setAmount(0)

    addTransRecord({...transRecord, 
      type: "Deposit", 
      amount: amt, 
      date: new Date().toLocaleDateString(), 
      time: new Date().toLocaleTimeString(),
      id: uuidv1()
    })
  }

  const onWithdraw = (e) => {
    e.preventDefault()
    validateWith()
    setAmount(0)
    toTransactionPage()

    if(amt < prevBalance) {
      addTransRecord({...transRecord, 
        type: "Withdraw", 
        amount: amt, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        id: uuidv1()
      })
    } else {
      addTransRecord({...transRecord, 
        type: "Transaction failed", 
        amount: amt, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        id: uuidv1()
      })
    }
  }

  const onTransfer = (e) => {
    e.preventDefault();
    validateTrans()
    setAmount(0)
    toTransactionPage()

    if(amt < prevBalance) {
      addTransRecord({...transRecord, 
        type: "Transfer", 
        from:user.accountNum, 
        to: receiverAccount.accountNum,
        amount: amt, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        id: uuidv1()
      })
    } else {
      addTransRecord({...transRecord, 
        type: "Transaction failed", 
        from:user.accountNum, 
        to: receiverAccount.accountNum,
        amount: amt, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        id: uuidv1()
      })
    }
  }
  
  const prevBalance = JSON.stringify(user.balance)

  const validateDep = () => {
    newBalance = (user.balance + amt);
    user.balance = newBalance  
    if (amt === 0) {
      setDepError(true)
    }
    saveToLocal();

    addTransRecord({...transRecord, 
      type: "Deposit", 
      amount: amt, 
      date: new Date().toLocaleDateString(), 
      time: new Date().toLocaleTimeString(),
      id: uuidv1()
    })
  }

  const validateWith = () => {
    user.balance = (JSON.parse(parseFloat(prevBalance)) - amt);
    if (amt > prevBalance) {
      setWithError(true)
      setAddExpensError(true)
    } else {
      saveToLocal();
    }
  }

  const validateTrans = () => {
    if(receiverAcc.length !== 12) {
      setAcctNumError(true)
    } else if (user.accountNum === Number(receiverAcc)) {
      setSameAcctError(true)
    } else if (!doesUserExist) {
      setReceiverError(true)
    } else if (amt === 0) {
      setTransError(true)
    } else if (amt > prevBalance) {
      setFundsError(true)
    } else {
      user.balance = (JSON.parse(parseFloat(prevBalance)) - amt);
      receiverBalance = (receiverAccount.balance + amt);
      receiverAccount.balance = receiverBalance
      saveToLocal();
      setUserActions("Transactions")
    } 
  }

  const toTransactionPage = () => {
    if(amt !==0 ) {
      setUserActions("Transactions")
    }
  }

  const saveToLocal = () => {
    const receiverIndex = localUsers.indexOf(receiverAccount)
    localUsers[receiverIndex] = Object.assign({}, localUsers[receiverIndex],);

    const index = localUsers.indexOf(user);
    localUsers[index] = Object.assign({}, localUsers[index],);
    localStorage.setItem("localUsers", JSON.stringify(localUsers));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(depError) {
        setDepError(false);
      } else if(withError) {
        setWithError(false);
      } else if(acctNumError) {
        setAcctNumError(false);
      } else if(sameAcctError) {
        setSameAcctError(false);
      } else if(receiverError) {
        setReceiverError(false);
      } else if(transError) {
        setTransError(false);
      } else if(fundsError) {
        setFundsError(false);
      } else if(addExpensError) {
        setAddExpensError(false);
      }
    }, 2000);
    return () => clearTimeout(timer)
  },[depError, withError, acctNumError, sameAcctError, receiverError, transError, fundsError, addExpensError]);

  return(
    <section>
      <nav className="bg-slate-200 pt-8">
        <ul className="flex justify-between">
          <li>
            <div className="flex ml-8">
                <img className="w-10" alt="locale-bank-icon" src={Logo}/>
                <h1 className="ml-3 text-4xl text-slate-700">Locale Bank</h1>
            </div>
          </li>
          <li>
            <div className="flex justify-end">
                <button className="mx-2 px-2 ease-in duration-200" 
                  onClick={() => setClickModal(true)}>
                  <img className="w-9" alt="envelope-img" src={NotifIcon}/>
                </button>
                <Modal 
                  clickModal={clickModal}
                  setClickModal={setClickModal}
                />
                <button className="text-xl border-slate-700 hover:bg-slate-500 hover:text-slate-200 
                rounded-full px-3 mr-8 ease-in duration-200" onClick={handleClick}>Log-out</button>
            </div>
          </li>
        </ul>
      </nav>
      <section className="flex bg-slate-200">
        <section className="w-3/5 min-h-screen flex flex-col ">
          <div className="flex place-content-center mt-12 pt-8 pb-16 ml-5 rounded-lg" 
          style={{ backgroundImage: `url(${DashboardBg})`,  backgroundSize: 'cover',}}>
            <div className=" w-3/5 flex place-content-center ml-4 rounded-md py-20 bg-slate-300">
              <div className="rounded w-3/6 p-5 text-xl" 
              style={{backgroundImage: `url(${CardBgImg})`,  backgroundSize: 'contain'}}>
                <div className="flex w-full">
                  <h3 className="text-3xl text-red-500">₱ {(user.balance).toLocaleString()}</h3>
                  <h3 className="ml-auto mr-4 justify-item-end">Visa</h3>
                </div>
                  <h3 className="text-sm pt-12">{user.accountNum}</h3>
                  <h3 className="py-1">{user.name}</h3>
                  <h3 className="text-xs">06/30</h3>
                </div>
              </div>
            <div className="grid grid-cols-2 gap-y-4 w-2/5 ml-4 my-12">
              <button className="mr-4 mt-5 shadow-xl border-2 bg-slate-400 border-slate-500	rounded-md text-2xl 
              hover:bg-slate-500 hover:text-slate-200 hover:border-none 
              scale-80 hover:scale-90 ease-in duration-200" onClick={() => setUserActions("Deposit")}>Deposit</button>
              <button className="mr-4 mt-5 shadow-xl border-2 bg-slate-400 border-slate-500	rounded-md text-2xl 
              hover:bg-slate-500 hover:text-slate-200 hover:border-none 
              scale-70 hover:scale-90 ease-in duration-200" onClick={() => setUserActions("Transfer")}>Transfer</button>
              <button className="mr-4 mt-5 shadow-xl border-2 bg-slate-400 border-slate-500	rounded-md text-2xl 
              hover:bg-slate-500 hover:text-slate-200 hover:border-none 
              scale-70 hover:scale-90 ease-in duration-200" onClick={() => setUserActions("Withdraw")}>Withdraw</button>
              <button className="mr-4 mt-5 shadow-xl border-2 bg-slate-400 border-slate-500	rounded-md text-2xl 
              hover:bg-slate-500 hover:text-slate-200 hover:border-none 
              scale-70 hover:scale-90 ease-in duration-200" onClick={() => setUserActions("Transactions")}>Transactions</button>
            </div>
          </div>
          <section className="bg-slate-300 flex flex-col mt-5 ml-5 rounded-tl-lg rounded-tr-lg">
            <div className="flex items-center p-2">
              <h2 className="text-3xl py-2">Expenses</h2>
              <button onClick={() => setClickExpenses(true)}>
                <img className="h-8 w-8 ml-4 bg-slate-600 rounded-full p-1 hover:bg-slate-200" alt="plus-sign" src={PlusSign}></img>
              </button>
            </div>
            <table>
              <thead>
                <tr className="p-0.5">
                  <th className="w-3/6 border border-slate-400">Description</th>
                  <th className="w-2/6 border border-slate-400">Cost</th>
                  <th className="w-1/6 border border-slate-400">Delete</th>
                </tr>
              </thead>
              <tbody>
              <ExpensList
                expensRecord={expensRecord}
                deleteExpens={deleteExpens}
              />
              </tbody>
            </table>
            <ExpensesModal
              addExpensError={addExpensError}
              amount={amount}
              setAmount={setAmount}
              expDescrip={expDescrip}
              setExpDescrip={setExpDescrip}
              addExpenses={addExpenses}
              clickExpenses={clickExpenses}
              setClickExpenses={setClickExpenses}
            />
          </section>
        </section>
        <section className="w-2/5 bg-slate-200">
          {userActions === "Deposit" && (
          <Deposit 
          depError = {depError}
          onDeposit={onDeposit}
          amount={amount}
          setAmount={setAmount}
          />)}
          {userActions === "Transfer" && <Transfer 
          onTransfer={onTransfer}
          transError={transError}
          fundsError={fundsError}
          acctNumError={acctNumError}
          sameAcctError={sameAcctError}
          receiverError={receiverError}
          receiverAcc={receiverAcc}
          setReceiverAcc={setReceiverAcc}
          amount={amount}
          setAmount={setAmount}
          />}
          {userActions === "Withdraw" && <Withdraw 
          onWithdraw={onWithdraw}
          withError={withError}
          amount={amount}
          setAmount={setAmount}
          />}
          {userActions === "Transactions" && <Transactions 
          transRecords={transRecords}
          />}
        </section>
      </section>
    </section>
  )
}