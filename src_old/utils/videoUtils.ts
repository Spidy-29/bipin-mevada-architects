export interface VideoItem {
  path: string;
  title?: string;
  description?: string;
}

export const getVideos = (): VideoItem[] => {
  return [
    {
      path: "/videos/1.mp4",
      title: "",
      description: ""
    },
    {
      path: "/videos/2.mp4",
      title: "",
      description: ""
    },
    {
      path: "/videos/3.mp4",
      title: "",
      description: ""
    },
    {
      path: "/videos/4.mp4",
      title: "",
      description: ""
    },
  ];
};
