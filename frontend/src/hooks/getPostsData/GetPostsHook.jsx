import { useEffect } from "react";
import { getPostsFetch } from "../../services/posts";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/posts/posts";

function getPostsDataHook() {
  const dispatch = useDispatch();
  async function getPosts() {
    const posts = await getPostsFetch();
    if (posts) {
      dispatch(setPosts({ posts }));
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  return getPosts;
}

export default getPostsDataHook;
