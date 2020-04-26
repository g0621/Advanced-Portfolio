import React, {useState} from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import ProjectCardDetail from './ProjectCardDetail';
import {shortenText} from "../../helpers/utils";
import {toast} from "react-toastify";

const ProjectCard = (props) => {
  const [isOpen,setOpen] = useState(false);

  const checkOrientation = () => {
    if(typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  }

  const handleToggle = () => {
    setOpen(!isOpen);
    if (isOpen === false && checkOrientation()) toast.error('Better Viewed in landscape');
  }

    const { portfolio, children } = props;
    return (
      <span onClick={handleToggle}>
        <ProjectCardDetail toggle={handleToggle} portfolio={portfolio} isOpen={isOpen}/>
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">{portfolio.tech}</CardHeader>
          <CardBody>
            <h4 className="portfolio-card-city">{portfolio.language}</h4>
            <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
            <CardText className="portfolio-card-text">{shortenText(portfolio.description)}</CardText>
            <div className="readMore">
              {children}
            </div>
          </CardBody>
        </Card>
      </span>
    )
}
export default ProjectCard;
