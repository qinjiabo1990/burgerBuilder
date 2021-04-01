import React from "react";

import classes from './Footer.module.css';

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
          <div className={classes.right}>
            <span>
              © {new Date().getFullYear()}, Bob's Burger Builder App
            </span>
          </div>
    </footer>
  );
}

export default DemoFooter;