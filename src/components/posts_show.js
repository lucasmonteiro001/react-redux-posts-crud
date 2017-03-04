/**
 * Created by lucas on 3/4/17.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class PostsShow extends Component {

    // To get access to the push property of React Router
    // Can get information from parent components
    static contextTypes = {
        router: PropTypes.object
    };


    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick = () => {
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // blog post successfully deleted. Navigate to index
                this.context.router.push('/');
            });
    };

    render() {

        const {post} = this.props;

        if(!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Back to list</Link>
                <button
                    onClick={this.onDeleteClick}
                    className="btn btn-danger pull-xs-right">
                    Delete post
                </button>
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

export default connect(mapStateToProps, {deletePost, fetchPost})(PostsShow);
