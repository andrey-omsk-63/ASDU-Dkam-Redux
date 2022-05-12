import { createStore } from 'redux';

import { DateRPU } from './../interfaceRPU.d';
//import { dateRpuGl } from './../App';
import { dataRpu } from './../otladkaRpuData';

let dateRpu: DateRPU;

//dateRpu = dateRpuGl;

const initialState = {
  likes: dataRpu,
  //likes: 10,
};

const reducer = (state = initialState, action: any) => {
  console.log('reducer > ', action);

  switch (action.type) {
    case 'INCREMENT':
      console.log('action - добавил');
      return {
        ...state,
        //likes: state.likes + 1,
       };
    case 'DECREMENT':
      console.log('action - убрал');
      return {
        ...state,
        //likes: state.likes - 1,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

// import { createStore } from 'redux';
// //import createStore from 'redux';

// const initialState = {
//   likes: 0,
// };

// const reducer = (state = initialState, action) => {
//   console.log('reducer > ', action);

//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         ...state,
//         likes: state.likes + 1,
//       };
//     case 'DECREMENT':
//       return {
//         ...state,
//         likes: state.likes - 1,
//       };

//     default:
//       return state;
//   }
// };

// const store = createStore(reducer);

// export default store;
