import Link from "next/link";

type Props = {
  isDisabled: boolean;
  content: string;
  page: number;
};

export default function NavigateButtons({ isDisabled, content, page }: Props) {
  return (
    <>
      {isDisabled ? (
        <span className="opacity-55 cursor-pointer">{content}</span>
      ) : (
        <Link href={`/characters/${page}`}>{content}</Link>
      )}
    </>
  );
}
