import { Combobox, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { FaCheck } from "react-icons/fa";
import { RiExpandUpDownLine } from "react-icons/ri";
import { GetAllTambonByAmphureService } from "../../services/thai-data";
import { Amphure, Province, Tambon } from "../../models";

type TambonComBoxProps = {
  selectAmphureId: number | undefined;
  selectTambon: Tambon | undefined;
  arrayId?: string;
  handleDataFromCombobox: ({
    value,
    type,
    id,
  }: {
    id?: string;
    value: Province | Amphure | Tambon;
    type: "provice" | "amphure" | "tambon";
  }) => void;
};
function TambonCombobox({
  selectAmphureId,
  selectTambon,
  arrayId,
  handleDataFromCombobox,
}: TambonComBoxProps) {
  const [query, setQuery] = useState("");

  const tambons = useQuery({
    queryKey: ["tambons", { amphureId: selectAmphureId }],
    queryFn: () =>
      GetAllTambonByAmphureService({
        amphureId: selectAmphureId as number,
      }),
  });

  if (tambons.isFetching)
    return (
      <div className="flex h-10 w-full animate-pulse items-center justify-center rounded-lg bg-gray-400 text-white">
        Loading...
      </div>
    );

  const filterAmphures =
    query === ""
      ? tambons.data
      : tambons.data?.filter((tambon: Tambon) => {
          return tambon.name_th.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox
      value={selectTambon}
      onChange={(value) => {
        if (value === null) return;
        handleDataFromCombobox({
          value: value as unknown as Tambon,
          type: "tambon",
          id: arrayId,
        });
      }}
    >
      <div className="relative flex w-full items-center justify-center  gap-2">
        <div
          className="relative w-full cursor-default overflow-hidden 
       text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
        focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <Combobox.Input
            required
            className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 outline-none "
            displayValue={(tambon: Tambon) => tambon.name_th}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <RiExpandUpDownLine />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options
            className="absolute top-10  z-50 mt-1 max-h-36  w-full overflow-auto rounded-md bg-white 
      py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            {filterAmphures?.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                ไม่พบข้อมูล
              </div>
            ) : (
              filterAmphures?.map((tambon) => (
                <Combobox.Option
                  key={tambon.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={tambon}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {tambon.name_th}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <FaCheck />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default TambonCombobox;
