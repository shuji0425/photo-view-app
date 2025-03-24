import { Photo } from "@/types/photo";

export const mockPhotos: Photo[] = [
  {
    id: 1,
    url: "https://fakeimg.pl/600x900?text=Portrait+1",
    tags: ["Portrait"],
    title: "Portrait One",
    width: 600,
    height: 900,
  },
  {
    id: 2,
    url: "https://fakeimg.pl/600x900?text=Street+1",
    tags: ["Street", "Portrait"],
    title: "Street Portrait",
    width: 600,
    height: 900,
  },
  {
    id: 3,
    url: "https://fakeimg.pl/1000x1000?text=Nature+1",
    tags: ["Nature"],
    title: "Forest Path",
    width: 1000,
    height: 1000,
  },
  {
    id: 4,
    url: "https://fakeimg.pl/900x600?text=Nature+2",
    tags: ["Nature", "Portrait"],
    title: "Green Mood",
    width: 900,
    height: 600,
  },
];
