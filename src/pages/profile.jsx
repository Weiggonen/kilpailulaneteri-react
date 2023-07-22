import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  if (profile) {
    return (
      <div className="container w-75">
        <h1>Profiili</h1>
        <div>
          <p>
            <strong>Etunimi:</strong> {profile.firstName}
          </p>
          <p>
            <strong>Sukunimi:</strong> {profile.lastName}
          </p>
          <p>
            <strong>Sähköposti:</strong> {profile.email}
          </p>
          <p>
            <strong>Puhelinnumero:</strong> {profile.phoneNumber}
          </p>
        </div>
        <button className="btn btn-primary text-light mt-4">
          <Link
            to="/profile/edit"
            style={{ textDecoration: "none", color: "white" }}
          >
            Muokkaa profiilia
          </Link>
        </button>
      </div>
    );
  } else {
    return (
      <div className="container w-75">
        <h1>Profiili</h1>
        <p>Ei profiilia löytynyt.</p>
        <button className="btn btn-primary text-light">
          <Link
            to="/profile/create"
            style={{ textDecoration: "none", color: "white" }}
          >
            Luo tili
          </Link>
        </button>
      </div>
    );
  }
};

export default Profile;
