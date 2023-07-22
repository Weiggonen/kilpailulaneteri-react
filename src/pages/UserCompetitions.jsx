import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserCompetitions = () => {
  const storedComps = JSON.parse(localStorage.getItem("competitions"));
  let userCompIds = JSON.parse(localStorage.getItem("userCompetitions"));
  const [userComps, setUserComps] = useState([]);

  useEffect(() => {
    let filteredComps = storedComps.filter(({ id }) =>
      userCompIds.includes(id)
    );
    setUserComps(filteredComps);
  }, [userCompIds]);

  const removeCompetition = (compId) => {
    userCompIds = userCompIds.filter((id) => id !== compId);
    localStorage.setItem("userCompetitions", JSON.stringify(userCompIds));
    setUserComps(userComps.filter((comp) => comp.id !== compId));
  };

  return (
    <div className="container text-nowrap">
      <h1 className="text-center mt-5">Omat kisat</h1>
      <div className="table-responsive">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Päivämäärä</th>
              <th>Luokka</th>
              <th>Kilpailun nimi</th>
              <th>Sijainti</th>
              <th>Ilmoittautuminen päättyy</th>
              <th>WA</th>
              <th>Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {userComps.map((comp) => {
              const date = new Date(comp.date);
              const formattedDate = `${date
                .getDate()
                .toString()
                .padStart(2, "0")}.${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${date.getFullYear()}`;

              const registrationDeadline = new Date(comp.registrationDeadline);
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
                <tr key={comp.id}>
                  <td>{formattedDate}</td>
                  <td>{comp.classification}</td>
                  <td>
                    <Link to={`/competition/${comp.id}`}>
                      {comp.competitionName}
                    </Link>
                  </td>
                  <td>{comp.location}</td>
                  <td>{formattedDeadline}</td>
                  <td>{comp.wa}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => removeCompetition(comp.id)}
                    >
                      Poista
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCompetitions;
