import { useEffect, useState } from 'react';
import './App.css';
import { Introduction } from './Introduction';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  function handleItemClicked(post_id) {
    const copyPosts = [...posts];
    const postIndex = copyPosts.findIndex((post) => post.id === post_id);

    if (postIndex > -1) {
      copyPosts.splice(postIndex, 1);
    }

    setPosts(copyPosts);
  }

  return (
    <div>
      <ul>
        {posts.length &&
          posts.map((post) => (
            <li key={post.id} onClick={() => handleItemClicked(post.id)}>
              {post.id} - {post.title}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
