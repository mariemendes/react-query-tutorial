import { useQuery  } from "@tanstack/react-query";

const fetchPostbySlug = async({slug}) => {
  const response = await fetch(`http://localhost:3000/api/post/${slug}`);

  if(!response.ok) {
    throw new Error("The server response if not working");
  }
  return response.json();
}
export const usePagePostbySlug = ({ slug }) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostbySlug({ slug}),
  })
}