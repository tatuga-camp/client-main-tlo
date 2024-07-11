import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { FaSquare } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { IoOptionsOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { GetCountCopyrightService } from "../../services/copyright/copyright";
import { Calendar } from "primereact/calendar";
import { GetCountInventionService } from "../../services/invention-patent/invention-patent";
import { GetCountDesignService } from "../../services/design-patent/design-patent";
import { GetCountTrademarkService } from "../../services/trademark/trademark";
import {
  handleChangeToBuddhistYear,
  handleChangeToChristianYear,
} from "../../utilities/date";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarOptions: Chart.ChartOptions = {
  responsive: true,
};

type Data = number[];

const SummaryData = () => {
  const currentYear = new Date().getFullYear();
  const [barData, setBarData] = useState<ChartData<"bar">>();

  // Construct the ISO date string for January 1st of the current year
  const currentYearISO = new Date(
    Date.UTC(currentYear - 1, 11, 31, 17, 0, 0),
  ).toISOString();

  const [requestYear, setRequestYear] = useState<string>(currentYearISO);
  const [buddhistYear, setBuddhistYear] = useState<string>(
    handleChangeToBuddhistYear(new Date(currentYearISO)),
  );

  const copyright = useQuery({
    queryKey: ["copyright-count", { requestYear: requestYear }],
    queryFn: () => GetCountCopyrightService({ requestYear: requestYear }),
  });
  const invention = useQuery({
    queryKey: ["invention-count", { requestYear: requestYear }],
    queryFn: () => GetCountInventionService({ requestYear: requestYear }),
  });

  const design = useQuery({
    queryKey: ["design-count", { requestYear: requestYear }],
    queryFn: () => GetCountDesignService({ requestYear: requestYear }),
  });

  const trademark = useQuery({
    queryKey: ["trademark-count", { requestYear: requestYear }],
    queryFn: () => GetCountTrademarkService({ requestYear: requestYear }),
  });

  useEffect(() => {
    setBarData(() => {
      return {
        labels: [
          "สิทธิบัตรการออกแบบผลิตภัณฑ์",
          "ลิขสิทธิ์",
          "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร",
          "เครื่องหมายการค้า",
        ],
        datasets: [
          {
            label: "จำนวนคำข้อทั้งหมด",
            data: [
              design.data ?? 0,
              copyright.data ?? 0,
              invention.data ?? 0,
              trademark.data ?? 0,
            ],
            backgroundColor: [
              "rgba(70, 95, 229, 1)",
              "rgba(229, 238, 249, 1)",
              "rgba(189, 211, 244, 1)",
              "rgba(150, 175, 239, 1)",
            ],
            borderWidth: 0,
          },
        ],
      };
    });
  }, [copyright.data, design.data, invention.data, trademark.data]);

  return (
    <div className="mb-5 flex w-[80%] flex-col items-center gap-5">
      <div className="mt-16 w-full bg-[var(--secondary-yellow)] p-2 text-center text-xl font-semibold text-[var(--primary-blue)] ">
        ทรัพย์สินทางปัญญาที่ยื่นจด
      </div>
      <div className="mt-10 flex w-full items-center gap-3 text-start text-xl font-bold text-[var(--primary-blue)]">
        <span className="text-2xl">
          <IoOptionsOutline />
        </span>
        Filters
      </div>
      <section className="grid w-full grid-cols-1 gap-4 rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-8 md:grid-cols-3 ">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[var(--primary-blue)]">
            ปีงบประมาณที่ยื่นจด
          </label>
          <div className="w-full rounded-lg bg-slate-300 p-1">
            <Calendar
              value={buddhistYear ? new Date(buddhistYear) : null}
              yearNavigator
              yearRange="2560:2580"
              onChange={(e) => {
                if (e.value) {
                  setRequestYear(() =>
                    handleChangeToChristianYear(new Date(e.value as Date)),
                  );
                  setBuddhistYear(() => e.value?.toISOString() as string);
                }
              }}
              className="text- h-10 w-full"
              dateFormat="yy"
              view="year"
              locale="th"
              placeholder="ระบุวันที่ยื่นคำขอ"
            />
          </div>
        </div>
      </section>

      <div className="mt-10 flex w-full flex-col items-center gap-4  md:flex-row">
        <section className="flex flex-row gap-4 md:flex-col">
          <div className="flex h-[9rem] w-[9rem] flex-col items-center justify-center gap-2 rounded-lg bg-[var(--primary-blue)] md:h-[13rem] md:w-[13rem]">
            {trademark.isLoading ||
            design.isLoading ||
            invention.isLoading ||
            copyright.isLoading ? (
              <h1 className="text-2xl font-semibold text-[var(--secondary-yellow)] ">
                loading..
              </h1>
            ) : (
              <h1 className="text-2xl font-semibold text-[var(--secondary-yellow)] ">
                {(trademark?.data ?? 0) +
                  (design?.data ?? 0) +
                  (invention?.data ?? 0) +
                  (copyright.data ?? 0)}
              </h1>
            )}
            <p className="text-xs font-semibold text-white">จำนวนการยื่นคำขอ</p>
          </div>
          <div className="flex h-[9rem] w-[9rem] flex-col items-center justify-center rounded-lg bg-[var(--primary-blue)] md:h-[13rem] md:w-[13rem]">
            <p className="text-xs font-semibold text-white">ปีงบประมาณ</p>
            <h1 className="text-xl font-semibold text-[var(--secondary-yellow)]">
              {buddhistYear ? new Date(buddhistYear).getFullYear() : ""}
            </h1>
          </div>
        </section>
        <div
          className=" h-full w-full rounded-md border-[1px] border-solid
         border-slate-200 bg-white p-5"
        >
          <h1 className="my-5 ml-5 text-base font-semibold text-[var(--primary-blue)] md:text-xl">
            ประเภทคำขอ
          </h1>
          {barData ? (
            <Bar
              className="h-full w-full"
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
              data={barData}
            />
          ) : (
            <h1>loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryData;
