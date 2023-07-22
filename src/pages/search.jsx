import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [search, setSearch] = useState({
    startDate: "",
    endDate: "",
    classification: "",
    location: "",
    events: "",
    gender: "",
    ageGroup: "",
  });

  // Placeholder list of Finnish cities
  const cities = ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"];

  useEffect(() => {
    const loadedCompetitions = JSON.parse(localStorage.getItem("competitions"));
    if (loadedCompetitions) {
      setCompetitions(loadedCompetitions);
      setFilteredCompetitions(loadedCompetitions);
    }
  }, []);

  useEffect(() => {
    let newFilteredCompetitions = competitions;
    newFilteredCompetitions = newFilteredCompetitions.filter((comp) => {
      const competitionDate = new Date(comp.date).getTime();
      const genderMatch =
        search.gender === ""
          ? comp.categoriesEvents.men.includes(search.events) ||
            comp.categoriesEvents.women.includes(search.events)
          : comp.categoriesEvents[search.gender]?.includes(search.events);

      return (
        (search.startDate === "" ||
          new Date(search.startDate).getTime() <= competitionDate) &&
        (search.endDate === "" ||
          new Date(search.endDate).getTime() >= competitionDate) &&
        (search.classification === "" ||
          comp.classification.includes(search.classification)) &&
        (search.location === "" || comp.location.includes(search.location)) &&
        (search.events === "" || genderMatch)
      );
    });
    setFilteredCompetitions(newFilteredCompetitions);
  }, [search]);

  const classifications = ["GP", "CP", "EP", "SP"];
  const genders = [
    { label: "Miesten", value: "men" },
    { label: "Naisten", value: "women" },
  ];

  // Generate a list of unique event names
  const eventSet = new Set();
  competitions.forEach((comp) => {
    comp.categoriesEvents.men.forEach((event) => eventSet.add(event));
    comp.categoriesEvents.women.forEach((event) => eventSet.add(event));
  });
  const events = Array.from(eventSet);

  return (
    <div className="container text-nowrap">
      <h1 className="mt-5">Haku</h1>

      <form className="row g-3">
        <div className="col">
          <label>Alku</label>
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            value={search.startDate}
            onChange={(e) =>
              setSearch({ ...search, startDate: e.target.value })
            }
          />
        </div>
        <div className="col">
          <label>Loppu</label>
          <input
            type="date"
            className="form-control"
            placeholder="End Date"
            value={search.endDate}
            onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
          />
        </div>
        <div className="col">
          <label>Taso</label>
          <select
            className="form-control"
            value={search.classification}
            onChange={(e) =>
              setSearch({ ...search, classification: e.target.value })
            }
          >
            <option value="">Valitse taso...</option>
            {classifications.map((classification) => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Paikkakunta</label>
          <select
            className="form-control"
            value={search.location}
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
          >
            <option value="">Valitse paikkakunta...</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Laji</label>
          <select
            className="form-control"
            value={search.events}
            onChange={(e) => setSearch({ ...search, events: e.target.value })}
          >
            <option value="">Valitse laji...</option>
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Sarja</label>
          <select
            className="form-control"
            value={search.gender}
            onChange={(e) => setSearch({ ...search, gender: e.target.value })}
          >
            <option value="">Valitse sarja...</option>
            {genders.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="table-responsive mt-4">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Pvm</th>
              <th>Paikkakunta</th>
              <th>Kilpailu</th>
              <th>Taso</th>
              <th>Ilmoittautuminen päättyy</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions.map((comp) => (
              <tr key={comp.id}>
                <td>{comp.date}</td>
                <td>{comp.location}</td>
                <td>
                  <Link to={`/competition/${comp.id}`}>
                    {comp.competitionName}
                  </Link>
                </td>
                <td>{comp.classification}</td>
                <td>{comp.registrationDeadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
