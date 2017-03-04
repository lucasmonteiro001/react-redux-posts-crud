/**
 * Created by lucas on 3/4/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/index';
import {Link} from 'react-router';

class PostsShow extends Component {

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    render() {

        const {post} = this.props;

        if(!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/" className="btn btn-primary">Back</Link>
                <h3>{post.title}</h3>
                <h6>{post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);
