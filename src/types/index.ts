export type NavItem = { name: string; path: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> };

export type Author = {
  id: number;
  name: string;
};

export type Rating = {
  average: number;
};

export type Book = {
  id: number;
  title: string;
  image: string;
  authors: Author[];
  rating: Rating;
};

export type SearchBooksResponse = {
  available: number;
  number: number;
  offset: number;
  books: Book[][] | [];
};
