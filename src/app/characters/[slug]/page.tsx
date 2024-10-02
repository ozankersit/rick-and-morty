import { SERVICE_URL } from "@/constants/service";
import { CharactersResponse } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function fetchCharacters(slug: string): Promise<CharactersResponse> {
  const res = await fetch(`${SERVICE_URL}/character/?page=${slug}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  console.log(data);
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
    <div>
      {characters.results.map((item) => (
        <div key={item.id}>
        <Image src={item.image} alt="" width={200} height={200}/>
        <div>{item.name}</div>
        </div>
      ))}
      {+params.slug !== 1 ? (
        <Link href={(+params.slug - 1).toString()}>Previous</Link>
      ) : (
        <span className="opacity-5">Previous</span>
      )}
      {+params.slug !== pageCount ? (
        <Link href={(+params.slug + 1).toString()}>Next</Link>
      ) : (
        <span className="opacity-5">Next</span>
      )}
    </div>
  );
}
