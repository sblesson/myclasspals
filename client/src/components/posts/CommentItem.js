import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment, deleteSinglePostComment } from '../../actions/post';
import { Image, List, Button } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, message, userName, avatar, user, date },
  auth,
  deleteComment,
  isSinglePost,
  deleteSinglePostComment
}) => (
  <List.Item>
    <List.Content floated='right'>
      {!auth.loading && user === auth.user._id && (
        <Button
          onClick={() => {
            if (isSinglePost) {
              deleteSinglePostComment(postId, _id);
            } else {
              //deleting from dashboard
              deleteComment(postId, _id);
            }
          }}
          type='button'
          content='Delete'
          color='pink'
          size='tiny'
        ></Button>
      )}
    </List.Content>
    <Image avatar src={avatar} />

    <List.Content>
      <List.Header>
        <Link to={`/profile/${_id}`}>{userName}</Link>
      </List.Header>

      <List.Description>
        {message}
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
      </List.Description>
    </List.Content>
  </List.Item>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteSinglePostComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteComment,
  deleteSinglePostComment
})(CommentItem);
