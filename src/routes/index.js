// For this demo, we are using the UMD build of react-router-dom
import { HashRouter, Switch, Route } from "react-router-dom";

export default (Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </main>
));

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
