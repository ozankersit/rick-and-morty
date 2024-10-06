"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams(); // /characters/1?q=123 (q=123)
  const pathname = usePathname(); // /characters/1 (page/slug)
  const { replace } = useRouter();
  const timeoutRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("searchParams", searchParams);
  console.log("pathname", pathname);

  const handleChange = (term: string) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search_query", term);
      } else {
        params.delete("search_query");
      }
      replace(`${pathname}?${params.toString()}`);
      setIsLoading(false);
      timeoutRef.current = null;
    }, 750);
  };
  return (
    <div className="flex items-center relative">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search a character"
        defaultValue={searchParams.get("search_query")?.toString()}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      {isLoading ? (
        <span>Searching...</span>
      ) : null}
    </div>
  );
}
