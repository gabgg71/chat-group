import { Edit } from "./components/Edit";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { Register } from "./components/Register";
import { AppRouter } from "./router/AppRouter";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
 return (
   <Provider store={store}>
     <AppRouter/>
   </Provider>
 )
}

export default App;
