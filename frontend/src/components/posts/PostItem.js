import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Avatar, Tag, Card, Menu, Dropdown, List, Typography } from 'antd';
import ProgressiveImage from 'react-progressive-graceful-image';

import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import { EllipsisOutlined } from '@ant-design/icons';
import DeletePostModal from './modal/DeletePostModal';
import { MessageOutlined } from '@ant-design/icons';

import './PostItem.scss';

const PostItem = ({
  style,
  post: {
    _id,
    userId,
    subject,
    message,
    userName,
    groupId,
    comments,
    postedDate,
    fileList,
    categoryId,
  },
  showActions,
  showAllComments,
  isSinglePost,
}) => {
  const { Paragraph } = Typography;

  const { Meta } = Card;

  const menu = (
    <Menu>
      <Menu.Item key='deletepost'>
        <DeletePostModal postId={_id} postType='post' />
      </Menu.Item>
    </Menu>
  );
  const allComments = comments !== null && comments && comments.length > 0 && (
    <List
      itemLayout='horizontal'
      dataSource={comments}
      style={{ overflow: 'hidden' }}
      renderItem={(comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={_id}
          groupId={groupId}
          isSinglePost={isSinglePost}
        />
      )}
    />
  );
  const IconText = ({ icon, text }) => (
    <Link to={`/posts/${_id}/${groupId}`}>
      {' '}
      {React.createElement(icon)}{' '}
      <span className='comment-count-text'>
        {comments.length > 1
          ? `${comments.length} comments`
          : `${comments.length} comment`}
      </span>
    </Link>
  );

  const lastThreeComments = comments !== null &&
    comments &&
    comments.length > 0 && (
      <List
        itemLayout='horizontal'
        dataSource={comments.slice(-3)}
        style={{ overflow: 'hidden' }}
        renderItem={(comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={_id}
            groupId={groupId}
            isSinglePost={isSinglePost}
          />
        )}
      />
    );
  const allPostImages = fileList !== null && fileList && fileList.length > 0 && (
    <List
      size='small'
      dataSource={fileList}
      pagination={{
        onChange: (page) => {},
        total: fileList.length,
        pageSize: 2,
        hideOnSinglePage: true,
      }}
      renderItem={(item, index) => (
        <List.Item key={`post-image-${index}`} className='feed-list-item'>
          <ProgressiveImage src={`${item.url}`} placeholder={`${item.url}`}>
            {(src) => <img src={src} alt={item.fileName} />}
          </ProgressiveImage>
        </List.Item>
      )}
    />
  );
  return (
    <div className='feed' style={{ width: '100%' }}>
      <Card
        className={isSinglePost ? 'single-feed-card' : 'feed-card'}
        title={
          <Link to={`/profile/${groupId}/${userId}`}>
            <Meta
              avatar={
                <Avatar className='avatar-icon' size='large'>
                  {userId.charAt(0)}
                </Avatar>
              }
              title={<span className='feed-author-title'>{userId}</span>}
              description={
                <div className='feed-author-time'>
                  <Tag>{categoryId}</Tag>&nbsp;
                  <Moment fromNow ago>
                    {postedDate}
                  </Moment>
                </div>
              }
            />
          </Link>
        }
        extra={
          <Dropdown overlay={menu} placement='bottomCenter'>
            <a
              className='ant-dropdown-link'
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>
        }
      >
        <Link className='feed-title' to={`/posts/${_id}/${groupId}`}>
          <Meta
            title={
              <Ellipsis length={100} tooltip>
                {subject}
              </Ellipsis>
            }
          />
        </Link>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {message}
        </Paragraph>
        {allPostImages}

        {comments && comments.length > 0 && (
          <IconText icon={MessageOutlined} key='list-vertical-message' />
        )}
        {showActions && (
          <div style={{ marginBottom: '2rem' }}>
            {showAllComments ? allComments : lastThreeComments}
            <CommentForm
              postId={_id}
              groupId={groupId}
              userId={userId}
              userName={userName}
              isSinglePost={isSinglePost}
            />{' '}
          </div>
        )}
      </Card>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
  showAllComments: false,
  isSinglePost: false,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  showAllComments: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
