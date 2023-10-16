import axios from "axios";

const apiKey = "AIzaSyBrSPFESYjexkwyDYm99UyIPhBXWtcxK4U";

//댓글 가져오기
const fetchComments = async (videoId, token) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          key: apiKey,
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 2,
          order: "relevance",
          pageToken: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("댓글오류", error);
    return null;
  }
};
//댓글 가져오기
//글자수 제한 함수
function truncateText(text) {
  if (text.length <= 50) {
    return text;
  } else {
    const sliceText = text.slice(0, 50) + "...";
    return sliceText;
  }
}

//비디오 가져오기
async function fetchVideos(token) {}
export { fetchComments, truncateText };