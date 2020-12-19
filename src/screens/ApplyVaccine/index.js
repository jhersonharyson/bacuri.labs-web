import React, { useState, useEffect } from "react";
import VaccineService from "../../services/VaccineService";
import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownButton,
  HelpIcon
} from "./styles.js";
import "./styles.scss";
const ApplyVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [listOfDisplayedVaccines, setListOfDisplayedVaccines] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  onSearch = query => {
    setQuery(query);

    const filtered = !query
      ? vaccines
      : vaccines.filter(vaccine =>
          [vaccine.name, vaccine.preventedDiseases, vaccine.observation].some(
            text => text.includes(query)
          )
        );
    setListOfDisplayedVaccines(filtered);
  };

  listItem = ({ name, observation, preventedDiseases }) => (
    <div class="item">
      <span>{name}</span>
      <span>
        <HelpIcon />
      </span>
    </div>
  );

  vaccineList = () => vaccines.map(vaccine => listItem(vaccine));

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await setVaccines(await VaccineService.getAll());
      await setListOfDisplayedVaccines(vaccines);
      setLoading(false);
    };
  });

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="container">
      <div className="col" id="sidebar">
        <nav>
          <div className="header">
            <div className="brand" href="#">
              <i className="fa fa-rocket" />
            </div>
            <button id="menu">
              <i className="fa fa-bars" />
            </button>
          </div>
          <ul>
            <li className="search">
              <input
                className="form-control"
                id="search"
                placeholder="Search..."
              />
              <button className="btn-search">
                <i className="fa fa-lg fa-search" />
              </button>
            </li>
            <li className="nav-text">Vaccines</li>
            <li>
              <div className="active" href="#">
                Overview
              </div>
            </li>
            <li>
              <div href="#">Order history</div>
            </li>
            <li>
              <div href="#">Fluid layout</div>
            </li>
            <li>
              <div href="#">Icon nav</div>
            </li>
            <li className="nav-text">More</li>
            <li>
              <div href="#">Toolkit docs</div>
            </li>
            <li>
              <div href="#">Bootstrap docs</div>
            </li>
            <li>
              <div href="#">Light UI</div>
            </li>
            <li>
              <div href="#">Example modal</div>
            </li>
            <li>
              <div className="divider" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="col">
        <div className="row fluid header">
          <div className="label">
            <span>Vaccine</span>
            <h2>Application</h2>
          </div>
        </div>
        <div className="divider" />

        <div className="row">
          <form className="d-flex" onSubmit={onSubmit}>
            <input
              className="form-control mr-2 btn-sm"
              type="search"
              value={query}
              onChange={event => setQuery()}
              placeholder="Search by vaccine name"
              aria-label="Search"
            />
            <button className="btn btn-outline-success btn-sm" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="divider" />

        <div className="row">
          <div className="col list-container">
            <div className="list">
              <h6>
                {listOfDisplayedVaccines.length} vaccines founded for "{query}"
              </h6>
              {vaccineList()}
            </div>
            <div class="d-grid gap-2 d-md-block mb-5">
              <button className="btn primary btn-sm">View all vaccines</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyVaccine;
