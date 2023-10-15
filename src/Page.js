import { useLocation } from 'react-router-dom';
import './Page.css';
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';
export default function Page() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get('data');

  return (
    <>
      <header>
        <h2 className="headTitle">
          <span>[분류]</span>
          <span>제목부분~~~~</span>
        </h2>
      </header>
      <section>
        <h2>페이지정보</h2>
        <div className="profile_info">
          <span>이름</span>
          <span>댓글수</span>
          <span>조회수</span>
          <span>시간</span>
        </div>
      </section>
      <section>
        <div className="videoPlayer"></div>
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
        <div>본문부분</div>
        <div>해시태그</div>
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
          <div className="listBtn">목록</div>
          <div className="snsShare">SNS공유</div>
          <div className="">스크랩</div>
        </div>
      </section>
    </>
  );
}
