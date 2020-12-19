import React, { useState } from "react";

import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownButton,
  HelpIcon
} from "./styles.js";
import "./styles.scss";
const ApplyVaccine = () => {
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
              <h6>25 vaccines founded for "asdasd"</h6>
              <div class="item">
                <span>Desktop (1920x1080)</span>
                <span>
                  <HelpIcon />
                </span>
              </div>
              <div class="item">
                <span>Desktop (1366x768)</span>
                <span>1,143,393</span>
              </div>
              <div class="item">
                <span>Desktop (1440x900)</span>
                <span>938,287</span>
              </div>
              <div class="item">
                <span>Desktop (1280x800)</span>
                <span>749,393</span>
              </div>
              <div class="item">
                <span>Tablet (1024x768)</span>
                <span>695,912</span>
              </div>
              <div class="item">
                <span>Tablet (768x1024)</span>
                <span>501,938</span>
              </div>
              <div class="item">
                <span>Phone (320x480)</span>
                <span>392,842</span>
              </div>
              <div class="item">
                <span>Phone (720x450)</span>
                <span>298,183</span>
              </div>
              <div class="item">
                <span>Desktop (2560x1080)</span>
                <span>193,129</span>
              </div>
              <div class="item">
                <span>Desktop (2560x1080)</span>
                <span>193,129</span>
              </div>
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
