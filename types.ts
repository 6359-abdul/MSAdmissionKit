
export interface PageInfo {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export enum NavigationDirection {
  PREV = -1,
  NEXT = 1
}
