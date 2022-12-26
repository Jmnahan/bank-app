import XIcon from "../assets/xmark-solid.png"

export default function Modal(props) {
  const { clickModal, setClickModal } = props
  if(!clickModal) return null

  return (
    <div className="bg-backdrop justify-center items-center flex fixed inset-0 z-10" 
    onClick={() => setClickModal(false)}>
      <div className="flex flex-col justify-center items-center bg-white w-1/4 p-8 rounded-2xl h-1/2" 
      onClick={(e) => {e.stopPropagation()}}>
        <h1 className="self-start text-4xl py-4">News!</h1>
        <div className="overflow-y-scroll my-4 pr-5">
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque sint eum inventore assumenda voluptatibus nostrum qui! 
          </p>
          <p className="my-4">
            Ipsum ipsam sint nihil voluptatum iste illum aliquam magni distinctio aperiam exercitationem ratione recusandae?
          </p>
          <p className="my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad consequatur iusto, incidunt, in quaerat doloribus animi!
          </p>
          <p className="my-4">
            Ipsum ipsam sint nihil voluptatum iste illum aliquam magni distinctio aperiam exercitationem ratione recusandae?
          </p>
          <p className="my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad consequatur iusto, incidunt, in quaerat doloribus animi!
          </p>
        </div>
        <button className="self-end" 
          onClick={() => setClickModal(false)}>
          <img className="h-6 w-6 my-4 mr-4" alt="x-icon" src={XIcon}/>
        </button>
      </div>
    </div>
  )
}
