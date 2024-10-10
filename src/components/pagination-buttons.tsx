"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const pageLinkClass = (page: number) =>
    pathname === `/characters/${page}` ? "border px-3 py-1" : " ";

  return (
    <div className="flex items-center justify-center gap-5">
      {createPageLink(1, "First Page", params === 1)}

      <div className="flex items-center gap-5">
        {params > 1 ? (
          <Link href={(params - 1).toString()}>{params - 1}</Link>
        ) : null}
        <span className={pageLinkClass(params)}>{params}</span>
        {params < pageCount ? (
          <Link href={(params + 1).toString()}>{params + 1}</Link>
        ) : null}
      </div>

      {createPageLink(pageCount, "Last Page", params === pageCount)}
    </div>
  );
}
