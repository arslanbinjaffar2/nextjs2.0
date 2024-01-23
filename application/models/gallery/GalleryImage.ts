export interface RootObject {
  gallery_images: GalleryImage[];
  filters: any[];
}

export interface GalleryImage {
  id: number;
  image: string;
  info: GalleryImageInfo[];
}

export interface GalleryImageInfo {
  id: number;
  name: string;
  value: string;
  languages_id: number;
}