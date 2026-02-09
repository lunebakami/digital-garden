import { Switch, Route, Router as WouterRouter } from "wouter";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import DynamicPage from "@/pages/DynamicPage";
import NotFound from "@/pages/not-found";

const basePath = "/digital-garden";

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      
      <Route path="/:slug">
        {(params) => (
          <Layout>
            <DynamicPage />
          </Layout>
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <Routes />
    </WouterRouter>
  );
}

export default App;
