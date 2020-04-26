import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap';
import ProjectCarousel from "./ProjectCarousel";

class ProjectCardDetail extends React.Component {


    render() {
        const {isOpen, toggle, portfolio} = this.props;

        return (
            <div>
                <Modal className={'custom-modal'} size={'lg'} isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
                    <ModalBody>
                        {/*<p><b>Description: </b>{portfolio.description}</p>*/}
                        {/*<p><b>Company: </b>{portfolio.company}</p>*/}
                        {/*<p><b>Position: </b>{portfolio.position}</p>*/}
                        {/*<p><b>Location: </b>{portfolio.location}</p>*/}
                        {/*<p><b>Start Date: </b>{moment(portfolio.startDate).format('MMMM YYYY')}</p>*/}
                        {/*<p><b>End Date: </b>{portfolio.endDate ? moment(portfolio.endDate).format('MMMM YYYY') : 'Still Working Here'}</p>*/}
                        <ProjectCarousel items={portfolio.images}/>
                    </ModalBody>
                    <ModalFooter>
                        {portfolio.deployment && <a href={portfolio.deployment} target={"_blank"}><span className={'btn btn-success'}>See deployed</span></a>}
                        <a href={portfolio.link} target={"_blank"}><span className={'btn btn-primary'}>Visit Repo</span></a>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <style jsx>
                    {`
              .custom-modal {
                width : 80%;
                margin : auto 0
              }
              .redir{
                background : #2C3E50;
                border-radius : 100%
              }
          `}
                </style>
            </div>
        );
    }
}

export default ProjectCardDetail;
