import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import {Row, Col} from 'reactstrap';

import {getBlogBySlug} from '../actions';
import {Text} from "slate";
import escapeHtml from "escape-html";


class BlogDetail extends React.Component {

    static async getInitialProps({query}) {
        let blog = {};
        const slug = query.slug;

        try {
            blog = await getBlogBySlug(slug);
        } catch (err) {
            console.error(err);
        }

        return {blog};
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.setState({isLoaded: true})
    }


    processNode = (node, text) => {
        if (node.bold) text = `<b>${text}</b>`;
        if (node.italic) text = `<i>${text}</i>`;
        if (node.code) text = `<code>${text}</code>`;
        if (node.underline) text = `<u>${text}</u>`;
        return text;
    }

    serialize = node => {
        if (Text.isText(node)) {
            const text = escapeHtml(node.text);
            return this.processNode(node, text);
        }
        const children = node.children.map(n => this.serialize(n)).join('')

        switch (node.type) {
            case 'block-quote':
                return `<blockquote><p>${children}</p></blockquote>`
            case 'paragraph':
                return `<p>${children}</p>`
            case 'link':
                return `<a href="${escapeHtml(node.url)}">${children}</a>`
            case 'bulleted-list':
                return `<ul>${children}</ul>`
            case 'heading-one':
                return `<h1>${children}</h1>`
            case 'heading-two':
                return `<h2>${children}</h2>`
            case 'list-item':
                return `<li>${children}</li>`
            case 'numbered-list':
                return `<ol>${children}</ol>`
            default:
                return children
        }
    }

    getHtml() {
        const storyObj = {
            children: this.props.blog.story
        }
        return this.serialize(storyObj);
    }


    render() {
        const {isLoaded} = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="blog-detail-page">
                    <Row>
                        <Col md={{size: 8, offset: 2}}>{
                            isLoaded && this.props.blog ?
                                <div dangerouslySetInnerHTML={{__html: this.getHtml()}}/>
                                :
                                <div>
                                    <h1>Loading.....</h1>
                                </div>
                        }
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default BlogDetail;
