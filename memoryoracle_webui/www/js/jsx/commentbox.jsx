"use strict";
define([
      'react',
      'jquery',
], 
(React, $) => {
   this.initialize = () => {
      var renderData = {
         comments: [
            {key: 0, author: "Daniel Noland", text: "I am the best!"},
            {key: 1, author: "Shawn Noland", text: "I am really confused!"}
         ]
      };
      var CommentList = React.createClass({
         render: function() {
            var commentNodes = this.props.comments.map((comment) => {
               return (
                  <Comment author={comment.author} key={comment.key}>
                     {comment.text}
                  </Comment>
               );
            });
            return (
               <div className="commentList">
                  {commentNodes}
               </div>
            );
         }
      });
      var CommentBox = React.createClass({
         loadCommentsFromServer: function() {
            $.ajax({
               url: this.props.url,
               dataType: 'json',
               cache: false,
               success: function(data) {
                  this.setState({data: data});
               }.bind(this),
               error: function(xhr, status, err) {
                  console.error(this.props.url, status, err.toString());
               }.bind(this)
            });
         },
         getInitialState: function() {
            return {data: {comments: []}}
         },
         componentDidMount: function() {
            this.loadCommentsFromServer();
            setInterval(
               this.loadCommentsFromServer,
               this.props.pollInterval
            );
         },
         handleCommentSubmit: function(comment) {
            var comments = this.state.data.comments;
            comments = comments.concat([comment]);
            this.setState({data: {comments: comments}});
            // $.ajax({
            //    url: this.props.url,
            //    dataType: 'json',
            //    type: 'POST',
            //    data: comment,
            //    success: function(data) {
            //       this.setState({data: data});
            //    }.bind(this),
            //    error: function(xhr, status, err) {
            //       console.error(this.props.url, status, err.toString());
            //    }.bind(this)
            // });
         },
         render: function() {
            return (
               <div className="commentBox">
                  <CommentList comments={this.state.data.comments} />
                  <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
               </div>
            );
         }
      });
      var Comment = React.createClass({
         render: function() {
            return (
               <div className="comment">
                  <h3>{this.props.author}</h3>
                  <div>{this.props.children}</div>
               </div>
            );
         }
      });
      var CommentForm = React.createClass({
         handleSubmit: function(e) {
            e.preventDefault();
            var author = React.findDOMNode(this.refs.author).value.trim();
            var text = React.findDOMNode(this.refs.text).value.trim();
            if (!text || !author) {
               return;
            }
            this.props.onCommentSubmit({key: 42, author: author, text: text});
            React.findDOMNode(this.refs.author).value = '';
            React.findDOMNode(this.refs.text).value = '';
            return;
         },
         render: function() {
            return (
               <form className="commentForm" onSubmit={this.handleSubmit}>
                  <input type="text" placeholder="Your name" ref="author" />
                  <input type="text" placeholder="Your thoughts..." ref="text" />
                  <input type="submit" value="Post" />
               </form>
            );
         }
      });
      React.render(
         <CommentBox url="/json/comments.json" pollInterval={2000} />,
         document.getElementById("content")
      );
   }
   return this;
}
);
