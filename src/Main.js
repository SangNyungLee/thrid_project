import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";
//API키
export default function Main() {
  const apiKey = "AIzaSyCk1xK2C0GBw_s_z-0mpPbL72_zGw7XuVY";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState(false);
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            key: apiKey,
            part: "snippet",
            chart: "mostPopular",
            maxResults: 10,
            pageToken, // 페이지 토큰 추가
          },
        }
      );
      const newVideos = res.data.items;
      setVideos([...videos, ...newVideos]);
      setPageToken(res.data.nextPageToken);
    } catch (error) {
      console.error("에러입니다.", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    //API 요청 URL
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&chart=mostPopular&maxResults=20&videoCategoryId=24&regionCode=KR`;
    //카테고리 아이디

    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data.items);
        setVideos(res.data.items);
      })
      .catch((err) => {
        console.log("에러입니다.", err);
      });
    fetchVideos();
  }, []);
  // 스크롤 이벤트
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading && pageToken) {
        fetchVideos();
      }
    }
  };
  return (
    <>
      <h1>인기동영상</h1>
      <Row>
        {videos.map((video) => (
          <Col xs={4} sm={4} md={4} lg={4} key={video.id}>
            <Card style={{ width: "100%" }}>
              <Card.Img
                variant="top"
                src={video.snippet.thumbnails.standard.url}
              />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>{video.snippet.title}</Card.Text>
                <Button variant="primary">들어가기?</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && <p>로딩중...</p>}
    </>
  );
}
