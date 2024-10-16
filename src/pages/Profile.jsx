import React, { useState } from "react";

const Profile = () => {
  const [img, setImg] = useState(false);
  return (
    <div
      id="profile"
      className="w-100 vh-100 d-flex justify-content-center align-items-center bg-dark"
    >
      <div className="row border text-white rounded-3 p-2 align-items-center justify-content-between">
        <div className="col-6">
          <h4>Profile Details</h4>
          <div className="my-4">
            <label htmlFor="avatar">
              <img
                src={img ? URL.createObjectURL(img) : "/avatar_icon.png"}
                alt="avatar icon"
                className="w-25 avatar"
              />
              <span className="text-secondary ps-3">Update your profile</span>
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setImg(e.target.files[0])}
              hidden
            />
          </div>
          <form action="#">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="form-control mb-3"
              required
            />
            <textarea
              name="info"
              id="info"
              cols="10"
              placeholder="Your bio..."
              className="form-control mb-3"
              required
            ></textarea>
            <button className="form-control btn btn-primary">Save</button>
          </form>
        </div>
        <div className="col-4">
          <img
            src={img ? URL.createObjectURL(img) : "/logo_icon.png"}
            alt="logo icon"
            className="w-75 img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
