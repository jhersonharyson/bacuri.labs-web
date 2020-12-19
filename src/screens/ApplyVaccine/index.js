import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { FiEye, FiEyeOff } from "react-icons/fi";
import VaccineService from "../../services/VaccineService";
import { Dot, Description, TextDescription, Modal } from "./styles";
import "./styles.scss";

const RANGE = {
  INFANT: "INFANTIL",
  TEENAGER: "ADOLECENTE",
  ADULT: "ADULTO"
};

const DOSAGE = {
  DOSAGE_UNIQUE: "Dosagem Única",
  DOSAGE_1: "1º Dosagem",
  DOSAGE_2: "2º Dosagem",
  DOSAGE_3: "3º Dosagem",
  DOSAGE_REINFORCEMENT: "Reforço",
  DOSAGE_1_REINFORCEMENT: "1º Reforço",
  DOSAGE_2_REINFORCEMENT: "2º Reforço",
  DOSAGE_INITIAL: "Dosagem Inicial",
  DOSAGE_YEARLY: "Dosagem Anual",
  DOSAGE_DECADE: "A cada 10 anos"
};

const ApplyVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [listOfDisplayedVaccines, setListOfDisplayedVaccines] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [observation, setObservation] = useState(false);
  const [lot, setLot] = useState("");
  const [loading, setLoading] = useState(true);

  const onSearch = query => {
    setQuery(query);

    const filtered = !query
      ? vaccines
      : vaccines.filter(vaccine =>
          [vaccine.name, vaccine.preventedDiseases, vaccine.observation].some(
            text => text?.toLowerCase()?.includes(query?.toLowerCase())
          )
        );
    setListOfDisplayedVaccines(filtered);
  };

  const badgeClass = range => {
    return (
      "badge btn-" +
      (range == "INFANT"
        ? "success"
        : range == "TEENAGER"
        ? "secondary"
        : "warning")
    );
  };

  const buildInitialRangeLabel = range => {
    const LESS_THAN_TWO_YEARS = 12 * 2 - 1;
    if (range < LESS_THAN_TWO_YEARS) {
      return `a partir de ${range} meses`;
    }

    return `a partir de ${Math.floor(range / 12)} anos`;
  };

  const buildRangeLabel = (initial, final) => {
    const LESS_THAN_TWO_YEARS = 12 * 2 - 1;
    const label = "Faixa etária para aplicação";
    let range = "";

    if (initial < LESS_THAN_TWO_YEARS)
      range = `de ${initial} até ${final} meses`;
    else
      range = `de ${Math.floor(initial / 12)} até ${Math.ceil(
        final / 12
      )} anos`;

    return <p className="mb-1">{`${label} ${range}`}</p>;
  };

  const buildDosageLabel = dosage => <p className="mb-1">{DOSAGE[dosage]}</p>;

  const listItem = (
    { name, observation, preventedDiseases, initialRange, range, dosage },
    key
  ) => (
    <div className="item" key={key}>
      <Description>
        {name}
        <Dot />
        <span className={badgeClass(range)}>{RANGE[range]}</span>
        <Dot />
        <TextDescription>
          {buildInitialRangeLabel(initialRange)}
        </TextDescription>
        <Dot />
        <TextDescription>{DOSAGE[dosage]}</TextDescription>
      </Description>
      <span>
        <FiEye />
      </span>
    </div>
  );

  const vaccineList = () =>
    listOfDisplayedVaccines.map((vaccine, key) => listItem(vaccine, key));

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setVaccines((await VaccineService.getAll()) || []);
      setListOfDisplayedVaccines(vaccines);
      setLoading(false);
    };
    fetch();
    return () => {};
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const showAllVacines = () => {
    setQuery("");
    setListOfDisplayedVaccines(vaccines);
  };

  const buildResultFeedback = () =>
    `${listOfDisplayedVaccines.length} vaccines founded ${
      !!query && !loading ? "for '" + query + "'" : ""
    }`;

  const buildNextDosageLabel = nextDosage => {
    const LESS_THAN_ONE_YEAR = 12 - 1;
    let label = "";
    if (!nextDosage) return null;
    else if (nextDosage < LESS_THAN_ONE_YEAR) label = `${nextDosage} meses`;
    else label = `${Math.floor(nextDosage / 12)} anos`;

    return <p className="mb-1">Próxima dosagem em {label}</p>;
  };

  const buildPreventDisease = diseases => (
    <p className="mb-1 badge btn-danger">Previne {diseases}</p>
  );
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
              onChange={event => onSearch(event.target.value)}
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
              <h6>{buildResultFeedback()}</h6>
              {loading && <Loader />}
              {vaccineList()}
            </div>
            <div className="d-grid gap-2 d-md-block mb-5">
              {vaccines.length != listOfDisplayedVaccines.length && (
                <button className="btn primary btn-sm" onClick={showAllVacines}>
                  View all vaccines
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Vacinação</h4>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <h4 className="modal-title d-flex align-items-center">
                    {vaccines[0]?.name}
                    <span
                      className={badgeClass(vaccines[0]?.range)}
                      style={{ fontSize: "10px", marginLeft: "8px" }}
                    >
                      {RANGE[(vaccines[0]?.range)]}
                    </span>
                  </h4>

                  <div className="modal-title">
                    {buildDosageLabel(vaccines[0]?.dosage)}

                    {buildRangeLabel(
                      vaccines[1]?.initialRange,
                      vaccines[1]?.finalRange
                    )}

                    {buildNextDosageLabel(vaccines[2]?.nextDosage)}

                    {buildPreventDisease(vaccines[2]?.preventedDiseases)}

                    {vaccines[2]?.observation && (
                      <div
                        className="observation alert alert-light mb-1"
                        role="alert"
                      >
                        {vaccines[1]?.observation}
                      </div>
                    )}
                  </div>
                </div>
                {/*<div className="mt-2">
                  <label>Lote</label>
                  <input
                    className="form-control input-sm"
                    id="lot"
                    placeholder="Lote da vacina"
                  />
                </div>*/}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplyVaccine;
