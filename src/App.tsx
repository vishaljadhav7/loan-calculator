import AppRoutes from "./routes/AppRoutes"
import { AppContextProvider } from "./Context/AppContext"

function App() {
  return (
    <AppContextProvider>
      <AppRoutes/>
    </AppContextProvider>
  )
}

export default App