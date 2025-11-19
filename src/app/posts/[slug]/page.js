"use client";
// import { useQuery } from '@tanstack/react-query';
import { CardPost } from "@/components/CardPost";
import { CommentList } from "@/components/CommentList";
import styles from "./page.module.css";
import { usePagePostbySlug } from '@/app/hooks/useFetchPostbySlug';
import { useFetchPostRating } from '@/app/hooks/useFetchRating';

const PagePost = ({ params }) => {
  const { slug } = params;
  const { data: post } = usePagePostbySlug({ slug }); 
  const { data: postRating } = useFetchPostRating({ postId: post?.id });

  return (
    <div>
      {post && (
        <>
          <CardPost
            post={post}
            rating={postRating?.rating}
            category={postRating?.category}
            highlight={true}
          />
          <h3 className={styles.subtitle}>Código:</h3>
          <div className={styles.code}>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
          </div>
          <CommentList comments={post.comments} slug={slug} />
        </>
      )}
    </div>
  );
};

export default PagePost;
