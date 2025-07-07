import { useQuery } from "@tanstack/react-query";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IoOptionsOutline } from "react-icons/io5";
import { GetCountCopyrightService } from "../../services/copyright/copyright";
import { GetCountDesignService } from "../../services/design-patent/design-patent";
import { GetCountInventionService } from "../../services/invention-patent/invention-patent";
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
const menuSummary = [
  "จำแนกตามประเภททรัพย์สินทางปัญญา",
  "จำแนกตามคณะ/หน่วยงาน",
] as const;

type MenuSummary = (typeof menuSummary)[number];
const defaultLabel = [
  "สิทธิบัตรการออกแบบผลิตภัณฑ์",
  "ลิขสิทธิ์",
  "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร",
  "เครื่องหมายการค้า",
];
const SummaryData = () => {
  const currentYear = new Date().getFullYear();
  const [barData, setBarData] = useState<ChartData<"bar">>();
  const [selectMenu, setselectMenu] = useState<MenuSummary>(
    "จำแนกตามประเภททรัพย์สินทางปัญญา",
  );

  // Construct the ISO date string for January 1st of the current year
  const currentYearISO = new Date(
    Date.UTC(currentYear - 1, 11, 31, 17, 0, 0),
  ).toISOString();

  const [requestYear, setRequestYear] = useState<string>(currentYearISO);
  const [buddhistYear, setBuddhistYear] = useState<string>(
    handleChangeToBuddhistYear(new Date(currentYearISO)),
  );

  const copyright = useQuery({
    queryKey: [
      "copyright-count",
      {
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      },
    ],
    queryFn: () =>
      GetCountCopyrightService({
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      }),
  });
  const invention = useQuery({
    queryKey: [
      "invention-count",
      {
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      },
    ],
    queryFn: () =>
      GetCountInventionService({
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      }),
  });

  const design = useQuery({
    queryKey: [
      "design-count",
      {
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      },
    ],
    queryFn: () =>
      GetCountDesignService({
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "faculty" }),
      }),
  });

  const trademark = useQuery({
    queryKey: [
      "trademark-count",
      {
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "career" }),
      },
    ],
    queryFn: () =>
      GetCountTrademarkService({
        requestYear: requestYear,
        ...(selectMenu === "จำแนกตามคณะ/หน่วยงาน" && { group: "career" }),
      }),
  });

  useEffect(() => {
    if (selectMenu === "จำแนกตามประเภททรัพย์สินทางปัญญา") {
      setBarData(() => {
        return {
          labels: defaultLabel,
          datasets: [
            {
              label: "จำนวนคำข้อทั้งหมด",
              data: [
                design.data?.count ?? 0,
                copyright.data?.count ?? 0,
                invention.data?.count ?? 0,
                trademark.data?.count ?? 0,
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
    }
    if (selectMenu === "จำแนกตามคณะ/หน่วยงาน") {
      const listData = [
        ...(invention.data?.groups ?? []),
        ...(design.data?.groups ?? []),
        ...(copyright.data?.groups ?? []),
      ].reduce(
        (acc, item) => {
          const facultyName = item.faculty;
          const count = item._count.faculty;

          if (acc[facultyName]) {
            acc[facultyName]._count.faculty += count;
          } else {
            acc[facultyName] = {
              faculty: facultyName,
              _count: { faculty: count },
            };
          }

          return acc;
        },
        {} as Record<string, { faculty: string; _count: { faculty: number } }>,
      );
      const groupedList = Object.values(listData);

      setBarData(() => {
        return {
          labels: groupedList.map((item) => item.faculty),
          datasets: [
            {
              label: "จำนวนรายชื่อ",
              data: groupedList.map((item) => item._count.faculty),
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
    }
  }, [copyright.data, design.data, invention.data, trademark.data, selectMenu]);

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
                {(trademark?.data?.count ?? 0) +
                  (design?.data?.count ?? 0) +
                  (invention?.data?.count ?? 0) +
                  (copyright.data?.count ?? 0)}
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
          <ul className="flex w-full items-center justify-center gap-4">
            {menuSummary.map((text, index) => {
              return (
                <li
                  onClick={() => setselectMenu(text)}
                  key={index}
                  className={`cursor-pointer rounded-md  ${selectMenu === text ? "bg-main-color text-white" : "text-main-color"} px-5  transition hover:scale-105`}
                >
                  {text}
                </li>
              );
            })}
          </ul>
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
