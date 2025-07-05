import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')!).render(
<QueryClientProvider client={client}>
  <RouterProvider router={router} />
  <ToastContainer/>  
</QueryClientProvider>
)
