import { useQuery } from "@tanstack/react-query";
import FetchChat from "@src/features/chat/api/chatApi";

const useFetchChat = (chatMessage: string) => {
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['fetchChat', chatMessage],
        queryFn: () => FetchChat(chatMessage),
        enabled: !!chatMessage,
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });

    return { data, isError, isLoading, refetch };
};

export default useFetchChat;

