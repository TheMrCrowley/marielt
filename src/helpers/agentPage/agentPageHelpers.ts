import { AgentPageStrapiResponse } from '@/src/api/agentPage';
import { AgentPageData } from '@/src/types/CareersTypes';

export const convertToAgentPageData = (data: AgentPageStrapiResponse['data']): AgentPageData => {
  return {
    agentVideo: data.attributes.video_link ? JSON.parse(data.attributes.video_link) : undefined,
    courseVideo: data.attributes.course_link ? JSON.parse(data.attributes.course_link) : undefined,
    courseImage: {
      height: data.attributes.course_media.data.attributes.height,
      placeholder: data.attributes.course_media.data.attributes.placeholder,
      url: data.attributes.course_media.data.attributes.url,
      width: data.attributes.course_media.data.attributes.width,
    },
    media: Array.isArray(data.attributes.carousel.data)
      ? data.attributes.carousel.data.map((item) => ({
          height: item.attributes.height,
          placeholder: item.attributes.placeholder,
          type: item.attributes.provider_metadata.resource_type,
          url: item.attributes.url,
          width: item.attributes.width,
        }))
      : [],
  };
};
