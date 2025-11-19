"use client";

import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

//component with full acess to all the tools from react-query using the props
export const ReactQueryProvider = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}