import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

// import SlateEditor from '../components/slate-editor/Editor';
import RichTextEditor from "../components/rich-editor/richtext";
import { toast } from 'react-toastify';

import { getBlogById, updateBlog } from '../actions';

class BlogEditorUpdate extends React.Component {

  static async getInitialProps({query}) {
    const blogId = query.id;
    let blog = {};

    try {
      blog = await getBlogById(blogId);
      return {blog};
    } catch(err) {
      console.error(err);
    }

    return {blog};
  }

  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      isLoaded: false
    }

    this.updateBlog = this.updateBlog.bind(this);
  }

  updateBlog(story, heading) {
    const {blog} = this.props;

    const updatedBlog = {};
    updatedBlog.title = heading.title;
    updatedBlog.subTitle = heading.subtitle;
    updatedBlog.story = story;

    this.setState({isSaving: true});

    updateBlog(updatedBlog, blog._id).then(updatedBlog => {
      toast.success('Blog Saved Succesfuly!');
      this.setState({isSaving: false});
    }).catch(err => {
      this.setState({isSaving: false});
      const message = err.message || 'Server Error!';
      toast.error('Unexpected Error, Copy your progress and refresh browser please.');
      console.error(message);
    })
  }

  componentDidMount() {
    this.setState({isLoaded : true})
  }


  render() {
    const { blog } = this.props;
    const { isSaving,isLoaded } = this.state;

    return isLoaded ? (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          {/*<SlateEditor initialValue={blog.story} isLoading={isSaving} save={this.updateBlog} />*/}
          <RichTextEditor initialValue={blog.story} isLoading={isSaving} save={this.updateBlog} />
          <style jsx>
            {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
          </style>
        </BasePage>
      </BaseLayout>
    ) : (
        <div>
          <h1>Loading.....</h1>
        </div>
    )
  }
}

export default withAuth('siteOwner')(BlogEditorUpdate);
