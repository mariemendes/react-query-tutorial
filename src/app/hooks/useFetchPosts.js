import { useQuery, useQueries  } from "@tanstack/react-query";

//receiveing the posts and do the pagination
const fetchPosts = async({page}) => {
  const response = await fetch(`http://localhost:3000/api/posts?page=${page}`);
  if(!response.ok) {
    throw new Error("The server response if not working");
  }
  return response.json();
}

export const useFetchPosts = ({ page }) => {
  return useQuery({
    //key is a unique value and means that the userQuery will manage the cache and the state
    queryKey: ["posts", page],
    //where to search -- search inside fetchposts page number XX
    queryFn: () => fetchPosts({ page }),
    //updated data each 6sec 
    staleTime: 6000, 
  })
}