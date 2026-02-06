import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import DynamicPage from "@/pages/DynamicPage";
import NotFound from "@/pages/not-found";

function Router() {
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
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
