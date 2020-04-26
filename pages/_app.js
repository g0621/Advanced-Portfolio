import React from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';

import auth0 from '../services/auth0';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';
    const auth = { user, isAuthenticated: !!user, isSiteOwner };

    return { pageProps, auth }
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <div>
        <ToastContainer />
        <Component {...pageProps} auth={auth}/>
      </div>
    )
  }
}
