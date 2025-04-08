export type PublicPhoto = {
  id: number;
  url: string;
  aspectRatio: number;
  title?: string | null;
  description?: string | null;
  takenAt?: string | null;
  sortOrder: number;
};
