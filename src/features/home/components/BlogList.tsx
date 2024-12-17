"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { FileMinus2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto my-2 max-w-2xl"
        placeholder="Search"
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        value={search}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {!data?.data.length ? (
        <div className="flex h-[30vh] items-center justify-center">
          <FileMinus2 />
          <h1 className="text-center">No Data</h1>
        </div>
      ) : (
        <>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {data.data.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })}
          </div>

          <PaginationSection
            onChangePage={onChangePage}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </>
  );
};

export default BlogList;
