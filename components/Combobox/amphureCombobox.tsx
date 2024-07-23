import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  Transition,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { FaCheck } from "react-icons/fa";
import { RiExpandUpDownLine } from "react-icons/ri";
import { Amphure, Province, Tambon } from "../../models";
import { GetAllAmphuresByProvinceService } from "../../services/thai-data";

type AmphureComBoxProps = {
  selectAmphure: Amphure | undefined;
  selectProvinceId: number | undefined;
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
function AmphureCombobox({
  selectAmphure,
  arrayId,
  handleDataFromCombobox,
  selectProvinceId,
}: AmphureComBoxProps) {
  const [query, setQuery] = useState("");
  const amphures = useQuery({
    queryKey: ["amphures", { provinceId: selectProvinceId }],
    queryFn: () =>
      GetAllAmphuresByProvinceService({
        provinceId: selectProvinceId as number,
      }),
  });

  if (amphures.isFetching)
    return (
      <div className="flex h-10 w-full animate-pulse items-center justify-center  rounded-lg bg-gray-400 text-white">
        Loading...
      </div>
    );

  const filterAmphures =
    query === ""
      ? amphures.data
      : amphures.data?.filter((amphure: Amphure) => {
          return amphure.name_th.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox
      value={selectAmphure}
      onChange={(value) => {
        if (value === null) return;
        handleDataFromCombobox({
          value: value as unknown as Amphure,
          type: "amphure",
          id: arrayId,
        });
      }}
    >
      <div className="relative flex w-full items-center justify-center  gap-2">
        <div
          className="relative w-full cursor-default overflow-hidden bg-slate-200
       text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
        focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            required
            className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 outline-none "
            displayValue={(amphure: Amphure) => amphure.name_th}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <RiExpandUpDownLine />
          </ComboboxButton>
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
              filterAmphures?.map((amphure) => (
                <Combobox.Option
                  key={amphure.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={amphure}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {amphure.name_th}
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

export default AmphureCombobox;
