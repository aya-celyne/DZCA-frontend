import React, { useState, useEffect, useCallback, useRef } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaHeart, FaExclamationTriangle } from 'react-icons/fa'; // Import icons
import API from '../../api'; // Assurez-vous que vous avez configuré Axios ou un équivalent dans ce fichier
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import DynamicAlert from '../../alert/DynamicAlert';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [myPosts, setmyPosts] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showLikes, setShowLikes] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // État pour le mot recherché
  const [highlightedPostIndex, setHighlightedPostIndex] = useState(null); // Index du post correspondant
  const [refresh, setRefresh] = useState(false);


  const alertRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const response = await API.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!userData || !userData._id) return;

    const fetchPostsWithUserData = async () => {
      try {
        const response = await API.get(
          myPosts ? `post/user/${userData._id}` : '/post/'
        );

        const postsWithUserData = await Promise.all(
          response.data.map(async (post) => {
            const userData = await fetchUserData(post.posterId);
            return {
              ...post,
              userName: userData?.name || 'Utilisateur inconnu',
              userPicture: userData?.profilePicture || null,
            };
          })
        );

        setPosts(postsWithUserData);
      } catch (error) {
        return;
      }
    };

    fetchPostsWithUserData();
  }, [myPosts, userData, fetchUserData, navigate,refresh]);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('message', message);
      formData.append('posterId', userData._id);
      if (image) {
        formData.append('file', image);
      }

      if (editingPost) {
        await API.put(`/post/${editingPost._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setmyPosts(false);
      } else {
        const response = await API.post('/post/createpost', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setPosts([response.data, ...posts]);
      }
      setTitle('');
      setMessage('');
      setImage(null);
      setEditingPost(null);
      setRefresh(!refresh);
    } catch (error) {
      alertRef.current.showAlert(
        'Erreur lors de partage du post. \n Verifiez bien si vous remplissez les champs Titre et Message'
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setMessage(post.message);
    setImage(post.postImg);
    setEditingPost(post);
  };

  const checkProfile = () => {
    navigate('/profile');
  };

  const handleLike = async (postId) => {
    try {
      const response = await API.patch(`/post/like-post/${postId}`, {
        userId: userData._id,
      });
      const updatedPosts = posts.map((post) =>
        post._id === postId ? { ...post, likes: response.data.likes } : post
      );
      setPosts(updatedPosts);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Erreur lors du like du post', error);
    }
  };

  const toggleShowLikes = (postId) => {
    setShowLikes(showLikes === postId ? null : postId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setHighlightedPostIndex(null); // Reset highlighted post index
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm) {
      const index = posts.findIndex((post) =>
        post.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (index !== -1) {
        setHighlightedPostIndex(index);
        document
          .querySelector(`#post-${posts[index]._id}`)
          .scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Aucun résultat trouvé pour ce mot-clé.');
      }
    }
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!userData) {
    return <div>Chargement</div>;
  }

  const handleLogout = async () => {
    try {
      const response = await API.post('/user/logout');
      if (response.status === 200) {
        alertRef.current.showAlert('Déconnexion réussie');
      } else {
        alertRef.current.showAlert('Problème lors de la déconnexion');
      }
      dispatch(clearUser());
      localStorage.removeItem('token');
      navigate('/signin');
    } catch (error) {
      alertRef.current.showAlert(
        'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.'
      );
    }
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <img src="./img/dzca.avif" alt="Logo" className="logo" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
        />
      </header>
      <div className="content-wrapper">
        <aside className="profile-sidebar">
          <div className="profile">
            <img
              src={`${process.env.REACT_APP_API_URL + userData.profiliePicture}`}
              alt="Profile"
              className="profile-img"
            />
            <h2>{userData.name}</h2>
            <button className="settings-button" onClick={checkProfile}>
              Voir profil
            </button>
            <button
              className="view-posts-button"
              onClick={() => setmyPosts((prev) => !prev)}
            >
              {myPosts ? 'Tous les posts' : 'Mes Publications'}
            </button>
            <div className="sidebar-comment">
              <FaExclamationTriangle className="warning-icon" />
              <p>
                N'oubliez pas d'indiquer le vol (ville - ville) ainsi que la date
                dans le titre. Pensez également à ajouter votre numéro de
                téléphone ou votre adresse courriel pour être contacté. Merci !
              </p>
            </div>
            <div>
              <button className="Disconnect" onClick={handleLogout}>
                Déconnecter
              </button>
            </div>
          </div>
        </aside>
        <main className="post-section">
          <div className="post-form">
            <input
              type="text"
              placeholder="Titre"
              className="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Avez-vous de l'espace ou voulez-vous envoyer quelque chose ?"
              className="post-content"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <input type="file" id="file-input" onChange={handleImageChange} hidden />
            <label htmlFor="file-input" className="file-input-label">
              <FaImage />
            </label>
            <button className="post-button" onClick={handlePost}>
              {editingPost ? 'Modifier' : 'Partager'}
            </button>
          </div>
          <div className="posts-list">
            {posts.map((post, index) => (
              <div
                key={post._id}
                id={`post-${post._id}`}
                className={`post ${
                  index === highlightedPostIndex ? 'highlighted' : ''
                }`}
              >
                <div className="post-details">
                  <h3>{highlightText(post.title, searchTerm)}</h3>
                  <p>{highlightText(post.message, searchTerm)}</p>
                  {post.picture && (
                    <img
                      src={`${process.env.REACT_APP_API_URL + post.picture}`}
                      alt="Post"
                      className="post-img"
                    />
                  )}
                  <small>
                    Posted by {post.userName || 'Utilisateur inconnu'} on{' '}
                    {post.createdAt}
                  </small>
                  {post.posterId === userData._id && myPosts ? (
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(post)}
                    >
                      Modifier
                    </button>
                  ) : (
                    ''
                  )}
                  <button
                    className="like-button"
                    onClick={() => handleLike(post._id)}
                  >
                    <FaHeart />
                  </button>
                  <div
                    className="likes-info"
                    onClick={() => toggleShowLikes(post._id)}
                  >
                    {post.likers.length}{' '}
                    {post.likers.length === 1 ? 'Like' : 'Likes'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <aside className="ads-sidebar">
          <img src="./img/Bagages.jpeg" alt="Ad 1" className="ad-img" />
          <img src="./img/Maqam.jpg" alt="Ad 2" className="ad-img" />
          <img src="./img/plane.jpg" alt="Ad 3" className="ad-img" />
        </aside>
      </div>
      <DynamicAlert ref={alertRef} message="Message par défaut" />
    </div>
  );
}

export default Home;
