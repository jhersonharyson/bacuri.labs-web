import React, { useState, useEffect, useCallback } from "react";
import QRCode from "react-qr-code";
import Loader from "../../components/Loader";
import { FiEye, FiPackage, FiX, FiSlash } from "react-icons/fi";
import {
  FaSyringe,
  FaCalendarDay,
  FaFileMedicalAlt,
  FaSignInAlt,
  FaInfoCircle,
  FaSortNumericDown,
  FaUserShield,
  FaShieldAlt,
  FaVial,
  FaNotesMedical,
  FaQrcode
} from "react-icons/fa";
import VaccineService from "../../services/VaccineService";
import UserService from "../../services/UserService";
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

const ICONS = [
  <FaUserShield />,
  <FaVial />,
  <FaSortNumericDown />,
  <FaFileMedicalAlt />,
  <FaSignInAlt />,
  <FaCalendarDay />
];

const ApplyVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [listOfDisplayedVaccines, setListOfDisplayedVaccines] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [applyVaccine, setApplyVaccine] = useState(null);
  const [lot, setLot] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(null);
  const [invalidCode, setInvalidCode] = useState(true);
  const [progress, setProgess] = useState(0);
  const [loading, setLoading] = useState(true);

  let secondsSpent = 0;
  let interval;

  useEffect(() => {
    setApplyVaccine(null);
    setLot("");
    setPassword("");
    setCode(null);
    setInvalidCode(true);
  }, [selectedVaccine]);

  useEffect(() => {
    clearInterval(interval);
  }, [code]);

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

    return `${label} ${range}`;
  };

  const buildDosageLabel = dosage => DOSAGE[dosage];

  const listItem = (vaccine, key) => (
    <div className="item" key={key}>
      <Description>
        {vaccine.name}
        <Dot />
        <span className={badgeClass(vaccine.range)}>
          {RANGE[vaccine.range]}
        </span>
        <Dot />
        <TextDescription>
          {buildInitialRangeLabel(vaccine.initialRange)}
        </TextDescription>
        <Dot />
        <TextDescription>{DOSAGE[vaccine.dosage]}</TextDescription>
      </Description>
      <button
        className="btn btn-link"
        onClick={() => setSelectedVaccine(vaccine)}
      >
        <FiEye />
      </button>
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

  const onFormLotSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const code = btoa(
      `${UserService.getUser().dependentProfiles[0].id}@${
        selectedVaccine.id
      }@${lot}@transactionId@${new Date().getTime()}`
    );
    setCode(code);
    setProgess(0);
    setInvalidCode(false);
    progressInterval();
  };

  const progressInterval = () => {
    const EXPIRES_IN_15_MINUTES = 1000 * 60 * 15;

    interval = setInterval(() => {
      if (secondsSpent > EXPIRES_IN_15_MINUTES / 1000) {
        clearInterval(interval);
        setInvalidCode(true);
      }
      secondsSpent++;
      setProgess((secondsSpent * 100 * 1000) / EXPIRES_IN_15_MINUTES);
    }, 1000);
  };

  const showAllVacines = () => {
    setQuery("");
    setListOfDisplayedVaccines(vaccines);
  };

  const buildResultFeedback = () =>
    `${listOfDisplayedVaccines.length} vacinas encontradas ${
      !!query && !loading ? "para o termo '" + query + "'" : ""
    }`;

  const buildNextDosageLabel = nextDosage => {
    const LESS_THAN_ONE_YEAR = 12 - 1;
    let label = "";
    if (!nextDosage) return null;
    else if (nextDosage < LESS_THAN_ONE_YEAR) label = `${nextDosage} meses`;
    else label = `${Math.floor(nextDosage / 12)} anos`;

    return `Próxima dosagem em ${label}`;
  };

  const buildPreventDiseaseLabel = diseases => (
    <p className="mb-2 badge btn-danger">{diseases}</p>
  );

  const buildNextVaccineLabel = nextVaccine =>
    nextVaccine
      ? `Próxima vacinação é a ${DOSAGE[nextVaccine.dosage]} da ${
          nextVaccine.name
        }`
      : "";

  const buildAgeRangeLabel = range => `Vacina ${RANGE[range].toLowerCase()}`;

  const buildApplicationDate = () =>
    `Data de aplicação ${new Date().toLocaleDateString()}`;

  const buildObservationLabel = observation =>
    !!observation ? (
      <div className="observation alert alert-light mb-1" role="alert">
        {observation}
      </div>
    ) : (
      ""
    );

  const withDefaultSpan = content => <span className="mb-1">{content}</span>;

  const withIcon = (content, index) => (
    <li>
      {ICONS[index]} {content}
    </li>
  );

  const buildVaccineDetail = vaccine => {
    if (vaccine)
      return [
        buildAgeRangeLabel(vaccine.range),
        buildDosageLabel(vaccine.dosage),
        buildRangeLabel(vaccine?.initialRange, vaccine?.finalRange),
        buildNextDosageLabel(vaccine?.nextDosage),
        buildNextVaccineLabel(vaccine?.nextVaccine),
        buildApplicationDate()
      ]
        .filter(detail => !!detail)
        .map(withIcon)
        .map(withDefaultSpan);
  };

  const buildApplyVaccineinfo = () =>
    applyVaccine && (
      <div className="d-flex col-12">
        <form onSubmit={onFormLotSubmit} className="col-5">
          <h4>
            <FaInfoCircle />
            RESUMO DA VACINA
          </h4>
          <ul>{buildVaccineDetail(selectedVaccine)}</ul>
          <hr />

          <h4>
            <FaSyringe />
            LOTE DA VACINA
          </h4>
          {!code ? (
            <input
              className="form-control mr-2 btn-sm"
              type="search"
              id="lot"
              value={lot}
              required
              onChange={event => setLot(event.target.value)}
              placeholder="Lote da vacina a ser aplicada"
              aria-label="Search"
            />
          ) : (
            <ul>
              <li>
                <FiPackage /> {lot}
              </li>
            </ul>
          )}
          <hr />
          {/*
        <h4>
          <FaShieldAlt />
          CONFIRMAÇÃO DE SEGURANÇA
        </h4>
        <input
          className="form-control mr-2 btn-sm"
          type="password"
          value={password}
          id="password"
          onChange={event => setPassword(event.target.value)}
          placeholder="Confirme sua senha"
          aria-label="Search"
        /> */}
          {!code && (
            <button className="generate-code btn btn-primary active btn-block mt-3">
              <FaQrcode style={{ marginTop: "-3px", marginRight: "6px" }} />
              GERAR CÓDIGO
            </button>
          )}
        </form>
        <span className="col-2" />
        {code && (
          <form className="col-5" onSubmit={onSubmit}>
            <h4>
              <FaQrcode />
              QRCode
            </h4>
            <div className="d-flex">
              <div>
                <div className="qrcode-area">
                  {!invalidCode && code ? <QRCode value={code} /> : <FiSlash />}
                </div>
                {!invalidCode && (
                  <div class="progress mt-2">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style={{ width: 100 - progress + "%" }}
                    />
                  </div>
                )}
                <button
                  className="qrcode-cancel btn btn-warning active btn-sm mt-2 "
                  onClick={() => {
                    clearInterval(interval);
                    setCode(null);
                  }}
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );

  const buildInfoSection = () =>
    selectedVaccine &&
    !applyVaccine && (
      <div>
        <h4>
          <FaInfoCircle />
          INFORMAÇÕES BÁSICAS
        </h4>
        <ul>{buildVaccineDetail(selectedVaccine)}</ul>
        <hr />

        <h4>
          <FaShieldAlt />
          DOENÇAS PREVINIDAS
        </h4>
        {buildPreventDiseaseLabel(selectedVaccine?.preventedDiseases)}
        <hr />

        <h4>
          <FaNotesMedical />
          OBSERVAÇÕES
        </h4>
        {buildObservationLabel(selectedVaccine?.observation) ||
          "Sem observações registradas**"}
      </div>
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
            <span>Vacinas</span>
            <h2>Aplicação</h2>
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
              placeholder="Pesquise pelo nome da vacina"
              aria-label="Search"
            />
            <button className="btn btn-outline-success btn-sm" type="submit">
              Buscar
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
      <Modal show={!!selectedVaccine}>
        <div className="header">
          <button
            className="close btn btn-link"
            onClick={() => setSelectedVaccine(null)}
          >
            <FiX />
          </button>
          <div className="detail">
            <h1 className="modal-title d-flex mb-1">
              <em style={{ fontWeight: "100" }}>{selectedVaccine?.name}</em>
              <div className="apply-divisor ml-5 mt-1">
                <button
                  className="apply btn btn-link"
                  onClick={() => setApplyVaccine(true)}
                >
                  <FaSyringe /> <span> aplicar </span>
                </button>
                <div className="divisor" />
              </div>
            </h1>
          </div>
        </div>

        <div className="body">
          <div className="row">
            {buildInfoSection()}
            {buildApplyVaccineinfo()}
          </div>
        </div>

        {!applyVaccine ? (
          <div className="footer py-4">
            <button
              type="button"
              className="btn btn-outline-danger mr-4"
              onClick={() => setSelectedVaccine(null)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-success active mr-4"
              onClick={() => setApplyVaccine(true)}
            >
              Aplicar vacina
            </button>
          </div>
        ) : (
          <div className="footer py-4">
            <button
              type="button"
              className="btn btn-outline-danger mr-4"
              onClick={() => setApplyVaccine(null)}
            >
              Voltar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApplyVaccine;
