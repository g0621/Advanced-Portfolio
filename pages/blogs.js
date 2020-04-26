import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Container, Row, Col } from 'reactstrap';
// import { Link } from '../routes';

import Link from "next/link";
import { getBlogs } from '../actions';
import { shortenText } from '../helpers/utils';

import moment from 'moment';


class Blogs extends React.Component {

  static async getInitialProps({req}) {
    let blogs = [];

    try {
      blogs = await getBlogs(req);
    } catch(err) {
      console.error(err);
    }

    return {blogs};
  }

  renderBlogs = (blogs) => (
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">
              {blog.title}
            </h2>
            <h3 className="post-subtitle">
              {shortenText(blog.subTitle)}
            </h3>
          </a>
        </Link>
        <p className="post-meta">Posted by
          <a href="#"> {blog.author} </a>
          {moment(parseInt(blog.createdAt, 10)).format('LL')}</p>
      </div>
      )
    )
  )

  render() {
    const {blogs} = this.props;

    return (
      <BaseLayout {...this.props.auth}
                  headerType={'landing'}
                  className="blog-listing-page"
                  title="Gyan Vardhan - Newest Blogs to Read">
        <div className="masthead" style={{"backgroundImage": "url('/images/home-bg.jpg')"}}>
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {
                this.renderBlogs(blogs)
              }
              <div className="clearfix">
                <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
              </div>
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a target="_blank" href="https://www.facebook.com/gyan199">
                        <img className={'social-ico'} src={'/images/facebook.svg'}/>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href="https://github.com/g0621/">
                        <img className={'social-ico'} src={'/images/github.svg'}/>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">Copyright &copy; Gyan Vardhan 2020</p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
        <style jsx>
          {`
            .social-ico{
              width : 30px;
              height : 30px;
            }
          `}
        </style>
      </BaseLayout>
    )
  }
}

export default Blogs;

