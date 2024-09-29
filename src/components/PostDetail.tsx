import './PostDetail.css';

import React from 'react';

import type { Comment } from '../App';

type PostDetailProps = {
  body: string | undefined;
  comments: Comment[];
};

export const PostDetail: React.FC<PostDetailProps> = ({
  body,
  comments = [],
}) => {
  return (
    <div className="post-detail">
      <div className="post-content">
        <h2>내용</h2>
        <p>{body}</p>
      </div>
      <div className="comments-section">
        <h2>댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-author">작성자: {comment.email}</p>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
