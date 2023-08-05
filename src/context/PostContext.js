"use client";

import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const onPostsAdd = (posts) => {
    setItems([...items, ...posts]);
  };

  const onPostAdd = (post) => {
    setItems([post, ...items]);
  };

  const onPostDelete = (postId) => {
    items.splice(
      items.findIndex((post) => post.id === postId),
      1
    );
    setItems([...items]);
  };
  return (
    <PostContext.Provider
      value={{ items, onPostAdd, onPostsAdd, onPostDelete }}
    >
      {children}
    </PostContext.Provider>
  );
};
