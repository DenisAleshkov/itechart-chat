import React from "react";
import Loader from "./../../../utils/Loader/Loader";
import i from "./UploadInput.module.css";
import s from "./../../Chat.module.css";

const Profile = ({ photo, fileChanged, isLoading, signOut }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <header className={s.profile}>
      <img src={photo} alt="photo" className={s.profilePhoto} />
      <div className={i.wrapper}>
        <div className={i.fileUpload}>
          <input className={i.inputUpload} type="file" onChange={fileChanged} />
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>
      <button onClick={signOut}>SIGN OUT</button>
    </header>
  );
};

export default Profile;
