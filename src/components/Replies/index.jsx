"use client";

import { useState } from "react";
import styles from "./replies.module.css";
import { Comment } from "../Comment";
import { ReplyModal } from "../ModalReply";
import { useFetchReplies } from "@/app/hooks/useFetchReplies";
import { fetchReplies } from "@/app/hooks/useFetchReplies";
import { useQueryClient } from "@tanstack/react-query";

export const Replies = ({ comment, slug }) => {
  //client that is being use
  const queryClient = useQueryClient();
  const [showReplies, setShowReplies] = useState(false);

  //using custom hook
  //only send if the showreplies is true
  const { data: replies } = useFetchReplies(showReplies ? { commentId: comment.id, slug } : {})

  const prefetch = () => {
    if(!showReplies){
      //send the request and save the result into cache
      queryClient.prefetchQuery({
        queryKey:["replies", comment.id, slug],
        queryFn: async() => fetchReplies({ commentId: comment.id, slug }),
        //force to do more retries
        retry: 5
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.replies}>
        <button
          className={styles.btn}
          onClick={() => setShowReplies(!showReplies)}
          onMouseOver={prefetch}
        >
          {showReplies ? "Ocultar" : "Ver"} respostas
        </button>
        {showReplies && replies?.length && (
          <ul>
            {replies.map((reply) => (
              <li key={reply.id}>
                <Comment comment={reply} />
                <ReplyModal comment={reply} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
