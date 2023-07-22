import React, { useState, useEffect } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";

const SignToComp = () => {
  const [sportID, setSportID] = useState(null);
  const [athleteData, setAthleteData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const navigate = useNavigate();

  // Ilmoittajan tiedot state
  const [reporterData, setReporterData] = useState({
    etunimi: "",
    sukunimi: "",
    sahkoposti: "",
    puhelinnumero: "",
  });
  const { id } = useParams();

  const athletes = [
    {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1992-03-21",
      sportID: 1,
      gender: "male",
      clubName: "The Speedsters",
    },
    {
      firstName: "Lisa",
      lastName: "Smith",
      birthDate: "1985-10-17",
      sportID: 2,
      gender: "female",
      clubName: "Mountain Climbers United",
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      birthDate: "1990-02-11",
      sportID: 3,
      gender: "male",
      clubName: "The Swim Sharks",
    },
    {
      firstName: "Emma",
      lastName: "Brown",
      birthDate: "1997-05-29",
      sportID: 4,
      gender: "female",
      clubName: "Eagle Eye Archers",
    },
    {
      firstName: "Carlos",
      lastName: "Rodriguez",
      birthDate: "1989-07-12",
      sportID: 5,
      gender: "male",
      clubName: "Victory Strikers",
    },
  ];

  useEffect(() => {
    const storedCompetitions = localStorage.getItem("competitions");
    if (storedCompetitions) {
      setCompetitions(JSON.parse(storedCompetitions));
    }
  }, []);

  useEffect(() => {
    if (competitions.length > 0) {
      const competition = competitions.find((comp) => comp.id === Number(id));
      setSelectedCompetition(competition);
    }
  }, [competitions, id]);

  useEffect(() => {
    if (sportID) {
      const athlete = athletes.find((a) => a.sportID === sportID);
      if (athlete) {
        setAthleteData({
          etunimi: athlete.firstName,
          sukunimi: athlete.lastName,
          seura: athlete.clubName,
          sukupuoli: athlete.gender,
          pb: "", // initialize PB and SB
          sb: "",
        });
      }
    } else {
      setAthleteData(null);
      setSelectedEvent("");
    }
  }, [sportID]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (athleteData && selectedEvent) {
      const signIns = JSON.parse(localStorage.getItem("signIns")) || [];
      signIns.push({
        compId: id,
        athleteData,
        reporterData,
        laji: selectedEvent,
      });
      localStorage.setItem("signIns", JSON.stringify(signIns));
      console.log(JSON.stringify(signIns));
      navigate(`/competition/${id}`);
    }
  };

  const getEventOptions = () => {
    let gender = null;
    if (athleteData && athleteData.sukupuoli === "male") {
      gender = "men";
    } else if (athleteData && athleteData.sukupuoli === "female") {
      gender = "women";
    }
    if (athleteData && selectedCompetition?.categoriesEvents[gender]) {
      return selectedCompetition.categoriesEvents[gender].map(
        (event, index) => (
          <option key={index} value={event}>
            {event}
          </option>
        )
      );
    }
    return null;
  };

  return (
    <div className="container w-75 mb-5">
      <h2>
        Ilmoittaudu kilpailuun{" "}
        <span className="fw-bold">
          {selectedCompetition && selectedCompetition.competitionName}
        </span>
      </h2>
      {selectedCompetition && (
        <form onSubmit={handleFormSubmit}>
          <h3>Urheilijan tiedot</h3>

          <div className="mb-3">
            <label htmlFor="sportID" className="form-label">
              Sportti ID
            </label>
            <input
              type="number"
              className="form-control"
              id="sportID"
              name="sportID"
              value={sportID || ""}
              onChange={(e) => setSportID(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etunimi" className="form-label">
              Etunimi
            </label>
            <input
              type="text"
              className="form-control"
              id="etunimi"
              name="etunimi"
              value={athleteData ? athleteData.etunimi : ""}
              readOnly
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sukunimi" className="form-label">
              Sukunimi
            </label>
            <input
              type="text"
              className="form-control"
              id="sukunimi"
              name="sukunimi"
              value={athleteData ? athleteData.sukunimi : ""}
              readOnly
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="seura" className="form-label">
              Seura
            </label>
            <input
              type="text"
              className="form-control"
              id="seura"
              name="seura"
              value={athleteData ? athleteData.seura : ""}
              readOnly
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="laji" className="form-label">
              Laji
            </label>
            <select
              className="form-select"
              id="laji"
              name="laji"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
            >
              <option value="">Valitse Laji</option>
              {getEventOptions()}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="pb" className="form-label">
              Personal Best (PB)
            </label>
            <input
              type="text"
              className="form-control"
              id="pb"
              name="pb"
              value={athleteData ? athleteData.pb : ""}
              onChange={(e) =>
                setAthleteData({ ...athleteData, pb: e.target.value })
              }
              placeholder="00,00 / 000 / 00:00:00"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sb" className="form-label">
              Season Best (SB)
            </label>
            <input
              type="text"
              className="form-control"
              id="sb"
              name="sb"
              value={athleteData ? athleteData.sb : ""}
              onChange={(e) =>
                setAthleteData({ ...athleteData, sb: e.target.value })
              }
              placeholder="00,00 / 000 / 00:00:00"
            />
          </div>

          <h3>Ilmoittajan tiedot</h3>

          <div className="mb-3">
            <label htmlFor="reporterFirstName" className="form-label">
              Etunimi
            </label>
            <input
              type="text"
              className="form-control"
              id="reporterFirstName"
              name="etunimi"
              value={reporterData.etunimi}
              onChange={(e) =>
                setReporterData({ ...reporterData, etunimi: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="reporterLastName" className="form-label">
              Sukunimi
            </label>
            <input
              type="text"
              className="form-control"
              id="reporterLastName"
              name="sukunimi"
              value={reporterData.sukunimi}
              onChange={(e) =>
                setReporterData({ ...reporterData, sukunimi: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="reporterEmail" className="form-label">
              Sähköposti
            </label>
            <input
              type="email"
              className="form-control"
              id="reporterEmail"
              name="sahkoposti"
              value={reporterData.sahkoposti}
              onChange={(e) =>
                setReporterData({ ...reporterData, sahkoposti: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="reporterPhoneNumber" className="form-label">
              Puhelinnumero
            </label>
            <input
              type="tel"
              className="form-control"
              id="reporterPhoneNumber"
              name="puhelinnumero"
              value={reporterData.puhelinnumero}
              onChange={(e) =>
                setReporterData({
                  ...reporterData,
                  puhelinnumero: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary text-light">
            Ilmoittaudu
          </button>
        </form>
      )}
    </div>
  );
};

export default SignToComp;
