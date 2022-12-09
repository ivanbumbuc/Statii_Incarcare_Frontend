import './App.css';
import {Provider} from "react-redux";
import { Store } from 'redux';
import { ApplicationState } from './reducers/type';


type MainAppProps = {
    store: Store<ApplicationState>;
};

function App(props:MainAppProps) {
  return (
      <Provider store={props.store}>
        {<p>hello</p>}

      </Provider>
  );
}

export default App;
