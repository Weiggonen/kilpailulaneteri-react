import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CompSignIns = () => {
  const [competition, setCompetition] = useState(null);
  const [signIns, setSignIns] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const competitions = JSON.parse(localStorage.getItem("competitions")) || [];
    const foundCompetition = competitions.find(
      (comp) => comp.id === parseInt(id)
    );
    setCompetition(foundCompetition);

    const signInsData = JSON.parse(localStorage.getItem("signIns")) || [];
    const foundSignIns = signInsData.filter((signIn) => signIn.compId === id);
    setSignIns(foundSignIns);
  }, [id]);

  // Check if any event has sign-ins
  const anyEventHasSignIns =
    competition &&
    signIns &&
    Object.keys(competition.categoriesEvents).some((gender) =>
      competition.categoriesEvents[gender].some((event) => {
        const eventSignIns = signIns.filter(
          (signIn) =>
            signIn.laji === event &&
            (signIn.sukupuoli === "male" ? "men" : "women") === gender
        );
        return eventSignIns.length > 0;
      })
    );

  return (
    <div>
      {anyEventHasSignIns ? (
        competition &&
        Object.keys(competition.categoriesEvents).map((gender) =>
          competition.categoriesEvents[gender].map((event) => {
            const eventSignIns = signIns.filter(
              (signIn) =>
                signIn.laji === event &&
                (signIn.sukupuoli === "male" ? "men" : "women") === gender
            );
            if (eventSignIns.length > 0) {
              return (
                <div key={event}>
                  <h3>{`${
                    gender === "men" ? "Miesten" : "Naisten"
                  } ${event}`}</h3>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Etunimi</th>
                        <th scope="col">Sukunimi</th>
                        <th scope="col">Seura</th>
                        <th scope="col">SB</th>
                        <th scope="col">PB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventSignIns.map((signIn) => (
                        <tr key={signIn.etunimi + signIn.sukunimi}>
                          <td>{signIn.athleteData.etunimi}</td>
                          <td>{signIn.athleteData.sukunimi}</td>
                          <td>{signIn.athleteData.seura}</td>
                          <td>{signIn.athleteData.sb}</td>
                          <td>{signIn.athleteData.pb}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return null;
          })
        )
      ) : (
        <h1>Ei vielä ilmoittautuneita</h1>
      )}
    </div>
  );
};

export default CompSignIns;
