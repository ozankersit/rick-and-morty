"use client";
import { Character } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import SelectedCharacterContainer from "./selected-character-container";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StatusRow from "@/components/status-row";

type Props = {
  characters: Character[];
};

export default function CharacterContainer({ characters }: Props) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search_query")?.toLowerCase() || "";

  function handleClick(character: Character) {
    setSelectedCharacter(character);
  }

  function closeModal() {
    setSelectedCharacter(null);
  }

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery) || character.species.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      {selectedCharacter ? (
        <SelectedCharacterContainer
          closeModal={closeModal}
          selectedCharacter={selectedCharacter}
        />
      ) : null}

      <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-y-8 gap-6 py-5 lg:px-0">
        {filteredCharacters.map((item) => (
          <Link href="#selected-character" key={item.id}>
            <div
              className="flex items-start border border-red-500"
              onClick={() => handleClick(item)}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                priority
              />
              <div className="flex items-start justify-center flex-col">
                <span>{item.name}</span>
                <span>{item.gender}</span>
                <StatusRow status={item.status}/>
                <span>{item.species}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
