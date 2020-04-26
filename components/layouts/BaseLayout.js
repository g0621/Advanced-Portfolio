import React from 'react';
import Header from '../shared/header';
import Head from 'next/head';

const BaseLayout = (props) => {
  const { className, children, isAuthenticated, user, isSiteOwner, cannonical } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'Gyan Vardhan | Portfolio';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="My name is Gyan Vardhan and I am an experienced software engineer and freelance developer." />
        <meta name="keywords" content="Gyan Vardhan makaut wbut, Gyan Vardhan github developer, Gyan Vardhan interviewbit internshala, Gyan Vardhan programming"/>
        <meta property="og:title" content="Gyan Vardhan - programmer, developer, tech enthusiast" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="My name is Gyan Vardhan and I am an experienced software engineer, Tech enthusiast and open source developer."/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>
        {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}
        <link rel="icon" type="image/ico" href="/images/favicon.ico"/>
      </Head>
      <div className="layout-container" >
        <Header className={`port-nav-${headerType}`}
                isAuthenticated={isAuthenticated}
                user={user}
                isSiteOwner={isSiteOwner}/>
        <main  className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;

