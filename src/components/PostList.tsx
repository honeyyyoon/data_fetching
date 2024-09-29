import './PostList.css';

import React from 'react';

import type { Post } from '../App';

type PostListProps = {
  posts: Post[];
  selectedId: number;
  onSelectPost: (id: number) => void;
};

export const PostList: React.FC<PostListProps> = ({
  posts,
  selectedId,
  onSelectPost,
}) => {
  return (
    <div className="post-list">
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => {
              onSelectPost(post.id);
            }}
            className={post.id === selectedId ? 'selected' : ''}
          >
            {post.id}. {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
