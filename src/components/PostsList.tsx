import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts, addPost } from '../store/slices/postsSlice';
import { usePostsSelector } from '../selectors/postsSelectors';
import { AppDispatch } from '../store/store';
import HeaderComponent from './Header';
import AddPostForm, { FormData } from './AddPostForm';
import Pagination from './Pagination';

const PostsList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = usePostsSelector();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const pageNeighbours = 1;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (data: FormData) => {
    const id = Date.now();

    const newPost = {
      id,
      title: data.title,
      body: data.body,
      comment: data.comment,
    };

    dispatch(addPost(newPost));
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div>
      <div className="postsContainer">
        <div className="posts">
          <HeaderComponent title="Posts List" />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNeighbours={pageNeighbours}
            handleFirstPage={handleFirstPage}
            handleLastPage={handleLastPage}
            setCurrentPage={setCurrentPage}
          />

          <ul>
            {posts
              .slice(
                (currentPage - 1) * postsPerPage,
                currentPage * postsPerPage
              )
              .map((post: any) => (
                <li key={post.id} className="postItem font-Roboto-Slab">
                  <b>title:</b> {post.title}
                  <br />
                  <b>body:</b> {post.body}
                  <br />
                  {post.comment ? (
                    <>
                      <b>comment:</b> {post.comment}
                    </>
                  ) : null}
                </li>
              ))}
          </ul>
        </div>
        <div className="form">
          <AddPostForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PostsList;
