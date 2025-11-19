import { useQuery  } from "@tanstack/react-query";

export const fetchReplies = async ({ commentId, slug }) => {
  const response = await fetch(`/api/comment/${commentId}/replies?slug=${slug}`);

  if(!response.ok) {
    throw new Error("The server response if not working");
  }
  return response.json();
}

export const useFetchReplies = ({ commentId, slug }) => {
  return useQuery({
    queryKey:["replies", commentId, slug],
    queryFn: async() => fetchReplies({ commentId, slug }),
    //only do the fetch if comment and slug exist, only if the enable is true(comment and slug is true)
    enabled: !!commentId && !!slug,
    //force to do more retries
    retry: 5
  })
}