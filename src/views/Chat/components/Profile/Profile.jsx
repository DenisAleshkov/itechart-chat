import React from "react";
import Loader from "./../../../utils/Loader/Loader";
import i from "./UploadInput.module.css";
import s from "./../../Chat.module.css";

const Profile = ({ photo, fileChanged, isLoadingAvatar, signOut, login }) => {
  if (isLoadingAvatar) {
    return <Loader />;
  }
  return (
    <header className={s.profile}>
      <button onClick={signOut}>SIGN OUT</button>
      <img src={photo} className={s.profilePhoto} />
      <h2 className={s.profileLogin}>{login}</h2>
      <div className={i.wrapper}>
        <div className={i.fileUpload}>
          <input className={i.inputUpload} type="file" onChange={fileChanged} />
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>
    </header>
  );
};

export default Profile;
