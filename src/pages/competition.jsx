import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Competition = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    const competitions = JSON.parse(localStorage.getItem("competitions"));
    const foundCompetition = competitions.find(
      (comp) => comp.id === parseInt(id)
    );
    setCompetition(foundCompetition);
  }, [id]);

  if (!competition) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const date = new Date(competition.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const registrationDeadline = new Date(competition.registrationDeadline);
  const formattedDeadline = `${registrationDeadline
    .getDate()
    .toString()
    .padStart(2, "0")}.${(registrationDeadline.getMonth() + 1)
    .toString()
    .padStart(
      2,
      "0"
    )}.${registrationDeadline.getFullYear()} ${registrationDeadline
    .getHours()
    .toString()
    .padStart(2, "0")}:${registrationDeadline
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-0">{competition.competitionName}</h2>
          <Link
            to={`/competition/signin/${id}`}
            className="btn btn-primary text-light"
          >
            Ilmoittaudu kilpailuun
          </Link>
        </div>
        <div className="card-body">
          <p className="card-text">
            Järjestävä seura: {competition.eventOrganizer}
          </p>
          <p className="card-text">Pvm: {formattedDate}</p>
          <p className="card-text">Sijainti: {competition.location}</p>
          <p className="card-text">
            Osallistumismaksu: {competition.registrationFee}
          </p>
          <p className="card-text">
            Ilmoittatuminen päättyy: {formattedDeadline}
          </p>
          <div className="mt-3">
            <Link
              to={`/competition/signins/${id}`}
              className="btn btn-outline-primary"
            >
              Ilmoittautuneet
            </Link>
          </div>
          <h3 className="card-subtitle mb-2 text-muted mt-3">Lajit:</h3>
          <div className="row">
            <div className="col-md-6">
              <h4>Miehet:</h4>
              <ul className="list-group list-group-flush">
                {competition.categoriesEvents.men.map((event, index) => (
                  <li key={index} className="list-group-item">
                    {event}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h4>Naiset:</h4>
              <ul className="list-group list-group-flush">
                {competition.categoriesEvents.women.map((event, index) => (
                  <li key={index} className="list-group-item">
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <h5>Lisätiedot:</h5>
            <p>{competition.additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;
