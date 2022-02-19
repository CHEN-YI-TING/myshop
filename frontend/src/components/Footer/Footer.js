import "./footer.css";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>公司</h4>
            <ul>
              <li>
                <a href="#">關於我們</a>
              </li>
              <li>
                <a href="#">我們的服務</a>
              </li>
              <li>
                <a href="#">隱私政策</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>幫助</h4>
            <ul>
              <li>
                <a href="#">常見問題</a>
              </li>
              <li>
                <a href="#">購物</a>
              </li>
              <li>
                <a href="#">回報問題</a>
              </li>
              <li>
                <a href="#">訂單狀態</a>
              </li>
              <li>
                <a href="#">付費方法</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>線上商店</h4>
            <ul>
              <li>
                <a href="#">筆電</a>
              </li>
              <li>
                <a href="#">手機</a>
              </li>
              <li>
                <a href="#">SSD</a>
              </li>
              <li>
                <a href="#">記憶體</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>追蹤我們</h4>
            <ul>
              <div className="social-links">
                <a href="#">
                  <FacebookIcon />
                </a>
                <a href="#">
                  <TwitterIcon />
                </a>
                <a href="#">
                  <InstagramIcon />
                </a>
                <a href="#">
                  <LinkedInIcon />
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer;
