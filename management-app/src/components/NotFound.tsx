import React from 'react';
import { Link } from 'react-router-dom';
import { l18n } from '../features/l18n';
import { useAppSelector } from '../store/hooks';
import errorPageStyle from '../scss/ErrorPage.module.scss';

export function NotFound() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={errorPageStyle.error}>
      <div className={errorPageStyle.error_message}>
        <h1>{l18n[lang].error404}</h1>
        <p>{l18n[lang].noPage}</p>
        <p>
          {l18n[lang].wantToReturn}
          <span>
            <Link to="/boards" className={errorPageStyle.return}>
              {l18n[lang].toHomePage}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
