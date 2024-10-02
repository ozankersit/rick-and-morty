type Character = {
    id: number;
    name: string;
    gender: string;
    species: string;
    image: string;
  };
  
  type Info = {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  
  export type CharactersResponse = {
    results: Character[];
    info: Info;
  };