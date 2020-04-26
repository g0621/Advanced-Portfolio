import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import {Col, Row, Button} from 'reactstrap';
// import PortfolioCard from '../components/portfolios/PortfolioCard';
import ProjectCard from "../components/projects/ProjectCard";
import {dummyProjs} from "../actions/initialValue";

import {getPortfolios, deletePortfolio, getProjects,loadProjects} from "../actions";

import Router from 'next/router';

const AllProjects = (props) => {

    const navigateToEdit = (portfolioId, e) => {
        e.stopPropagation();
        Router.push(`/portfolios/${portfolioId}/edit`)
    }

    const displayDeleteWarning = (portfolioId, e) => {
        e.stopPropagation();
        const isConfirm = confirm('Are you sure you want to delete this portfolio???');

        if (isConfirm) {
            deletePortfolioThis(portfolioId);
        }
    }

    const deletePortfolioThis = (portfolioId) => {
        deletePortfolio(portfolioId)
            .then(() => {
                Router.push('/portfolios');
            })
            .catch(err => console.error(err));
    }

    const renderPortfolios = (portfolios) => {
        const {isAuthenticated, isSiteOwner} = props.auth;

        return portfolios.map((portfolio, index) => {
            return (
                <Col key={index} md="4">
                    <ProjectCard portfolio={portfolio}>
                        {isAuthenticated && isSiteOwner &&
                        <React.Fragment>
                            <Button onClick={(e) => navigateToEdit(portfolio._id, e)}
                                    color="warning">Edit</Button>{' '}
                            <Button onClick={(e) => displayDeleteWarning(portfolio._id, e)}
                                    color="danger">Delete</Button>
                        </React.Fragment>
                        }
                    </ProjectCard>
                </Col>
            )
        })
    }

    const portfolios = dummyProjs;
    const {isAuthenticated, isSiteOwner} = props.auth;

    return (
        <BaseLayout title="Gyan Vardhan | My Projects" {...props.auth}>
            <BasePage className="portfolio-page" title="Projects">
                {isAuthenticated && isSiteOwner &&
                <Button onClick={() => Router.push('/portfolios/new')}
                        color="success"
                        className="create-port-btn">Create Portfolio
                </Button>
                }
                <Button onClick={async () => {
                    console.log(await loadProjects());
                }}
                        color="success"
                        className="create-port-btn">Load Projects
                </Button>
                <Button onClick={async () => {
                    console.log(await getProjects());
                }}
                        color="success"
                        className="create-port-btn">Get Projects
                </Button>
                <Row>
                    {portfolios && renderPortfolios(portfolios)}
                </Row>
            </BasePage>
        </BaseLayout>
    )

}

AllProjects.getInitialProps = async () => {
    let portfolios = [];
    try {
        portfolios = await getPortfolios();
    } catch (err) {
        console.error(err);
    }
    return {portfolios};
}

export default AllProjects;
