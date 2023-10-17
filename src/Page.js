import { useLocation } from "react-router-dom";
import "./Page.css";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { fetchComments } from "./func/GetApi";
export default function Page() {
  const location = useLocation();
  const recData = location.state.data;
  console.log("받은데이터", recData);
  // console.log("태그", recData.snippet.tags);
  const [comment, setComment] = useState([]);
  //원래 시간으로 돌려주는 함수
  function formatPublishedAt(publishedAt) {
    const date = new Date(publishedAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //조회수 변경해주는 방법
  function formatNumber(number) {
    return new Intl.NumberFormat("ko-KR", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  }
  useEffect(() => {
    fetchComments(recData.id)
      .then((res) => {
        const newComments = res.items.map((ment) => {
          return {
            authorName: ment.snippet.topLevelComment.snippet.authorDisplayName,
            text: ment.snippet.topLevelComment.snippet.textOriginal,
            like: ment.snippet.topLevelComment.snippet.likeCount,
            time: formatPublishedAt(
              ment.snippet.topLevelComment.snippet.publishedAt
            ),
            imgUrl: ment.snippet.topLevelComment.snippet.authorProfileImageUrl,
          };
        });
        setComment(newComments);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  }, []);

  return (
    <>
      <header>
        <h3 className="headTitle">
          {/* <span>[{recData.snippet.categoryId}]</span> */}
          <span className="chaennelTitle">
            {recData.snippet.localized.title}
          </span>
        </h3>
      </header>
      <section>
        {/* <h2>{recData.snippet.localized.description}</h2> */}
        <div className="profile_info">
          <span className="channelName">{recData.snippet.channelTitle}</span>
          <span className="channelComments">
            댓글 : {recData.statistics.commentCount}개{" "}
          </span>
          <span className="channelViews">
            조회수 : {formatNumber(recData.statistics.viewCount)}{" "}
          </span>
          <span className="channelUploadDate">
            {formatPublishedAt(recData.snippet.publishedAt)}
          </span>
        </div>
      </section>
      <section className="videoSection">
        <div className="videoPlayer">
          <iframe
            className="goVideo"
            title={`recData.snippet.channelTitle`}
            src={`https://www.youtube.com/embed/${recData.id}`}
          ></iframe>
        </div>
        <div className="moreInfo">
          <span className="btn youtubeBtn">유튜브에서 보기</span>
          <span className="btn youtubeInfo">유튜브 채널 정보</span>
          <span className="btn youtubeClip">영상 스크랩</span>
          <span className="btn youtubeChannelClip">채널 스크랩</span>
        </div>

        <div className="shareIcon">
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/facebook.png"
              alt="Facebook"
              width="40"
              title=""
            />
          </span>
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/twitter.png"
              alt="Twitter"
              width="40"
              title=""
            />
          </span>
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/kakaostory.png"
              alt="KakaoStory"
              width="40"
            />
          </span>
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/naverband.png"
              alt="NaverBand"
              width="40"
            />
          </span>
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/naver.png"
              alt="Naver"
              width="40"
            />
          </span>
          <span>
            <img
              src="https://youtube-rank.com/board/img/sns/tumblr.png"
              alt="Tumblr"
              width="40"
            />
          </span>
        </div>
        <div className="youtubeDescription">{recData.snippet.description}</div>
        <br />
        <div className="hashTags">
          {recData.snippet.tags
            ? recData.snippet.tags.map((res) => (
                <span className="tags btn" id={res}>
                  #{res}
                </span>
              ))
            : null}
        </div>
        <div className="vote">
          <span className="positiveBtn">
            <BsFillHandThumbsUpFill />
            추천
            <strong>0</strong>
          </span>
          <span className="negativeBtn">
            <BsFillHandThumbsDownFill />
            비추천
            <strong>0</strong>
          </span>
        </div>
        <div>
          <div>좋아요 많은 순</div>
          <div className="commentList">
            {comment.map((res) => (
              <div>
                <img src={`${res.imgUrl}`} className="commentImg" />
                <span>이름 : {res.authorName}</span> <br />
                <span>내용 : {res.text}</span>
                <br />
                <span>좋아요 : {res.like}</span>
                <br />
                <span>작성시간 : {res.time}</span>
                <br />
              </div>
            ))}
          </div>
          {/* <div className="listBtn">목록</div>
          <div className="snsShare">SNS공유</div>
          <div className="">스크랩</div> */}
        </div>
      </section>
    </>
  );
}
