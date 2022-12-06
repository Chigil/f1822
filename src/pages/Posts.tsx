import React, {useEffect, useRef, useState} from 'react';
import http from "../http";

const Posts = ({ userId = 0 }: { userId?: number }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const limit = 10;
    const observer = useRef(null);
    const trigger = useRef(null);

    useEffect(() => {
        getAllPosts();
    },[]);
    console.log(trigger);
    const getAllPosts = async () => {
        try {
            if (userId === 0) {
                const responseData = await http.get(`/posts?userId=${userId}`);
                setPosts(responseData.data);
            }
            const allPosts = await http.get('posts');
            setTotalPage(allPosts.data.length / limit);
            const responseData = await http.get('/posts', {
                params: {
                    _page: page,
                    _limit: limit
                }

            });
            const newPosts = responseData.data;
            console.log(newPosts);
            setPosts([...posts, ...newPosts]);
        } catch (err) {
            alert(err);
        }
    };
    return (
        <div>
            {userId === 0 ? <h1>THIS is Posts page!!!</h1> : <h3>User posts:</h3>}
            {posts.map(post =>
                <div className="card my-4" key={post.id}>
                    <div className="card-body">
                        <h4>{post.body}</h4>
                    </div>
                </div>
            )}
            <div ref={trigger}>I'am hear!</div>
        </div>
    );
};

export default Posts;