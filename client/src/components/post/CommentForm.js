import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ post_id, addComment }) => {
  const [textarea, settextarea] = useState('');

  const onChange = e => {
    settextarea(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    addComment(post_id, { text: textarea });
    settextarea('');
  };

  return (
    <div>
      <div class='bg-primary p'>
        <h3>Leave a Comment....</h3>
      </div>
      <form class='form my-1' onSubmit={e => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={textarea}
          onChange={e => onChange(e)}
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
