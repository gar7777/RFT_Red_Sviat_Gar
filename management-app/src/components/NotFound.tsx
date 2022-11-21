import React from 'react';
import { Link } from 'react-router-dom';
import errorPageStyle from '../scss/ErrorPage.module.scss';

export function NotFound() {
  return (
    <div className={errorPageStyle.error}>
      <div className={errorPageStyle.error_message}>
        <h1>404 ERROR</h1>
        <p>This page doesn&apos;t exist</p>
        <p>
          Would you like to return to
          <span>
            <Link to="/boards" className={errorPageStyle.return}>
              &nbsp;HOME page?&nbsp;
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
