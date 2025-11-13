import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import IndexRouter from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App" style={{ width: "100%" }}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <RouterProvider router={IndexRouter} />
        </SnackbarProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
