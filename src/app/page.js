"use client";
// import { useQuery, useQueries } from "@tanstack/react-query"; //responsible to help us to fetch the data
import { useFetchPosts } from "./hooks/useFetchPosts";
import { usePostRatingQueries } from "./hooks/useFetchRating";
import { CardPost } from "@/components/CardPost";
import { Spinner } from "@/components/Spinner";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || 1);
  const searchTerm = searchParams?.q;

  //when there are requests in the background the isFetching is reponsible to tell us.
  const { data: posts, isLoading, isFetching } = useFetchPosts({
    page: currentPage,
  });

  //arr of queries
  const postRatingQueries = usePostRatingQueries( posts )

  const ratingsAndCartegoriesMap = postRatingQueries?.reduce((acc, query) => {
    if(!query.isPending && query.data && query.data.id){
      acc[query.data.id] = query.data;
    }
    return acc;
  }, {});

  return (
    <main className={styles.grid}>
      {isLoading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {posts?.data?.map((post) => (
        <CardPost
          key={post.id}
          post={post}
          rating={ratingsAndCartegoriesMap?.[post.id]?.rating}
          category={ratingsAndCartegoriesMap?.[post.id]?.category}
          isFetching={isFetching}
        />
      ))}
      <div className={styles.links}>
        {posts?.prev && (
          <Link
            href={{
              pathname: "/",
              query: { page: posts?.prev, q: searchTerm },
            }}
          >
            Página anterior
          </Link>
        )}
        {posts?.next && (
          <Link
            href={{
              pathname: "/",
              query: { page: posts?.next, q: searchTerm },
            }}
          >
            Próxima página
          </Link>
        )}
      </div>
    </main>
  );
}
