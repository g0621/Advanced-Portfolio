import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';
// import { Router } from '../routes';
import Router from 'next/router';

// import SlateEditor from '../components/slate-editor/Editor';
import RichTextEditor from "../components/rich-editor/richtext";
import { toast } from 'react-toastify';

import { createBlog } from '../actions';

class BlogEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      lockId: Math.floor(1000 + Math.random() * 9000)
    }

    this.saveBlog = this.saveBlog.bind(this);
  }


  saveBlog(story, heading) {
    const {lockId} = this.state;
    const blog = {};
    blog.title = heading.title;
    blog.subTitle = heading.subtitle;
    blog.story = story;

    this.setState({isSaving: true});

    createBlog(blog, lockId).then(createdBlog => {
      this.setState({isSaving: false});
      toast.success('Blog Saved Successfully!');
      Router.push(`/blogs/${createdBlog._id}/edit`);
    }).catch(err => {
      this.setState({isSaving: false});
      toast.error('Unexpected Error, Copy your progress and refresh browser please.');
      const message = err.message || 'Server Error!';
      console.error(message);
    })
  }


  render() {
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          {/*<SlateEditor isLoading={isSaving} save={this.saveBlog} />*/}
          <RichTextEditor isLoading={isSaving} save={this.saveBlog} />
          <style jsx>
            {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
          </style>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(BlogEditor);
