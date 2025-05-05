import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './features/common/context/AuthContext.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </QueryClientProvider>
  </AuthProvider>
)
