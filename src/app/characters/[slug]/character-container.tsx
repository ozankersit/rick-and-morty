"use client";
import { Character } from "@/libs/types";
import Image from "next/image";
import { useState } from "react";
import SelectedCharacterContainer from "./selected-character-container";

type Props = {
  characters: Character[];
};

export default function CharacterContainer({ characters }: Props) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  function handleClick(character: Character) {
    setSelectedCharacter(character);
  }

  function closeModal() {
    setSelectedCharacter(null);
  }

  return (
    <>
      {selectedCharacter ? (
        <SelectedCharacterContainer closeModal={closeModal} selectedCharacter={selectedCharacter}/>
      ) : null}

      <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-8 gap-6">
        {characters.map((item) => (
          <div
            key={item.id}
            className="flex items-start border border-red-500"
            onClick={() => handleClick(item)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              priority
            />
            <div className="flex items-start justify-center flex-col">
              <span>{item.name}</span>
              <span>{item.gender}</span>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
