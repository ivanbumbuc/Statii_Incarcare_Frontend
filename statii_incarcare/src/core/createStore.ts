import { createStore, Store, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer } from '../reducers';
import { ApplicationState } from '../reducers/type';


export default function configureStore(
    history: History | null,
    initialState: ApplicationState
  ): Store<ApplicationState> {
    const store = createStore(
      createRootReducer(history),
      initialState,
      applyMiddleware(thunk)
    );
    return store;
  }

