import { useQuery, useQueries  } from "@tanstack/react-query";

const fetchPostRating = async({postId}) => {
  const response = await fetch(`http://localhost:3000/api/post?postId=${postId}`);
  if(!response.ok) {
    throw new Error("The server response if not working");
  }
  return response.json();
}
export const useFetchPostRating = ({ postId }) => {
  return useQuery({
    queryKey: ['postRating', postId],
    queryFn: () => fetchPostRating({ postId}),
    enabled: !!postId,
  })
}

export const usePostRatingQueries = (posts) => {
  return useQueries({
    queries:
      posts?.data?.length > 0
        ? posts.data.map((post) => ({
            queryKey: ["postHome", post.id],
            queryFn: () => fetchPostRating({ postId: post.id }),
            enabled: !!post.id,
          }))
        : [],
  });
};