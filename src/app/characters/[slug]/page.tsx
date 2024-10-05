import PaginationButtons from "@/components/pagination-buttons";
import { SERVICE_URL } from "@/constants/service";
import { CharactersResponse } from "@/libs/types";
import { notFound } from "next/navigation";
import CharacterContainer from "./character-container";

async function fetchCharacters(slug: string): Promise<CharactersResponse> {
  const res = await fetch(`${SERVICE_URL}/character/?page=${slug}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  return data;
}

export default async function Characters({
  params,
}: {
  params: { slug: string };
}) {
  const characters = await fetchCharacters(params.slug);

  const pageCount = characters.info.pages;

  if (+params.slug > pageCount || +params.slug <= 0) {
    notFound();
  }
  return (
    <section className="container mx-auto">
      <CharacterContainer characters={characters.results}/>
      <PaginationButtons params={+params.slug} pageCount={pageCount} />
    </section>
  );
}
