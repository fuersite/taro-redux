export const add = (list) => {
    return {
      type: 'ADD',
      toDoList: list
    }
}

export const del = (list) => {
    return {
      type: 'DEL',
      toDoList: list
    }
}
  
export const update = (list) => {
    return {
        type: 'UPDATE',
        toDoList: list
    }
}
  // 异步的action
//   export function asyncAdd () {
//     return dispatch => {
//       setTimeout(() => {
//         dispatch(add())
//       }, 2000)
//     }
//   }