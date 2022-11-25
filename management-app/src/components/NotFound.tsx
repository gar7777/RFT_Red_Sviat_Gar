import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../features/i18n';
import { useAppSelector } from '../store/hooks';
import errorPageStyle from '../scss/ErrorPage.module.scss';

export function NotFound() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={errorPageStyle.error}>
      <div className={errorPageStyle.error_message}>
        <h1>{i18n[lang].error404}</h1>
        <p>{i18n[lang].noPage}</p>
        <p>
          {i18n[lang].wantToReturn}
          <span>
            <Link to="/boards" className={errorPageStyle.return}>
              {i18n[lang].toHomePage}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
