import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsYoutube, BsFillPinFill } from 'react-icons/bs';
//API키
export default function Main() {
  const apiKey = 'AIzaSyBrSPFESYjexkwyDYm99UyIPhBXWtcxK4U';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState('');
  const [commentData, setCommentData] = useState({});
  const [comments, setComments] = useState([]);
  const [nextCommentPageToken, setNextCommentPageToken] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [categoryNumber, setCategoryNumber] = useState('');
  const newCategory = useSelector((state) => state.category.category);

  const fetchVideos = async (token) => {
    setLoading(true);
    try {
      setVideos([]);

      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            key: apiKey,
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 2,
            videoCategoryId: newCategory,
            regionCode: 'KR',
            pageToken: token,
          },
        },
      );
      console.log(res);
      //댓글 불러오기
      const newVideos = res.data.items;
      if (categoryNumber === '' || categoryNumber !== newCategory) {
        setCategoryNumber(newCategory);
        setVideos([...newVideos]);
      } else {
        setVideos([...videos, ...newVideos]);
      }
      setPageToken(res.data.nextPageToken);
    } catch (error) {
      if (error.response) {
        console.error('에러입니다.', error);
      }
    }
    setLoading(false);
  };
  //글자수 제한 함수
  function truncateText(text) {
    if (text.length <= 50) {
      return text;
    } else {
      const sliceText = text.slice(0, 50) + '...';
      return sliceText;
    }
  }

  // const myNewCategory = async (token) => {
  //   try {
  //     const res = await axios.get(
  //       "https://www.googleapis.com/youtube/v3/videos",
  //       {
  //         params: {
  //           key: apiKey,
  //           part: "snippet",
  //           chart: "mostPopular",
  //           maxResults: 2,
  //           videoCategoryId: newCategory,
  //           regionCode: "KR",
  //           pageToken: token,
  //         },
  //       }
  //     );
  //     console.log("videos", videos);
  //     const newVideos = res.data.items;
  //     setVideos([...newVideos]);
  //     setPageToken(res.data.nextPageToken);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("에러입니다.", error);
  //     }
  //   }
  // };
  const fetchComments = async (videoId, token) => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/commentThreads',
        {
          params: {
            key: apiKey,
            part: 'snippet,replies',
            videoId: videoId,
            maxResults: 2,
            order: 'relevance',
            pageToken: token,
          },
        },
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log('댓글오류', error);
      return null;
    }
  };

  const loadMoreComments = async (videoId) => {
    if (nextCommentPageToken) {
      const newComments = await fetchComments(videoId, nextCommentPageToken);
      if (newComments && newComments.items) {
        const updateComments = [...comments, ...newComments.items];
        setComments(updateComments);
        setNextCommentPageToken(newComments.nextPageToken);
      }
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [newCategory]);

  useEffect(() => {
    async function fetchCommentsForVideos() {
      const comments = {};
      for (const video of videos) {
        const videoId = video.id;
        const commentInfo = await fetchComments(videoId);
        comments[videoId] = commentInfo;
      }
      setCommentData(comments);
    }
    if (videos != []) {
      fetchCommentsForVideos();
    }
  }, [videos]);

  // 스크롤 이벤트
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      if (!loading && pageToken) {
        fetchVideos(pageToken);
      }
    }
  };
  return (
    <div className="text-center">
      <h1>인기동영상</h1>
      <Row className="justify-content-center">
        {videos.map((video) => (
          <Col xs={5} sm={5} md={5} lg={5} key={video.id}>
            <Card style={{ width: '100%' }}>
              {selectedVideo === video.id ? (
                <iframe
                  width="100%"
                  height="250px"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  frameBorder="0"
                  allowFullScreen
                  title="YouTube Video"
                />
              ) : (
                <>
                  <Card.Img
                    variant="top"
                    src={video.snippet.thumbnails.standard.url}
                    onClick={() => setSelectedVideo(video.id)}
                  />
                </>
              )}
              <Card.Body>
                <Card.Title>{video.snippet.channelTitle}</Card.Title>
                <Card.Text className="cardText">
                  {video.snippet.title}
                </Card.Text>
                <div style={{ color: 'gray' }}>
                  {truncateText(video.snippet.description)}
                </div>

                {commentData[video.id] && (
                  <div>
                    <div>
                      {commentData[video.id].items.map((comment) => (
                        <div key={comment.id}>
                          <div>
                            👍{' '}
                            {comment.snippet.topLevelComment.snippet.likeCount}{' '}
                            {
                              comment.snippet.topLevelComment.snippet
                                .textOriginal
                            }
                          </div>
                        </div>
                      ))}

                      <button className="btn moreBtn">
                        <BsYoutube className="btnIcon" />
                        더보기
                      </button>
                      <button className="btn clipBtn">
                        <BsFillPinFill className="btnIcon" />
                        스크랩
                      </button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to={`/page?data=ididid`}>페이지 이동</Link>
      {loading && <Spinner animation="border" />}
    </div>
  );
}
