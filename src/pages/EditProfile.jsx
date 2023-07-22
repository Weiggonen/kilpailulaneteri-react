import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPhoneNumber(profile.phoneNumber);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profile = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    navigate("/profile");
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Muokkaa profiilia</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">Etunimi:</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sukunimi:</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sähköposti:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Puhelinnumero:</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary text-light w-100">
          Tallenna muutokset
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
