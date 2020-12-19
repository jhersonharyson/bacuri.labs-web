import React, { useState } from "react";

import { Container, Dropdown, DropdownMenu, DropdownButton } from "./styles.js";
import "./styles.scss";
const ApplyVaccine = () => {
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
            <li className="nav-text">Dashboards</li>
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
            <span>Dashboards</span>
            <h2>Overview</h2>
          </div>
        </div>
        <div className="divider" />

        <div className="row sparklines">
          <div className="col sparkline">
            <div className="chart">
              <div className="label">
                <span>Page Views</span>
                <h2>1,293</h2>
              </div>
              <div className="chart-container">
                <canvas id="test4" />
              </div>
            </div>
          </div>
          <div className="col sparkline">
            <div className="chart">
              <div className="label">
                <span>Downloads</span>
                <h2>758</h2>
              </div>
              <div className="chart-container">
                <canvas id="test5" />
              </div>
            </div>
          </div>
          <div className="col sparkline">
            <div className="chart">
              <div className="label">
                <span>Sign-ups</span>
                <h2>1,293</h2>
              </div>
              <div className="chart-container">
                <canvas id="test6" />
              </div>
            </div>
          </div>
          <div className="col sparkline">
            <div className="chart">
              <div className="label">
                <span>Downloads</span>
                <h2>758</h2>
              </div>
              <div className="chart-container">
                <canvas id="test7" />
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="row top">
          <div className="col">
            <div className="list">
              <h6>Countries</h6>
              <div class="item">
                <span className="progress" style={{ width: "62.4%" }} />
                <span>United States</span>
                <span>62.4%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "15.0%" }} />
                <span>India</span>
                <span>15.0%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "5.0%" }} />
                <span>United Kingdom</span>
                <span>5.0%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "5.0%" }} />
                <span>Canada</span>
                <span>5.0%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "4.5%" }} />
                <span>Russia</span>
                <span>4.5%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "2.3%" }} />
                <span>Mexico</span>
                <span>2.3%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "1.7%" }} />
                <span>Spain</span>
                <span>1.7%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "1.5%" }} />
                <span>France</span>
                <span>1.5%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "1.4%" }} />
                <span>South Africa</span>
                <span>1.4%</span>
              </div>
              <div class="item">
                <span className="progress" style={{ width: "1.2%" }} />
                <span>Japan</span>
                <span>1.2%</span>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-block mb-5">
              <button className="btn primary btn-sm">All countries</button>
            </div>
          </div>
          <div className="col flex-start">
            <div className="list">
              <h6>Most visited pages</h6>
              <div class="item">
                <span>/ (Logged out)</span>
                <span>3,929,481</span>
              </div>
              <div class="item">
                <span>/ (Logged in)</span>
                <span>1,143,393</span>
              </div>
              <div class="item">
                <span>/tour</span>
                <span>938,287</span>
              </div>
              <div class="item">
                <span>/features/something</span>
                <span>749,393</span>
              </div>
              <div class="item">
                <span>/features/another-thing</span>
                <span>695,912</span>
              </div>
              <div class="item">
                <span>/users/username</span>
                <span>501,938</span>
              </div>
              <div class="item">
                <span>/page-title</span>
                <span>392,842</span>
              </div>
              <div class="item">
                <span>/some/page-slug</span>
                <span>298,183</span>
              </div>
              <div class="item">
                <span>/another/directory/and/page-title</span>
                <span>193,129</span>
              </div>
              <div class="item">
                <span>/one-more/page/directory/file-name</span>
                <span>93,382</span>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-block mb-5">
              <button className="btn primary btn-sm" href="#">
                View all pages
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col list-container">
            <div className="list">
              <h6>Devices and resolutions</h6>
              <div class="item">
                <span>Desktop (1920x1080)</span>
                <span>3,929,481</span>
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
              <button className="btn primary btn-sm">View all devices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyVaccine;
