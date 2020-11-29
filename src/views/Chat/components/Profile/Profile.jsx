import React from "react";
import Loader from "./../../../utils/Loader/Loader";
import inputStyle from "./UploadInput.module.css";
import style from "./../../Chat.module.css";

const Profile = ({ photo, fileChanged, isLoadingAvatar, signOut, login }) => {
  if (isLoadingAvatar) {
    return <Loader />;
  }
  return (
    <header className={style.profile}>
      <button onClick={signOut}>SIGN OUT</button>
      <img src={photo} className={style.profilePhoto} />
      <h2 className={style.profileLogin}>{login}</h2>
      <div className={inputStyle.wrapper}>
        <div className={inputStyle.fileUpload}>
          <input className={inputStyle.inputUpload} type="file" onChange={fileChanged} />
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>
    </header>
  );
};

export default Profile;
