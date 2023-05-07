import { Suspense } from "react"
import Loading from "./components/Loading/Loading"
import { AppRoutes } from "./routes"
import './styles/app.scss'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='App'>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </div>
    </LocalizationProvider>
    
  )
}

export default App
