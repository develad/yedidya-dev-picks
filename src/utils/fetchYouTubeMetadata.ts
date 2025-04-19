import type { YouTubeChannel } from "../types/channel";

export async function fetchYouTubeMetadata(
  channel: YouTubeChannel
): Promise<YouTubeChannel> {
  try {
    // Extract channel handle from URL
    // Example: https://www.youtube.com/@Fireship -> @Fireship
    const channelHandle = channel.url.split("/").pop();
    if (!channelHandle) return channel;

    // Construct the channel logo URL
    // This is a common pattern for YouTube channel logos
    const logoUrl = `https://yt3.googleusercontent.com/ytc/${channelHandle}/default.jpg`;

    return {
      ...channel,
      thumbnail: logoUrl,
    };
  } catch (error) {
    console.error(`Error processing channel ${channel.name}:`, error);
    return channel;
  }
}
