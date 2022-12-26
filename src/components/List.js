import TrashIcon from "../assets/trash-solid.png"

export default function List(props) {

 function handleRemove() {
   props.deleteExpens(props.id, props.cost)
  }

  return (
      <tr className="text-center">
        <td>{props.description}</td>
        <td>{props.cost}</td>
        <td>
          <button className="w-5 pt-1" type="submit" onClick={handleRemove}>
           <img alt="trash-icon" src={TrashIcon}/>
          </button>
        </td>
      </tr>
  )
}