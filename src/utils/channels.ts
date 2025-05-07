import type { Category, YouTubeChannel } from '../types/channel';

interface TaggedChannel {
  title: string;
  channels: string[];
}

interface ChannelInfo {
  full_name: string;
  link: string;
  title: string;
  description: string;
  avatar_thumbnail: string;
}

interface ChannelsByTag {
  [key: string]: TaggedChannel;
}

interface ChannelsInfo {
  [key: string]: ChannelInfo;
}

import channelsByTagData from '../../channels_by_tag.json';
import channelsInfoData from '../../channelsExtended.json';

const channelsByTag = channelsByTagData as ChannelsByTag;
const channelsInfo = channelsInfoData as ChannelsInfo;

export function loadChannels(): Category[] {
  return Object.entries(channelsByTag).map(([tag, data]) => {
    const taggedData = data as TaggedChannel;
    return {
      name: taggedData.title,
      subcategories: [
        {
          name: 'General',
          channels: taggedData.channels.map((channelId) => {
            const channelInfo = channelsInfo[channelId];

            return {
              name: channelInfo?.full_name,
              url: channelInfo?.link,
              category: taggedData?.title,
              subcategory: 'General',
              title: channelInfo?.title,
              description: channelInfo?.description,
              avatar_thumbnail: channelInfo?.avatar_thumbnail,
            };
          }),
        },
      ],
    };
  });
}
