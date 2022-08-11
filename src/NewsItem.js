
import React, { Component } from 'react'
import { Button } from '@cred/neopop-web/lib/components';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-dark" >
            {source}
          </span>
        </div>
        <img src={!imageUrl ? "black.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"><a href={newsUrl} target="_blank">{title}</a></h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted"> by {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
          </small></p>
          <a href={newsUrl} target="_blank"><Button
              colorMode="light"
              kind="elevated"
              size="big">
                <h5>Read More</h5>
              </Button>
              </a></div>
      </div>
    </div>
  )
}
export default NewsItem
