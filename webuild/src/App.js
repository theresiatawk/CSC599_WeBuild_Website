import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/UserRoute';

import Error from './components/organisms/error/Error';

import Home from './features/home/HomeFeature';
import Login from './features/login/LoginFeature';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/error' >
          <Error/>
        </Route>
        <Route exact path="/" component={Home} />

        <AuthRoute exact path='/login' component={Login} />
        
        <Route>
          <Redirect to="/error" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
