/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=182d8171049c402d8418a55cea8a689a&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    console.log(parsedData);
    props.setProgress(100);

  }
  useEffect(() => {
    updateNews();
    document.title = `${props.category} - News Junction`;
  }, [])
  const handlePreviousClick = async () => {
    console.log("previous");
    setPage(page + 1);
    updateNews();
  }
  const handleNextClick = async () => {
    console.log("next");
    setPage(page + 1);
    updateNews();
  }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=182d8171049c402d8418a55cea8a689a&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };


  return (
    <div className='container my-3'>
      <h1 style={{ marginTop: '90px' }}><center>News Junction Top Headlines!!!</center></h1>
      <marquee><h3 className='my-3'> Daily news at your tips!!!! </h3></marquee>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
      </InfiniteScroll>
      <div className="row my-4 ">
        {articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        })}
      </div>
    </div>
  )

}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
