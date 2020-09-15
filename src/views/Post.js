import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse } from 'react-collapse';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      activeIndex: null
    }
  }

  toggleClass(index, e) {
    this.setState({ activeIndex: this.state.activeIndex === index ? null : index });
  };

  moreLess(index) {
    if (this.state.activeIndex === index) {
      return (
        <span>
          <i className='fas fa-angle-up'></i> Less
        </span>
      );
    } else {
      return (
        <span>
          <i className='fas fa-angle-down'></i> More
        </span>
      );
    }
  }

  render() {
    let content;

    if (this.props.loading) {
      content = 'Loading...';
    } else {
      content = this.props.posts.map((post, key) => {
        return (
          <li key={key}>
            <div>
              <span>{post.id}</span>
              <span>{post.message}</span>
              <button className="btn btn-primary btn-xs" onClick={this.toggleClass.bind(this, key)}>
                {this.moreLess(key)}
              </button>
            </div>
            <Collapse isOpened={true}>
              <div className={'alert alert-info msg ' + (this.state.activeIndex === key ? "show" : "hide")}>
                {post.message}
              </div>
            </Collapse>
          </li>
        )
      });
    }
    return (
      <div>
        <h1>Posts!</h1>
        <div className="row">
          <div className="col-md-6">
            <ul>
              {content}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Post