'use client'

import { QueryClient } from "@tanstack/react-query"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import Loading from "@/app/libs/Loading"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // "Connection closed" বা network error হলে retry করো
        const msg = error?.message || ''
        if (msg.includes('Connection closed') || msg.includes('fetch failed') || msg.includes('Failed to fetch')) {
          return failureCount < 3
        }
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
    mutations: {
      retry: (failureCount, error: any) => {
        const msg = error?.message || ''
        if (msg.includes('Connection closed')) {
          return failureCount < 2
        }
        return false
      },
    }
  }
})

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRestored, setIsRestored] = useState(false);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
      onSuccess={() => {
        setIsRestored(true);
      }}
    >
      {isRestored ? (
        <>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      ) : (
        <Loading fullScreen={true} size={"large"} color={"#dc2626"} text={"Loading..."} textClass={"text-2xl font-bold"} className={"flex items-center justify-center"} />
      )}
    </PersistQueryClientProvider>
  )
}

export default QueryProvider
