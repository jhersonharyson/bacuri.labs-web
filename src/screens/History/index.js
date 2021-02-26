import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
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
import UserService from "../../services/UserService";
import HistoryService from "../../services/HistoryService";
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

const History = () => {
  const [history, setHistory] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [listOfDisplayedHistory, setListOfDisplayedHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("MY");
  const [range, setRange] = useState(null);

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

    const filtered =
      !query && filter == "ALL"
        ? history
        : history.filter(h =>
            [
              h.patient.id,
              h.patient.firstName,
              h.patient.lastName,
              new Date(h.createAt).toLocaleDateString(),
              h.professional.id,
              h.campaign?.title
            ]
              .map(h => {
                // console.log(`${h}`);
                // alert(UserService.getUser().id);
                return `${h}`;
              })
              .some(
                text =>
                  text &&
                  text?.toLowerCase()?.includes(query?.toLowerCase()) &&
                  (filter == "MY"
                    ? h.professional.id == UserService.getUser().id
                    : true) &&
                  (filter == "RANGE"
                    ? new Date(h.createAt)?.toLowerCase()?.includes(range)
                    : true)
              )
          );
    setListOfDisplayedHistory(filtered);
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

  const listItem = (history, key) => (
    <div className="item" key={key}>
      <Description>
        <TextDescription
          style={{ color: "#fff" }}
          className="badge btn-success"
        >
          Paciente{" "}
          {`${history.patient.firstName[0]}${
            history.patient.lastName[0]
          }`.toUpperCase()}
        </TextDescription>
        <Dot />
        <span className="badge  alert-warning" style={{ color: "#000" }}>
          Ministrado por #{history.professional.id}
        </span>

        <Dot />

        <span className="badge btn-light" style={{ color: "#000" }}>
          {history.vaccine.name} | {DOSAGE[history.vaccine.dosage]}{" "}
        </span>

        {history.campaign != null && (
          <span className="d-flex align-items-center tooltip-area">
            <Dot />
            <span className="badge btn-light" style={{ color: "#000" }}>
              Campanha
            </span>
            <span
              className="card btn-dark tooltip-text"
              style={{ color: "#fff" }}
            >
              <img
                src={history.campaign.image}
                style={{ width: "100%", objectFit: "contain" }}
              />
              <strong>Campanha</strong> {history.campaign.title} <br />
              <strong>Descrição</strong> {history.campaign.description}
            </span>
          </span>
        )}
      </Description>

      <span
        style={{
          fontSize: "12px",
          display: "flex",
          alignItens: "center"
        }}
      >
        <div>
          <div>
            {new Date(history.createAt).toLocaleDateString()}{" "}
            {new Date(history.createAt).toLocaleTimeString()}
          </div>
          <span className="badge btn-warning" style={{ color: "#000" }}>
            {`T${history.transactionId.split(",")[0]}#${history.patient.id}`}
          </span>
        </div>
        <button
          className="btn btn-link ml-5"
          onClick={() => setSelectedHistory(history)}
        >
          <FiEye />
        </button>
      </span>
    </div>
  );

  const historyList = () =>
    listOfDisplayedHistory.map((vaccine, key) => listItem(vaccine, key));

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setHistory((await HistoryService.getAll()) || []);
      setListOfDisplayedHistory(history);
      setLoading(false);
    };
    fetch();
    return () => {};
  }, []);

  // useEffect(() => {
  //   const fetch = async () => {
  //     setLoading(true);
  //     const myId = UserService.getUser().id;
  //     const filtered =
  //       filter == "MY"
  //         ? history.filter(h => (h.professional.id = myId))
  //         : history;
  //     setListOfDisplayedHistory(filtered);
  //     setLoading(false);
  //   };
  //   fetch();
  //   return () => {};
  // }, [filter]);

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onFormLotSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const code = btoa(
      `professionalProfileId=${
        UserService.getUser().dependentProfiles[0].id
      }&vaccineId=${
        selectedVaccine.id
      }&lot=${lot}&transactionId=${new Date().getTime()}_${
        UserService.getUser().dependentProfiles[0].id
      }`
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
    setListOfDisplayedHistory(history);
  };

  const buildResultFeedback = () =>
    `${listOfDisplayedHistory.length} resultados encontradas ${
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
            <li className="nav-text">Recentes</li>
            <li>
              {history.slice(0, 5).map(h => (
                <div className="d-flex align-itens-start" href="#">
                  <span className="d-flex align-items-start mt-2 mr-0 pr-0">
                    <strong
                      style={{
                        color: "#fff",
                        fontSize: "24px"
                      }}
                    >
                      {`${h.patient.firstName[0]}${
                        h.patient.lastName[0]
                      }`.toUpperCase()}
                    </strong>
                  </span>
                  <div className="ml-0">
                    <span style={{ fontSize: "12px" }}>
                      {new Date(h.createAt).toLocaleDateString()}
                    </span>

                    <div
                      style={{ fontSize: "9px", marginTop: "-3px", padding: 0 }}
                    >
                      {new Date(h.createAt).toLocaleTimeString()}
                      <br />
                      {`T${h.transactionId.split(",")[0]}#${h.patient.id}`}
                    </div>
                  </div>
                </div>
              ))}
            </li>
            <li>
              {loading && <Loader />}

              {!loading && (
                <p
                  className="mx-2 mt-3 mb-0 text-muted text-uppercase mb-1"
                  style={{ fontSize: "12px" }}
                >
                  <strong className="mx-1" style={{ color: "#fff" }}>
                    {history.length}{" "}
                  </strong>{" "}
                  registros
                </p>
              )}
            </li>
            <li>
              <div className="divider mt-3 ml-0 pl-1 mr-2 mb-2" />
            </li>
            <li className="nav-text">Mais</li>
            <li>
              <div href="#" />
              <Link
                className="btn-warning btn-sm mx-2 mt-0 mb-0"
                style={{
                  textAlign: "center",
                  border: "2px solid #fff",
                  color: "#000",
                  fontWeight: "bolder"
                }}
                to="/campaign"
              >
                Ver Campanhas
              </Link>
            </li>
            <li>
              <div href="#" />
              <Link
                className="btn-light btn-sm mx-2 mt-0 mb-0"
                style={{
                  textAlign: "center",
                  border: "2px solid #fff",
                  color: "#000",
                  fontWeight: "bolder"
                }}
                to="/apply"
              >
                Ver Vacinas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col">
        <div className="row fluid header">
          <div className="label">
            <span>Vacinas</span>
            <h2>Histórico</h2>
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

        <div className="divider mb-4" />
        <div className="row justify-content-start">
          <div
            class={
              "btn-outline-light btn-lg ml-4 mt-3 mb-5 col-2 " +
              (filter == "MY" ? "active" : "")
            }
            style={{ textAlign: "center", border: "1px solid #fff" }}
            onClick={() => {
              setFilter("MY");
              setTimeout(() => onSearch(query), 600);
            }}
          >
            Meus Registros
          </div>

          <div
            class={
              "btn-outline-light btn-lg ml-4 mt-3 mb-5 col-1 " +
              (filter == "ALL" ? "active" : "")
            }
            style={{ textAlign: "center", border: "1px solid #fff" }}
            onClick={() => {
              setFilter("ALL");
              setTimeout(() => onSearch(query), 600);
            }}
          >
            Todos
          </div>

          <div
            class={
              "btn-outline-light btn-lg ml-4 mt-3 mb-5 col-1 " +
              (filter == "RANGE" ? "active" : "")
            }
            style={{ textAlign: "center", border: "1px solid #fff" }}
            onClick={() => setFilter("RANGE")}
          >
            Período
          </div>

          {filter == "RANGE" && (
            <div
              class="btn-outline-light date-range-container btn-lg ml-4 mt-3 mb-5 col-3"
              style={{ textAlign: "center", border: "1px solid #fff" }}
            >
              <input
                onChange={event => setRange(event.target.value)}
                type="date"
                className="form-control form-control-sm"
              />
            </div>
          )}

          {filter == "RANGE" && (
            <div
              class="btn-danger btn-lg ml-4 mt-3 mb-5 col-1"
              style={{ textAlign: "center", border: "1px solid #fff" }}
              onClick={() => setFilter("MY")}
            >
              <FiX style={{ fontSize: "14px" }} />
            </div>
          )}
        </div>

        <div className="row">
          <div className="col list-container">
            <div className="list">
              <h6>{buildResultFeedback()}</h6>
              {loading && <Loader />}
              {historyList()}
            </div>
            <div className="d-grid gap-2 d-md-block mb-5">
              {history.length != listOfDisplayedHistory.length && (
                <button className="btn primary btn-sm" onClick={showAllVacines}>
                  Ver todas as vacinas
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

export default History;
