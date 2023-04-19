import React, { useEffect } from "react";
import { getPost } from "../services/post";

const Posts = () => {
  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost();
      console.log(res);
    };

    fetchPost();
  }, []);
};

export default Posts;
