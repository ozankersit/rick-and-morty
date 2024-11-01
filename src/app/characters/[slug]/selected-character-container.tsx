import StatusRow from "@/components/status-row";
import { Character } from "@/lib/types";
import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
    selectedCharacter: Character
    closeModal: MouseEventHandler<HTMLDivElement>;
}

export default function SelectedCharacterContainer({selectedCharacter, closeModal}:Props) {
  return (
    <>
          <div id="selected-character" className="bg-white z-[999999999] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-tr-lg rounded-br-lg">
            <div className="flex items-center md:flex-row flex-col">
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                width={300}
                height={300}
                priority
              />
              <div className="flex item-start justify-center flex-col">
                <span>{selectedCharacter.name}</span>
                <span>{selectedCharacter.gender}</span>
                <StatusRow status={selectedCharacter.status}/>
              </div>
            </div>
          </div>
          <div
            className="block opacity-80 !fixed bg-green-600 left-0 top-0 z-[99999999] w-full h-full"
            onClick={closeModal}
          ></div>
        </>
  )
}
