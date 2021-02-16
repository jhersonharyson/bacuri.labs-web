import React from "react";
import "./styles.css";

/************************************
1. If you want to add or remove items you will need to change a variable called $slide-count in the CSS *minimum 3 slides

2. if you want to change the dimensions of the slides you will need to edit the slideWidth variable here 👇 and the $slide-width variable in the CSS.
************************************/
const slideWidth = 30;

const _items = [
  {
    player: {
      title: "CAMPANHA CONTRA SARAMPO",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image:
        "https://static.fecam.net.br/thumbs/719/2957639_resize_1500_840.jpg"
    }
  },
  {
    player: {
      title: "Campanha contra movimento anti vacina",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image:
        "https://www.riopreto.sp.gov.br/wp-content/uploads/2020/10/vacinacao-poliomelite-2020.jpeg"
    }
  },
  {
    player: {
      title: "Multivacinação",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image:
        "https://itaguai.rj.gov.br/wp-content/uploads/2020/02/eb2c5decc9d5e060145bd659c4e610a09513462e.jpg"
    }
  },
  {
    player: {
      title: "Nacional",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image:
        "https://i1.wp.com/santaines.ma.gov.br/wp-content/uploads/2020/10/saude-2.jpg?fit=1200%2C776&ssl=1"
    }
  },
  {
    player: {
      title: "COVID-19",
      desc: "Campanha de vacinação contra covid-19",
      image:
        "https://www.ubatuba.sp.gov.br/wp-content/uploads/sites/2/2021/01/0118-vacinacao-covid19-770x416.jpeg"
    }
  }
];

const length = _items.length;
_items.push(..._items);

const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createItem = (position, idx, activeIdx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`
    },
    player: _items[idx].player
  };

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: "grayscale(1)" };
      break;
    case length:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx, onSelected = () => {} }) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <li
      className="carousel__slide-item"
      style={item.styles}
      onClick={onSelected}
    >
      <div className="carousel__slide-item-img-link">
        <img src={item.player.image} alt={item.player.title} />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.player.title}</h4>
        <p>{item.player.desc}</p>
      </div>
    </li>
  );
};

const keys = Array.from(Array(_items.length).keys());

const Carousel = () => {
  const [items, setItems] = React.useState(keys);
  const [selected, setSelected] = React.useState(null);
  const [isTicking, setIsTicking] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  const handleDotClick = idx => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  React.useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  React.useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
  }, [items]);

  return selected != null ? (
    <ModalDetail
      index={selected}
      onClose={() => {
        setSelected(null);
      }}
    />
  ) : (
    <div>
      <div className="row fluid header">
        <div className="label mb-0 mt-5">
          <h2 className="text-muted">TODAS CAMPANHAS</h2>
        </div>
      </div>
      <div className="carousel__wrap mt-5">
        <div className="carousel__inner">
          <button
            className="carousel__btn carousel__btn--prev"
            onClick={() => prevClick()}
          >
            <i className="carousel__btn-arrow carousel__btn-arrow--left" />
          </button>
          <div className="carousel__container">
            <ul className="carousel__slide-list">
              {items.map((pos, i) => (
                <CarouselSlideItem
                  key={i}
                  idx={i}
                  pos={pos}
                  activeIdx={activeIdx}
                  onSelected={() => setSelected(i)}
                />
              ))}
            </ul>
          </div>
          <button
            className="carousel__btn carousel__btn--next"
            onClick={() => nextClick()}
          >
            <i className="carousel__btn-arrow carousel__btn-arrow--right" />
          </button>
          <div className="carousel__dots">
            {items.slice(0, length).map((pos, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={i === activeIdx ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalDetail = ({ index = 0, onClose = () => {} }) => {
  const item = _items[index].player;
  return (
    <div class="card " style={{ width: "100%", color: "#000" }}>
      <img src={item.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-muted">CAMPANHA</h5>
        <p className="card-text">{item.title}</p>
      </div>
      <div className="card-body">
        <h5 className="card-title text-muted">DESCRIÇÃO</h5>
        <p className="card-text">{item.desc}</p>
      </div>
      <div className="card-body">
        <h5 className="card-title text-muted">VÁLIDADE</h5>
        <p className="card-text">
          {new Date().toLocaleString()} até{" "}
          {new Date(Date.now() + 3600 * 1000 * 24 * 30).toLocaleString()}
        </p>
      </div>
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase">Vacinas</h5>
        <p className="card-text">{127} unidades disponíveis</p>
      </div>
      <div className="card-body">
        <h5 className="card-title text-muted">LOCALIZAÇÃO</h5>
        <p className="card-text">
          Hangar centro de convenções - Av. Dr. Freitas n°3136
        </p>
      </div>
      <div className="card-body">
        <button className="col-12 btn-success btn-lg" onClick={onClose}>
          SELECIONAR CAMPANHA DE VACINAÇÃO
        </button>
      </div>

      <div className="card-body d-flex justify-content-end align-itens-center">
        <button className="col-1 btn-outline-dark btn-lg">Editar</button>
        <button className="col-1 ml-3 btn-primary btn-lg" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Carousel;
