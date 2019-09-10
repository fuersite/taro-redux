export default function toDoList (state = [], action) {
  console.log(action)
  switch (action.type) {
    case 'ADD':
      return [...action.toDoList ]
    case 'DEL':
      return [...action.toDoList ]
    case 'UPDATE':
      return [...action.toDoList ]
    default:
      return state
  }
}
