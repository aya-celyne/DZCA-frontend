import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPosts, deletePost } from '../../redux/postSlice'; // Actions Redux
import API from '../../api';// Utilisation de l'instance API
import DynamicAlert from '../../alert/DynamicAlert'

import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId); // Récupération du userId depuis Redux
  const posts = useSelector((state) => state.posts.userPosts); // Les posts utilisateur depuis Redux
  const alertRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    image: 'https://via.placeholder.com/150',
  });

  useEffect(() => {
   
    if (userId) {
      // Récupérer les données utilisateur
      API.get(`/user/${userId}`)
        .then((response) => {
          setProfile((prevProfile) => ({
            ...prevProfile,
            name: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
            image: `${process.env.REACT_APP_API_URL+response.data.profiliePicture}` || prevProfile.image,
          }));
        })
        .catch((err) => console.error('Erreur lors de la récupération du profil :', err));
  
      dispatch(fetchUserPosts(userId)); // Charger les posts de l'utilisateur via Redux
    }
  }, [userId, dispatch]);
  

  const handleDeletePost = (postId, userId) => {
  
    // Appeler deletePost et recharger les posts de l'utilisateur
    dispatch(deletePost(postId))
      .unwrap() // Extraire la valeur résolue ou rejetée
      .then(() => {
        dispatch(fetchUserPosts(userId)); // Recharger les posts après suppression
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du post :', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: file }); // Stocke le fichier sélectionné
    }
  };
  

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      if (profile.image instanceof File) {
        // Si une nouvelle image a été sélectionnée
        const formData = new FormData();
        formData.append('file', profile.image);
        formData.append('userId',userId)
  
        await API.post(`/user/uploadProfilePicture`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      // Met à jour les autres informations du profil
      await API.put(`/user/${userId}`, {
        name: profile.name,
        // phone: profile.phone,
        
      });
  
      setIsEditing(false);
      alertRef.current.showAlert('Profil mis à jour avec succès !');
      fetchUserProfile()//reloading
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    }
  };
 


  // Reload of page

  const fetchUserProfile = async () => {
    try {
      const response = await API.get(`/user/${userId}`);
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: response.data.name,
        phone: response.data.phone,
        email: response.data.email,
        image: `${process.env.REACT_APP_API_URL+response.data.profiliePicture}` || prevProfile.image,
      }));
      dispatch(fetchUserPosts(userId)); // Recharge aussi les posts
    } catch (err) {
      return 
    }
  };
  

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={profile.image} alt="Profile" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />
        )}
      </div>
      <div className="profile-info">
        <h1>{profile.name} {profile.surname}</h1>
        <p>Email: {profile.email}</p>
        {!isEditing ? (
          <>
            <p>Nom: {profile.name}</p>
            <p>Téléphone: {profile.phone}</p>
          </>
        ) : (
          <>
            <p>
              Nom: <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
            </p>
            <p>
              Téléphone: <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
            </p>
          </>
        )}
      </div>
      <button className="edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? 'Enregistrer' : 'Modifier profil'}
      </button>

      <div className="user-posts">
        <h2>Mes Publications</h2>
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.message}</p>
            {post.picture && <img src={`${process.env.REACT_APP_API_URL+post.picture}`} alt="Post" />}
            <button onClick={() => handleDeletePost(post._id,userId)}>Supprimer</button>
          </div>
        ))}
      </div>
      <DynamicAlert ref={alertRef} message="Message par défaut" />
    </div>
  );
}

export default Profile;
