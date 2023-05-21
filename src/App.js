import { Suspense } from "react"
import Loading from "./components/Loading/Loading"
import { AppRoutes } from "./routes"
import "./styles/app.scss"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      light: "#42a5f5",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    action: { hover: "#eeeeee" },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
