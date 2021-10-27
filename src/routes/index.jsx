import Search from 'views/Search';
import SearchResult from 'views/SearchResult';
import { Route, Switch } from 'wouter';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Search} />
      <Route path="/result" component={SearchResult} />
      <Route>404 Not found</Route>
    </Switch>
  );
};

export default Routes;
