import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { FaSquare } from "react-icons/fa";
import { fakeBarChart, fakePieChart } from "@/data/fakeChart";
import { Bar } from "react-chartjs-2";
import { IoOptionsOutline } from "react-icons/io5";
import Select from "react-select";

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

const PieOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.label}: ${context.raw}%`;
        },
      },
    },
  },
};

export const BarOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "ประเภทคำขอ",
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        callback: function (value: any) {
          return value.length > 4 ? value.substr(0, 4) + "..." : value;
        },
        font: {
          size: 14,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 14,
        },
      },
    },
  },
};

type Data = number[];

const sumData = (data: Data) => {
  return data.reduce((acc, value) => acc + value, 0);
};

const SummaryData = () => {
  const total = sumData(fakeBarChart.datasets[0].data);
  return (
    <div className="flex w-[80%] flex-col items-center gap-5">
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
          <div className="flex w-full items-center  gap-4  md:gap-5 ">
            <Select
              className="w-[80%]"
              placeholder={<div>ทั้งหมด</div>}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "1.5px solid #BED6FF",
                  padding: "0.25rem 0.3rem",
                  borderRadius: "5px",
                  color: "blue",
                }),
                singleValue: (provided: any) => ({
                  ...provided,
                  color: "#2166DD",
                  fontWeight: "500",
                }),
                placeholder: (defaultStyles) => {
                  return {
                    ...defaultStyles,
                    color: "#2166DD",
                    fontWeight: "500",
                  };
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[var(--primary-blue)]">
            ประเภทที่ยื่นจด
          </label>
          <div className="flex w-full items-center  gap-4  md:gap-5 ">
            <Select
              className="w-[80%]"
              placeholder={<div>ทั้งหมด</div>}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "1.5px solid #BED6FF",
                  padding: "0.25rem 0.3rem",
                  borderRadius: "5px",
                  color: "blue",
                }),
                singleValue: (provided: any) => ({
                  ...provided,
                  color: "#2166DD",
                  fontWeight: "500",
                }),
                placeholder: (defaultStyles) => {
                  return {
                    ...defaultStyles,
                    color: "#2166DD",
                    fontWeight: "500",
                  };
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[var(--primary-blue)]">
            สังกัด
          </label>
          <div className="flex w-full items-center  gap-4  md:gap-5 ">
            <Select
              className="w-[80%]"
              placeholder={<div>ทั้งหมด</div>}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "1.5px solid #BED6FF",
                  padding: "0.25rem 0.3rem",
                  borderRadius: "5px",
                  color: "blue",
                }),
                singleValue: (provided: any) => ({
                  ...provided,
                  color: "#2166DD",
                  fontWeight: "500",
                }),
                placeholder: (defaultStyles) => {
                  return {
                    ...defaultStyles,
                    color: "#2166DD",
                    fontWeight: "500",
                  };
                },
              }}
            />
          </div>
        </div>
      </section>
      <div className="mt-10 w-full rounded-md bg-[var(--primary-blue)] p-4 pl-5 font-semibold text-white">
        สังกัด : <span className="text-[var(--secondary-yellow)]">ทั้งหมด</span>
      </div>
      <div className="mt-5 flex w-[90%] flex-col items-center justify-center md:mt-10 md:w-full md:flex-row md:gap-24">
        <div className="flex w-full items-center justify-center md:h-96 md:w-96">
          <Pie data={fakePieChart} options={PieOptions} />
        </div>

        <div className="mt-10 flex w-[90%] flex-col gap-3 text-xs md:mt-0 md:w-60 md:items-center md:text-base">
          {fakePieChart.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-3 md:w-80">
              <FaSquare
                style={{
                  color: fakePieChart.datasets[0].backgroundColor[index],
                }}
              />
              <p>{label}</p>
              <p>{fakePieChart.datasets[0].data[index]}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-center gap-4 md:h-[27rem] md:flex-row">
        <section className="flex flex-row gap-4 md:flex-col">
          <div className="flex h-[9rem] w-[9rem] flex-col items-center justify-center gap-2 rounded-lg bg-[var(--primary-blue)] md:h-[13rem] md:w-[13rem]">
            <h1 className="text-2xl font-semibold text-[var(--secondary-yellow)] ">
              {total}
            </h1>
            <p className="text-xs font-semibold text-white">จำนวนการยื่นคำขอ</p>
          </div>
          <div className="flex h-[9rem] w-[9rem] flex-col items-center justify-center rounded-lg bg-[var(--primary-blue)] md:h-[13rem] md:w-[13rem]">
            <p className="text-xs font-semibold text-white">ปีงบประมาณ</p>
            <h1 className="text-xl font-semibold text-[var(--secondary-yellow)]">
              2565-2567
            </h1>
          </div>
        </section>
        <section className="h-[15rem] w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5 md:h-full">
          <h1 className="my-5 ml-5 text-base font-semibold text-[var(--primary-blue)] md:text-xl">
            ประเภทคำขอ
          </h1>
          <Bar options={BarOptions} data={fakeBarChart} />
        </section>
      </div>
    </div>
  );
};

export default SummaryData;
