"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavigateButtons from "./navigate-buttons";

type Props = {
  params: number;
  pageCount: number;
};

export default function PaginationButtons({ params, pageCount }: Props) {
  const pathname = usePathname();

  const createPageLink = (page: number, label: string, isDisabled: boolean) => {
    return isDisabled ? (
      <span className="opacity-55 cursor-pointer">{label}</span>
    ) : (
      <Link href={`/characters/${page}`}>{label}</Link>
    );
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <NavigateButtons
        isDisabled={params === 1}
        content="First Page"
        page={1}
      />

      <div className="flex items-center gap-5">
        {params > 1 ? (
          <Link href={(params - 1).toString()}>{params - 1}</Link>
        ) : null}
        <span
          className={`${
            pathname === `/characters/${params}` ? "border px-3 py-1" : " "
          }`}
        >
          {params}
        </span>
        {params < pageCount ? (
          <Link href={(params + 1).toString()}>{params + 1}</Link>
        ) : null}
      </div>
      <NavigateButtons
        isDisabled={params === pageCount}
        content="Last Page"
        page={pageCount}
      />
    </div>
  );
}
