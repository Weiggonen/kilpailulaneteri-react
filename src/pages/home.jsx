import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

const Home = () => {
  const [selectedCompetitions, setSelectedCompetitions] = useState(
    JSON.parse(localStorage.getItem("userCompetitions")) || []
  );
  const { profileCreated, setProfileCreated } = useContext(GlobalContext);
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      registrationFee: "26€",
      eventOrganizer: "Espoo Athletics",
      date: "2023-07-05",
      classification: "GP",
      competitionName: "Joensuun Motonet GP",
      location: "Joensuu",
      registrationDeadline: "2023-06-25T23:59",
      wa: "C",
      categoriesEvents: {
        men: [
          "400m",
          "1600m",
          "7000m",
          "400m aidat",
          "3000 esteet",
          "Kolmiloikka",
          "Seiväs",
          "Kuula",
        ],
        women: [
          "400m",
          "1600m",
          "7000m",
          "Korkeus",
          "Pituus",
          "Moukari",
          "Keihäs",
        ],
      },
    },
    {
      id: 2,
      registrationFee: "30€",
      eventOrganizer: "Tampere Athletics",
      date: "2023-07-15",
      classification: "SP",
      competitionName: "Tampereen Motonet SP",
      location: "Tampere",
      registrationDeadline: "2023-07-05T23:59",
      wa: "B",
      categoriesEvents: {
        men: [
          "200m",
          "800m",
          "5000m",
          "110m hj",
          "3000m st",
          "long jump",
          "high jump",
          "javelin",
        ],
        women: [
          "200m",
          "800m",
          "5000m",
          "100m hj",
          "1500m st",
          "triple jump",
          "pole vault",
          "discus throw",
        ],
      },
    },
    {
      id: 3,
      registrationFee: "35€",
      eventOrganizer: "Oulu Athletics",
      date: "2023-07-25",
      classification: "EP",
      competitionName: "Oulun Motonet EP",
      location: "Oulu",
      registrationDeadline: "2023-07-15T23:59",
      wa: "A",
      categoriesEvents: {
        men: [
          "100m",
          "1500m",
          "10000m",
          "110m hj",
          "steeplechase",
          "high jump",
          "long jump",
          "discus throw",
        ],
        women: [
          "100m",
          "1500m",
          "10000m",
          "100m hj",
          "steeplechase",
          "high jump",
          "long jump",
          "shot put",
        ],
      },
    },
    {
      id: 4,
      registrationFee: "28€",
      eventOrganizer: "Helsinki Athletics",
      date: "2023-08-05",
      classification: "CP",
      competitionName: "Helsingin Motonet CP",
      location: "Helsinki",
      registrationDeadline: "2023-07-26T23:59",
      wa: "D",
      categoriesEvents: {
        men: [
          "200m",
          "800m",
          "5000m",
          "hurdles",
          "3000m st",
          "triple jump",
          "pole vault",
          "hammer throw",
        ],
        women: [
          "200m",
          "800m",
          "5000m",
          "hurdles",
          "3000m st",
          "triple jump",
          "pole vault",
          "hammer throw",
        ],
      },
    },
  ]);

  localStorage.setItem("competitions", JSON.stringify(competitions));

  const handleCheckboxChange = (event) => {
    if (profileCreated) {
      const { value, checked } = event.target;
      if (checked) {
        setSelectedCompetitions((prev) => [...prev, Number(value)]);
      } else {
        setSelectedCompetitions((prev) =>
          prev.filter((id) => id !== Number(value))
        );
      }
    } else {
      alert("Luo profiili lisätäksesi kilpailuja omaan listaan");
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "userCompetitions",
      JSON.stringify(selectedCompetitions)
    );
  }, [selectedCompetitions]);

  return (
    <div className="container text-nowrap">
      <h1 className="text-center mt-5">10 seuraavan päivän kilpailut</h1>
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
              <th>Omat kisat</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((comp) => {
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
                    <input
                      type="checkbox"
                      value={comp.id}
                      checked={selectedCompetitions.includes(comp.id)}
                      onChange={handleCheckboxChange}
                    />
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

export default Home;
