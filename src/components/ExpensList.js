import List from "./List"

export default function ExpensList(props) {
  const { expensRecord, deleteExpens } = props

  return( 
      <>
        {expensRecord.map(record => (
          <List
            key={record.id}
            id={record.id}
            description={record.description}
            cost={record.cost}
            deleteExpens={deleteExpens}
          />
        ))}
      </>
  )
}