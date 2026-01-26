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
export type BookDetail = {
  id: number,
  title: string,
  subtitle?: string,
  image?: string,
  identifiers?: {
    open_library_id: string,
    isbn_10: string,
    isbn_13: string
  },
  authors: Author[],
  publish_date?: number,
  number_of_pages?: number,
  description?: string,
  rating: Rating
}

export type SearchBooksResponse = {
  available: number;
  number: number;
  offset: number;
  books: Book[][] | [];
};
