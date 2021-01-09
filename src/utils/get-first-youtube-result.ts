import axios from "axios";

const apiQueryTemplate = (query: string) => {
  const sanitizedQuery = encodeURIComponent(query.replace(/\s/, "+"));
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&&type=video&key=${process.env.YOUTUBE_API_KEY}&q=${sanitizedQuery}`;
}

const watchLinkTemplate = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

export const getFirstYoutubeResult = async (query: string) => {
  const result = await axios.get(apiQueryTemplate(query));
  if (result.status !== 200) {
    return undefined;
  }

  const firstItemId = result.data &&
                    result.data.items &&
                    result.data.items[0] &&
                    result.data.items[0].id &&
                    result.data.items[0].id.videoId;

  if (firstItemId == null) {
    return undefined;
  }

  return watchLinkTemplate(firstItemId);
};
