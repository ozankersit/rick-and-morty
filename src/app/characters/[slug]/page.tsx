import PaginationButtons from "@/components/pagination-buttons";
import { SERVICE_URL } from "@/constants/service";
import { CharactersResponse } from "@/libs/types";
import Image from "next/image";
import { notFound } from "next/navigation";

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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-8 gap-6">
        {characters.results.map((item) => (
          <div key={item.id} className="flex items-start border border-red-500">
            <Image src={item.image} alt="" width={200} height={200} priority/>
            <div className="flex items-start justify-center flex-col">
              <span>{item.name}</span>
              <span>{item.gender}</span>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
      <PaginationButtons params={+params.slug} pageCount={pageCount} />
    </section>
  );
}
