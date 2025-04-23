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
      retry: failureCount => failureCount < 3
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
