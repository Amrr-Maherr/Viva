import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export type ChildrenProps = {
  children: React.ReactNode;
}
export default function MainProvider({ children }: ChildrenProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
