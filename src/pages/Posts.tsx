import React, { useEffect, useRef, useState } from "react";
import http from "../http";

const Posts = ({ userId = 0 }: { userId?: number }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const TOTAL_PAGE = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const limit = 10;
  const observer = useRef<any>(null);
  const trigger = useRef<any>(null);
  useEffect(() => {
    if (userId) return;
    if (page >= TOTAL_PAGE) return;
    if (!loading) {
      if (observer.current) observer.current.disconnect();
      const callback = function (event: any) {
        if (event[0].isIntersecting) {
          setPage(page + 1);
        }
      };
      observer.current = new IntersectionObserver(callback);
      observer.current.observe(trigger.current);
    }
  }, [loading]);

  useEffect(() => {
    getAllPosts();
  }, [page]);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      if (userId !== 0) {
        const responseData = await http.get(`/posts?userId=${userId}`);
        setPosts(responseData.data);
        return;
      }
      const responseData = await http.get("/posts", {
        params: {
          _page: page,
          _limit: limit,
        },
      });
      const newPosts = responseData.data;
      setPosts([...posts, ...newPosts]);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      {userId === 0 ? <h1>THIS is Posts page!!!</h1> : <h3>User posts:</h3>}
      {posts.map((post) => (
        <div className="card my-4" key={post.id}>
          <div className="card-body">
            <h3>№{post.id}</h3>
            <h4>{post.body}</h4>
          </div>
        </div>
      ))}
      {!userId && <div style={{ height: "1px" }} ref={trigger} />}
    </div>
  );
};

export default Posts;
