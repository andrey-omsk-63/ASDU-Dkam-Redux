import { INCREMENT, DECREMENT } from './types';

//import { DateRPU } from './../interfaceRPU.d';
//import { dateRpuGl } from './../App';
import { dataRpu } from './../otladkaRpuData';

const intialState = {
  likes: dataRpu,
};

export const likesReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case INCREMENT:
      console.log('likesReducer-action - добавил');
      return {
        ...state,
        //likes: state.likes + 1,
      };
    case DECREMENT:
      console.log('likesReducer-action - убрал');
      return {
        ...state,
        //likes: state.likes - 1,
      };

    default:
      return state;
  }
};
