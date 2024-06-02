import React, { useEffect, useState } from "react";
import { GetNewsByPageService } from "../../services/news/news";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";

function NewsList() {
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState({
    delay: "",
    actual: "",
  });
  const news = useQuery({
    queryKey: ["news", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetNewsByPageService({
        page: page,
        limit: 5,
        searchField: searchField.actual,
        type: "news",
      }),
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setSearchField((prev) => {
        return {
          ...prev,
          actual: prev.delay,
        };
      });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchField]);
  return (
    <div>
      <div className="mt-12 flex w-full flex-col items-center gap-8">
        <div className="flex w-10/12 items-center justify-center gap-2 md:w-96 md:gap-5">
          <div className=" text-base md:text-xl">
            <LuSearch />
          </div>

          <input
            type="text"
            onChange={(e) => {
              setSearchField((prev) => {
                return {
                  ...prev,
                  delay: e.target.value,
                };
              });
              setPage(() => 1);
            }}
            value={searchField.delay}
            placeholder="ค้นหาข่าวสาร"
            className="w-full rounded-md border-[1.5px] border-solid border-[#BED6FF] p-3 pl-2 placeholder:font-medium placeholder:text-[#2166DD] 
             md:p-2 md:pl-10"
          />
        </div>
        <div className="relative max-h-96 w-11/12 overflow-auto md:w-10/12">
          <table
            className="w-max min-w-full border-separate border-spacing-1 rounded-md bg-white
           p-1 text-center text-[0.7rem]  md:border-spacing-2 md:p-4 md:text-base"
          >
            <thead>
              <tr className="sticky top-2 z-10">
                <th className=" rounded-md bg-[#BED6FF] p-2 ">วันที่เผยแพร่</th>
                <th className=" rounded-md bg-[#BED6FF] p-2 ">หัวข้อข่าว</th>
                <th className=" rounded-md bg-[#BED6FF] p-2 ">ตัวเลือก</th>
              </tr>
            </thead>

            <tbody className="relative">
              {news.isLoading
                ? [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-200 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-50 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-500 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-slate-300 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-100 p-2"></td>
                    </tr>
                  ))
                : news.data?.data.map((item) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {moment(item.releaseAt).format("DD/MM/YYYY HH:mm")}
                        </td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.title}
                        </td>
                        <td>
                          <Link
                            className="h-10 w-40 rounded-md border-[1px] border-solid border-[#BED6FF] p-2 hover:bg-main-color hover:text-white"
                            href={`/news/${item.id}`}
                          >
                            ดูข้อมูล
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          onChange={(e, page) => setPage(page)}
          count={news.data?.meta.total ?? 1}
          color="primary"
        />
      </div>
    </div>
  );
}

export default NewsList;
