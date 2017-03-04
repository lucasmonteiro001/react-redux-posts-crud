/**
 * Created by lucas on 3/2/17.
 */
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

class PostsNew extends Component {

    // To get access to the push property of React Router
    // Can get information from parent components
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit =(props) => {

        this.props.createPost(props)
            .then(() => {
                // blog post successfully created. Navigate to index
                this.context.router.push('/');
            });
    };

    render() {

        const {fields: {title, categories, content}, handleSubmit, valid} = this.props;

        return (
            // pass an action creator
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <h3>Create a new Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    {title.touched && <div className="text-help">{title.error}</div>}
                </div>
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    {categories.touched && <div className="text-help">{categories.error}</div>}
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                    {content.touched && <div className="text-help">{content.error}</div>}
                </div>
                <button className="btn btn-primary" disabled={!valid}>Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {

    const errors = {};

    if(!values.title) {
        errors.title = 'Enter a username'
    }

    if(!values.categories) {
        errors.categories= 'Enter a category'
    }

    if(!values.content) {
        errors.content = 'Enter some content'
    }
    return errors;


}

// connect (mapStateToProps, mapDispatchToProps)
// reduxForm (formConfig, mapStateToProps, mapDispatchToProps)
export default reduxForm({
    validate,
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
}, null, {createPost})(PostsNew);
