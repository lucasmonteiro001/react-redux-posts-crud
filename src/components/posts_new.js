/**
 * Created by lucas on 3/2/17.
 */
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';
import _ from 'lodash';

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title for Post'
    },
    categories: {
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: {
        type: 'textarea',
        label: 'Post Contents'
    }
}

class PostsNew extends Component {

    // To get access to the push property of React Router
    // Can get information from parent components
    static contextTypes = {
        router: PropTypes.object
    };

    renderField = (fieldConfig, field) => {

        const fieldHelper = this.props.fields[field];

        return (
            <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
                {fieldHelper.touched && <div className="text-help">{fieldHelper.error}</div>}
            </div>
        )
    }

    onSubmit =(props) => {

        this.props.createPost(props)
            .then(() => {
                // blog post successfully created. Navigate to index
                this.context.router.push('/');
            });
    };

    render() {

        const {handleSubmit, valid} = this.props;

        return (
            // pass an action creator
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <h3>Create a new Post</h3>
                {_.map(FIELDS, this.renderField)}
                <button className="btn btn-primary" disabled={!valid}>Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {

    const errors = {};

    _.each(FIELDS, (type, field) => {
       if(!values[field]) {
           errors[field] = 'Enter a ' + [field];
       }
    });

    return errors;


}

// connect (mapStateToProps, mapDispatchToProps)
// reduxForm (formConfig, mapStateToProps, mapDispatchToProps)
export default reduxForm({
    validate,
    form: 'PostsNewForm',
    fields: _.keys(FIELDS),
}, null, {createPost})(PostsNew);
