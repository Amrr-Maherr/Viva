import { useQuery } from "@tanstack/react-query";
import FetchChat from "@/api/FetchChat";
import { GeminiResponse } from "@/types/RequsetType";

const useFetchChat = (chatMessage: string) => {
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['fetchChat', chatMessage],
        queryFn: () => FetchChat(chatMessage),
        enabled: !!chatMessage,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isError, isLoading, refetch };
};

export default useFetchChat;