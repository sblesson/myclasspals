import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { Image, List, Button } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <List.Item>
    <List.Content floated='right'>
      {!auth.loading && user === auth.user._id && (
        <Button
          onClick={() => deleteComment(postId, _id)}
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
        <Link to={`/profile/${_id}`}>{name}</Link>
      </List.Header>

      <List.Description>
        {text}
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
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
