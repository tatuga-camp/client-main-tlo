import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Form } from "react-aria-components";
import { GetUserByPageService } from "../../services/user";
import { Pagination } from "@mui/material";
import { LuSearch } from "react-icons/lu";

type MigrantFormProps = {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  handleMigrationForm: ({
    userId,
    email,
    formId,
  }: {
    userId: string;
    email: string;
    formId: string;
  }) => Promise<void>;
  formId: string;
};
function MigrantForm({
  setTrigger,
  handleMigrationForm,
  formId,
}: MigrantFormProps) {
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState({
    value: "",
    delay: "",
  });
  const users = useQuery({
    queryKey: ["users", { searchField: searchField.value }],
    queryFn: () =>
      GetUserByPageService({
        page: 1,
        limit: 10,
        searchField: searchField.value,
      }),
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setSearchField((prev) => {
        return {
          ...prev,
          value: prev.delay,
        };
      });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchField.delay]);
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 m-auto flex h-screen w-screen items-center justify-center font-Anuphan">
      <Form className="h-max w-10/12 rounded-md bg-slate-50 p-4 ring-1 ring-main-color">
        <h2 className="text-center text-2xl font-bold text-main-color">
          ย้ายสิทธิ
        </h2>
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
            placeholder="ค้นหาด้วยชื่อ หรือ อีเมลล์"
            className="w-full rounded-md border-[1.5px] border-solid border-[#BED6FF] p-3 pl-2 placeholder:font-medium placeholder:text-[#2166DD] 
             md:p-2 md:pl-10"
          />
        </div>
        <div className="relative max-h-96 w-full overflow-auto ">
          <table
            className="w-max min-w-full border-separate border-spacing-1 rounded-md bg-white
           p-1 text-center text-[0.7rem]  md:border-spacing-2 md:p-4 md:text-base"
          >
            <thead>
              <tr className="sticky top-2 z-10">
                <th className=" rounded-md bg-[#BED6FF] p-2 ">อีเมลล์</th>
                <th className=" rounded-md bg-[#BED6FF] p-2 ">รายชื่อ</th>
                <th className=" rounded-md bg-[#BED6FF] p-2 ">สถานะ</th>
                <th className=" rounded-md bg-[#BED6FF] p-2 ">เลือก</th>
              </tr>
            </thead>

            <tbody className="relative">
              {users.isLoading
                ? [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-200 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-50 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-500 p-2"></td>
                      <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-slate-300 p-2"></td>
                    </tr>
                  ))
                : users.data?.data.map((item) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.email}
                        </td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.title} {item.firstName} {item.lastName}
                        </td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.type === "INTERNAL"
                            ? "บุคลลกรมหาลัย"
                            : "บุคลลกรภายนอก"}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleMigrationForm({
                                userId: item.id,
                                email: item.email,
                                formId: formId,
                              })
                            }
                            type="button"
                            className="rounded-md bg-main-color px-3 py-2 text-white
           transition duration-100 hover:drop-shadow-md active:scale-105"
                          >
                            ย้ายสิทธิ
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-center">
          <Pagination
            page={page}
            onChange={(e, page) => setPage(page)}
            count={users.data?.meta.total ?? 1}
            color="primary"
          />
        </div>
      </Form>
      <footer
        onClick={() => setTrigger(false)}
        className="fixed bottom-0 left-0 right-0 top-0  -z-10 m-auto
       h-screen w-screen bg-white/40 backdrop-blur-md"
      ></footer>
    </div>
  );
}

export default MigrantForm;
