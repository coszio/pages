import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Button, Stack } from 'react-bootstrap';
import { path } from "./../connections";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(path + "/posts", {
        method: "GET",
      });
      const postsResp = await resp.json().catch((err) => console.log(err));
      setPosts(postsResp);
    };

    getPosts();
  }, []);

  async function updatePost(post) {
    const response = await fetch(path + "/posts/" + post.id, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleUpvote(id) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        post.votes += 1;
        updatePost(post);
      }
      return post;
    });
    setPosts(newPosts);
  }

  async function handleDownvote(id) {
    
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        post.votes -= 1;
        updatePost(post);
      }
      return post;
    });
    setPosts(newPosts);
  }
  
  return (
    <div class=''>
      <div class='container d-grid mt-3'>
        <div class='row align-items-center'>
          <div class='col-md-3' />
          <div class='col-md-4 col'>
            <h1>Feed</h1>
          </div>
          <div class='col-md-2 col-3'>
            <Link to='/new'>
              <button type='button' class='btn btn-primary btn-sm'>
                New post
              </button>
            </Link>
          </div>
          <div class='col-md-3' />
        </div>
      </div>
      {posts.map((post) => (
        <div class='container' key={post.id}>
          <div class='d-grid'>
            <div class='row mt-3'>
              <div class='col-md' />
              <div class='col-md-6'>
                <div class='card'>
                  <div class='card-body'>
                    <h3 class='card-title'>{post.title}</h3>
                    <h4>by {post.username}</h4>
                    <p class='card-text'>{post.content}</p>
                    {/* <Link to={`/posts/${post.id}`}>Read More</Link> */}
                    <Stack direction='horizontal' gap={2}>

                      <div className='ms-auto'>
                      <p>{post.votes}</p>
                      </div>

                      <Button variant='light' onClick={() => handleUpvote(post.id)}>
                        👍
                      </Button>
                      <Button variant='light' onClick={() => handleDownvote(post.id)}>
                        👎
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
              <div class='col-md' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
