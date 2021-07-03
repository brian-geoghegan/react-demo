import { ReactRouter } from 'react';
import Header from './Components/Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CarTable from './Containers/CarTable';
import logo from './logo.svg';
import './App.css';

const countReducer = function (state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

let store = createStore(countReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <CarTable />
      </div>
    </Provider>
  );
}

export default App;
