import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { register } from './serviceWorkerRegistration';

const container = document.getElementById('root')!;
const root = createRoot(container);

/** 
 * Instance of QueryClient
 *  
 * @remarks 
 *  
 * This is the only instance, components that which
 * to use a QueryClient access it through useQueryClient()
 * 
 * @see {@link https://react-query.tanstack.com/reference/useQueryClient}
 */
const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  }
)

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);

/**
 * Register the service worker
 *
 * @see {@link https://cra.link/PWA}
 */
register();

/** 
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
