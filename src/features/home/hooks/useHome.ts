import { useQuery } from "@tanstack/react-query";
import fetchHomeData from "@src/features/home/api/homeApi";

const useHome = (categoryId: string = "all") => {
  return useQuery({
    queryKey: ["home", categoryId],
    queryFn: () => fetchHomeData(categoryId),
  });
};

export default useHome;
