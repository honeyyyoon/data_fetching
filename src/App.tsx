import './reset.css';

import React, { useEffect, useState } from 'react';

import { PostDetail } from './components/PostDetail';
import { PostList } from './components/PostList';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  email: string;
  body: string;
};

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

const fetchPosts = async () => {
  const response = await fetch(baseURL);
  const data = (await response.json()) as Post[];
  return data;
};

const fetchPostDetail = async (postId: number) => {
  const response = await fetch(`${baseURL}/${postId}`);
  const data = (await response.json()) as Post;
  return data;
};

const fetchComments = async (postId: number) => {
  const response = await fetch(`${baseURL}/${postId}/comments`);
  const data = (await response.json()) as Comment[];
  return data;
};

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [postDetail, setPostDetail] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);

  // const selectedPost = posts.find((p) => p.id === selectedId) ?? posts.at(0);

  const handleSelectID = (id: number) => {
    setSelectedId(id);
  };

  useEffect(() => {
    let ignore = false;

    fetchPosts()
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((err: unknown) => {
        console.error('Error: ', err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchPostDetail(selectedId)
      .then((data) => {
        if (!ignore) setPostDetail(data);
      })
      .catch((err: unknown) => {
        console.error('Error: ', err);
      });

    fetchComments(selectedId)
      .then((data) => {
        if (!ignore) setComments(data);
      })
      .catch((err: unknown) => {
        console.error('Error: ', err);
      });

    return () => {
      ignore = true;
    };
  }, [selectedId]);

  return (
    <div className="app">
      <h1>포스트 목록</h1>
      <div className="content">
        <PostList
          posts={posts}
          selectedId={selectedId}
          onSelectPost={handleSelectID}
        />
      </div>
      <div className="body">
        {
          <PostDetail
            body={postDetail === undefined ? undefined : postDetail.body}
            comments={comments}
          />
        }
      </div>
    </div>
  );
};
