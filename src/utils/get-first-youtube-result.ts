import axios from "axios";

const apiQueryTemplate = (query: string) => {
  const sanitizedQuery = encodeURIComponent(query.replace(/\s/, "+"));
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=1&key=${process.env.YOUTUBE_API_KEY}&q=${sanitizedQuery}`;
}

const watchLinkTemplate = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

export const getFirstYoutubeResult = async (query: string) => {
  const result = await axios.get(apiQueryTemplate(query));
  if (result.status !== 200) {
    throw result.status;
  }

  const items = result.data?.items;
  if (items == null || !Array.isArray(items) || items.length < 1) {
    return undefined;
  }

  const firstItem = items[0];
  if (firstItem == null) {
    return undefined;
  }

  return watchLinkTemplate(firstItem.id.videoId);
};
