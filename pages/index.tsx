import LogoFile from "@/components/LogoFile";
import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import { PiCertificate } from "react-icons/pi";
import { BsEnvelopePaper } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoBulbOutline } from "react-icons/io5";
import Image from "next/image";
import CardInformation from "@/components/CardInformation";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { LuSearch } from "react-icons/lu";

import Select from 'react-select'

import fakeInformations from "@/data/fakeInformation";
import fakeOptions from "@/data/fakeOptions";
import fakeSearchResult from "@/data/fakeSearchResult";
import { PiUserCircleFill } from "react-icons/pi";


import { GoGoal } from "react-icons/go";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function Home() {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <title>Home</title>
    </Head>
    <HomeLayout>
      <div className="bg-[#F4F8FF] flex h-full w-full flex-col items-center lg:justify-center font-Anuphan text-[var(--primary-blue)] pb-10 ">
        <div className="flex w-full flex-col items-center justify-center  ">
          {/* Header */}
          <div className="w-full md:h-[27rem] lg:h-[34.5rem] bg-[url('/HomeHeader.png')] mb-10 flex flex-col items-center justify-start gap-5 pt-10 md:pt-20">
              <section className="w-[80%] md:w-[75%] flex flex-col md:flex-row-reverse items-start md:items-center justify-between font-semibold ">
                  <div className="w-[10rem] md:w-[15rem] lg:w-[20rem]">
                    <LogoFile/>
                  </div>
                  <div className="text-white ">
                    <h1 className="md:text-2xl text-[var(--secondary-yellow)] uppercase mt-6 md:mt-0">welcome to</h1>
                    <h2 className="text-2xl md:text-4xl lg:text-6xl mt-3 md:mt-6">งานทรัพย์สินทางปัญญา</h2>
                    <h1 className="md:text-2xl mt-3">กองพัฒนาพิเศษ สำนักงานอธิการบดี</h1>
                  </div>
                  
                  
              </section>

              <section className="w-[80%] md:w-[75%] flex items-start mb-8 md:mt-10">
                  <button className=' text-base md:text-xl bg-[var(--secondary-yellow)] px-3 py-1 md:px-4 md:py-2 drop-shadow-md hover:scale-110 duration-300 hover:bg-yellow-500 text-[var(--primary-blue)] font-semibold'>
                  สำรวจ
                </button>
              </section>
              

          </div>
          {/* งานทรัพย์สินทางปัญญา */}
          <div className="">
            <section className=" flex flex-col justify-center items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold">งานทรัพย์สินทางปัญญา</h2>
              <h1 className="md:text-xl py-2 px-4 bg-[var(--secondary-yellow)] font-semibold drop-shadow-md">มหาวิทยาลัยราชภัฏนครราชสีมา</h1>
            </section>

            <section className="mt-8 grid grid-cols-2 gap-4 lg:gap-3 lg:grid-cols-4 lg:grid-rows-1 items-center justify-center font-semibold">
              <button className="group gap-3 md:gap-4 bg-white drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center pt-6 hover:bg-[var(--primary-blue)] duration-300">
                <div className="text-[2.5rem] md:text-[5rem] text-white p-4 md:p-3 bg-[var(--primary-blue)] rounded-full group-hover:bg-white group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                  <PiCertificate/>
                </div>
                <p className="text-[0.85rem] md:text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base group-hover:text-white duration-300">จดทะเบียน <br></br>ทรัพย์สินทางปัญญา</p>
              </button>
              <button className="group gap-3 md:gap-4 bg-white drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center pt-6 hover:bg-[var(--primary-blue)] duration-300">
                <div className="text-[2.5rem] md:text-[4.6rem] text-white p-4 bg-[var(--primary-blue)] rounded-full group-hover:bg-white group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                  <BsEnvelopePaper />
                </div>
                <p className="text-[0.85rem] md:text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base group-hover:text-white duration-300">ข่าวประชาสัมพันธ์</p>
              </button>
              <button className="group gap-3 md:gap-4 bg-white drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center pt-6 hover:bg-[var(--primary-blue)] duration-300">
                <div className="text-[2.5rem] md:text-[5rem] text-white p-4 md:p-3  bg-[var(--primary-blue)] rounded-full group-hover:bg-white group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                  <GiBrain/>
                </div>
                <p className="text-[0.85rem] md:text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base group-hover:text-white duration-300">ความรู้เกี่ยวกับ <br></br>ทรัพย์สินทางปัญญา</p>
              </button>
              <button className="group gap-3 md:gap-4 bg-white drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center pt-6 hover:bg-[var(--primary-blue)] duration-300">
                <div className="text-[2.5rem] md:text-[5rem] text-white p-4 md:p-3  bg-[var(--primary-blue)] rounded-full group-hover:bg-white group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                  <FaUserCircle/>
                </div>
                <p className="text-[0.85rem] md:text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base group-hover:text-white duration-300">เกี่ยวกับเรา</p>
              </button>
            </section>
          </div>

          {/* ตรวจสอบสถานะคำขอ */}
          <div className="w-full flex flex-col items-center mt-12 gap-8">
            <h1 className="w-[85%]  md:text-xl py-2 px-4 bg-[var(--secondary-yellow)] font-semibold drop-shadow-md text-center">
              ตรวจสอบสถานะคำขอ
            </h1>
            <section className="w-[80%] text-xs md:text-base bg-white flex flex-col justify-center items-center border-[1.5px] border-solid border-[#BED6FF] rounded-md p-4 md:p-12 gap-4 md:gap-8 ">
              {/* Select */}
              <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row gap-3 md:gap-10 ">
                <div className="w-full md:w-[50%] flex  items-center gap-3 md:gap-5 "><label className="font-semibold">ประเภท</label>
                    <Select options={fakeOptions} className="w-[15rem]" 
                    placeholder={<div>ทั้งหมด</div>}
                    styles={{
                      control: (base, state) => ({
                          ...base,
                          border: '1.5px solid #BED6FF',
                          padding: '0.25rem 0.3rem',
                          borderRadius: '5px',
                          color: 'blue',
                      }),
                      singleValue:(provided:any) => ({
                        ...provided,
                        color:'#2166DD',
                        fontWeight: '500',
                      }),
                      placeholder: (defaultStyles) => {
                        return {
                            ...defaultStyles,
                            color: '#2166DD',
                            fontWeight: '500',
                        }
                    },
                  }}
                    />
                      
                </div>
                <div className="w-full md:w-[50%] flex items-center gap-5"><label className="font-semibold">ปีงบประมาณ</label>
                <Select options={fakeOptions} className="w-[15rem]" 
                    placeholder={<div>ทั้งหมด</div>}
                    styles={{
                      control: (base, state) => ({
                          ...base,
                          border: '1.5px solid #BED6FF',
                          padding: '0.25rem 0.3rem',
                          borderRadius: '5px',
                          color: 'blue',
                      }),
                      singleValue:(provided:any) => ({
                        ...provided,
                        color:'#2166DD',
                        fontWeight: '500',
                      }),
                      placeholder: (defaultStyles) => {
                        return {
                            ...defaultStyles,
                            color: '#2166DD',
                            fontWeight: '500',
                        }
                    },
                  }}
                    />

                </div>
              </div>
              {/* Search */}
              <div className="w-[90%] md:w-[80%] flex gap-2 md:gap-5 items-center justify-center">
                  <div className="text-base md:text-xl">
                    <LuSearch />
                  </div>
                  
                  <input type="text" placeholder="กรอกชื่อสิ่งประดิษฐ์ เลขที่คำขอ หรือชื่อผู้ประดิษฐ์ผลงาน" 
                  className="w-full pl-2 md:pl-10 p-3 md:p-2 rounded-md border-[1.5px] border-solid border-[#BED6FF] 
                  placeholder:text-[#2166DD] placeholder:font-medium" />
              </div>

              <button className=' text-base md:text-xl bg-[var(--secondary-yellow)] px-3 py-1 md:px-6 md:py-2 drop-shadow-md hover:scale-110 duration-300 hover:bg-yellow-500 text-[var(--primary-blue)] font-semibold'>
                  ค้นหา
                </button>
            </section>
          </div>

          {/* ข้อมูลการค้นหา */}
          <div className="w-full flex flex-col items-center mt-12 gap-8">
            <h1 className="w-[85%]  md:text-xl py-2 px-4 bg-[var(--secondary-yellow)] font-semibold drop-shadow-md text-center">
                ข้อมูลการค้นหา
            </h1> 
            
          
          </div>

          {/* ข่าวประชาสัมพันธ์ */}
        <div className="w-full flex flex-col items-center md:items-start mt-12 gap-8 ">
          <h1 className="z-10 w-[85%] md:text-xl flex items-center justify-center md:justify-start gap-5 py-2 px-4 bg-[var(--secondary-yellow)] font-semibold drop-shadow-md text-center md:text-start md:pl-32">
            <BsEnvelopePaper />
              ข่าวประชาสัมพันธ์
          </h1>

          {/* Desktop */}
          <div className="hidden md:flex md:flex-col w-full -mt-10">
            {fakeInformations.map((information,index) => (
              <CardInformation
              key={index}
              title={information.title}
              date={information.date}
              info={information.info}
              image={information.image}
              index={index}
              />
            ))}
          </div>
          {/* mobile (swiper) */}
          <div className="w-full bg-[var(--primary-blue)] md:hidden ">
          <Swiper slidesPerView={1} pagination={true} modules={[Pagination]} spaceBetween={30}>
              
                  {fakeInformations.map((information,index) => (
                    <SwiperSlide >
                      <CardInformation
                  key={index}
                  title={information.title}
                  date={information.date}
                  info={information.info}
                  image={information.image}
                  index={index}
                  />
                    </SwiperSlide >
                ))}
              
            </Swiper>


          
          </div>
        </div>

        {/* ความรู้เกี่ยวกับงานทรัพย์สินทางปัญญา */}
        <div className="w-[100%] md:w-[85%] mt-12 flex justify-center gap-4 ">
            <div className="hidden md:w-96 md:flex relative">
              <Image alt="pictor of Knowledge" fill className="object-cover" src={"/knowledge.png"}/>
            </div>
            
          <section className="w-full md:w-[600px] flex flex-col items-center gap-10 font-semibold">
                <h2 className="w-[85%] md:w-full flex items-center justify-center gap-2 md:gap-4 text-center md:text-xl py-3 px-4 bg-[var(--secondary-yellow)] font-semibold drop-shadow-md"><IoBulbOutline />ความรู้เกี่ยวกับงานทรัพย์สินทางปัญญา</h2>
              <div className="w-full  bg-[url('/knowledge.png')] md:bg-none py-10 md:py-0 flex justify-center">
                <div className="w-[85%] md:w-full h-full flex flex-col gap-2  text-[0.8rem] md:text-base">
                  <button className="w-full h-full  p-5 text-white bg-[#10316B] bg-opacity-70 hover:bg-opacity-100 duration-300">
                    กฏหมายทรัพย์สินทางปัญญา
                  </button>
                  <button className="w-full h-full  p-5 text-white bg-[#10316B] bg-opacity-70 hover:bg-opacity-100 duration-300">
                    ขั้นตอนการขอความคุ้มครองด้านทรัย์สินทางปัญญา
                  </button>
                  <button className="w-full h-full  p-5 text-white bg-[#10316B] bg-opacity-70 hover:bg-opacity-100 duration-300">
                    ค่าธรรมเนียม
                  </button>
                  <button className="w-full h-full  p-5 text-white bg-[#10316B] bg-opacity-70 hover:bg-opacity-100 duration-300">
                    จำนวนทรัพย์สินทางปัญญา
                  </button>
                </div>
                
                
              </div>

          
          </section>
        </div>
              
              
        {/* เกี่ยวกับเรา */}
        <div className="w-full flex flex-col items-center md:items-start mt-12 gap-8 bg-[var(--primary-blue)] md:bg-[#F4F8FF] py-5 md:py-0">
          <h1 className="z-10 w-[85%] md:text-xl flex items-center justify-center md:justify-start gap-5 py-2 px-4 bg-[var(--secondary-yellow)] 
          font-semibold drop-shadow-md text-center md:text-start md:pl-32">
            <PiUserCircleFill />
              เกี่ยวกับเรา
          </h1>

          {/* Desktop */}
          <div className="-mt-12 hidden md:flex w-full min-h-[50rem] bg-[var(--primary-blue)] text-[white]">
            <div className="w-[35%] min-h-full bg-slate-400 relative">
              <Image alt="pictor of aboutUs" fill className="object-cover" src={"/aboutUs.png"}/>
            </div>
            <section className="flex flex-col gap-9 z-10 my-16">

              {/* วิสัยทัศน์ */}
              <div className="flex items-center gap-5 -ml-9">
                <div className="flex items-center justify-center text-[var(--primary-blue)] text-7xl w-32 h-32 bg-[#DDE9FF] rounded-full border-[var(--primary-blue)] border-solid border-[0.5rem]">
                    <GoGoal />
                </div>
                <div className="w-[70%] flex flex-col gap-3 justify-center">
                  <h1 className="text-2xl font-semibold">วิสัยทัศน์</h1>
                  <p>การบริหารจัดการทรัพย์สินทางปัญญา ให้เกิดการจัดการองค์ความรู้ และประโยชน์ที่ได้รับจากการจัดการทรัพย์สินทางปัญญา</p>
                </div>
              </div>

              {/* พันธกิจ */}
              <div className="flex items-center gap-5 -ml-9">
                <div className="flex items-center justify-center text-[var(--primary-blue)] text-7xl w-32 h-32 bg-[#ACC9FF] rounded-full border-[var(--primary-blue)] border-solid border-[0.5rem]">
                    <LiaClipboardListSolid />
                </div>
                <div className="w-[70%] flex flex-col gap-3 justify-center">
                  <h1 className="text-2xl font-semibold">พันธกิจ</h1>
                  <ol>
                    <li>1. บริการฝึกอบรมความรู้ทางด้านทรัพย์สินทางปัญญา</li>
                    <li>2. บริการให้คำปรึกษาทางด้านทรัพย์สินทางปัญญา แก่ผู้เข้าร่วมโครงการและชุมชนท้องถิ่น</li>
                    <li>3. บริการให้ความช่วยเหลือด้านทรัพย์สินทางปัญญา ในการดำเนินการต่างๆ ที่เกี่ยวข้องกับงานทรัพย์สินทางปัญญา</li>
                    <li>4. สร้างและพัฒนาเครือข่ายความร่วมมือทางด้านทรัพย์สินทางปัญญา</li>
                    <li>5. สนับสนุนวิจัยเพื่อพัฒนาและต่อยอดงานทรัพย์สินทางปัญญาและจดทะเบียนทรัพย์สินทางปัญญา</li>
                  </ol>
                </div>
              </div>

              {/* กลุ่มเป้าหมาย */}
              <div className="flex items-center gap-5 -ml-9">
                <div className="flex items-center justify-center text-[var(--primary-blue)] text-7xl w-32 h-32 bg-[#82ADFF] rounded-full border-[var(--primary-blue)] border-solid border-[0.5rem]">
                  <GrGroup />
                </div>
                <div className="w-[70%] flex flex-col gap-3 justify-center">
                  <h1 className="text-2xl font-semibold">กลุ่มเป้าหมาย</h1>
                  <ol>
                    <li>1. นักศึกษามหาวิทยาลัยราชภัฏนครราชสีมา</li>
                    <li>2. คณาจารย์/นักวิชาการ ที่มีผลงานวิจัย สามารถนำมาพัฒนาต่อยอดได้</li>
                    <li>3. บัณฑิตของมหาวิทยาลัย</li>
                    <li>4. ผู้ประกอบการในพื้นที่การให้บริการของมหาวิทยาลัย</li>
                  </ol>
                </div>
              </div>

              {/* บริการของเรา */}
              <div className="flex items-center gap-5 -ml-9">
                <div className="flex items-center justify-center text-[var(--primary-blue)] text-7xl w-32 h-32 bg-[#5D95FF] rounded-full border-[var(--primary-blue)] border-solid border-[0.5rem]">
                    <FaRegCircleCheck  />
                </div>
                <div className="w-[70%] flex flex-col gap-3 justify-center">
                  <h1 className="text-2xl font-semibold">บริการของเรา</h1>
                  <ol>
                    <li>1. บริการให้คำปรึกษาแนะนำความรู้เกี่ยวกับทรัพย์สินทางปัญญาแก่นักศึกษา คณาจารย์ เจ้าหน้าที่ภายในมหาวิทยาลัยและผู้สนใจทั่วไป</li>
                    <li>2. ช่วยเหลือในการร่างคำขอ ยื่นคำขอและติดตามผลการจดทะเบียนทรัพย์สินทางปัญญา</li>
                    <li>3. ให้ข่าวสารประชาสัมพันธ์และจัดอบรมสัมมนาความรู้เกี่ยวกับทรัพย์สินทางปัญญา</li>
                    <li>4. ส่งเสริมการนำผลงานวิจัยภายในมหาวิทยาลัยไปใช้เชิงพาณิชย์ หรือพัฒนาเป็นผลิตภัณฑ์ผ่านการถ่ายทอดเทคโนโลยี</li>
                    <li>5. ประเมินมูลค่าทรัพย์สินทางปัญญา</li>
                    <li>6. ค้นหาธุรกิจใหม่ที่ใช้องค์ความรู้ด้านทรัพย์สินทางปัญญา</li>
                  </ol>
                </div>
              </div>



            </section>
          </div>


          {/* mobile (swiper) */}
          <div className="w-[85%] min-h-[15rem] bg-[var(--primary-blue)] md:hidden ">
                <Swiper 
                slidesPerView={2}
                spaceBetween={10}
                freeMode={true}
                >
                  <SwiperSlide className="">
                    <div className="w-36 h-48 flex flex-col gap-3 mr-5 items-center justify-center bg-white drop-shadow-sm">
                      <h1 className="text-xl font-semibold">วิสัยทัศน์</h1>
                      <div className="text-5xl">
                        <GoGoal   />
                      </div>
                      <button className="mt-2 py-1 px-2 bg-[var(--secondary-yellow)] font-semibold">เพิ่มเติม</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="">
                    <div className="w-36 h-48 flex flex-col gap-3 mr-5 items-center justify-center bg-white drop-shadow-sm">
                      <h1 className="text-xl font-semibold">พันธกิจ</h1>
                      <div className="text-5xl">
                        <LiaClipboardListSolid   />
                      </div>
                      <button className="mt-2 py-1 px-2 bg-[var(--secondary-yellow)] font-semibold">เพิ่มเติม</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="">
                    <div className="w-36 h-48 flex flex-col gap-3 mr-5 items-center justify-center bg-white drop-shadow-sm">
                      <h1 className="text-xl font-semibold">กลุ่มเป้าหมาย</h1>
                      <div className="text-5xl">
                        <GrGroup    />
                      </div>
                      <button className="mt-2 py-1 px-2 bg-[var(--secondary-yellow)] font-semibold">เพิ่มเติม</button>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="">
                    <div className="w-36 h-48 flex flex-col gap-3 mr-5 items-center justify-center bg-white drop-shadow-sm">
                      <h1 className="text-xl font-semibold">บริการ</h1>
                      <div className="text-5xl">
                        <FaRegCircleCheck/>
                      </div>
                      <button className="mt-2 py-1 px-2 bg-[var(--secondary-yellow)] font-semibold">เพิ่มเติม</button>
                    </div>
                  </SwiperSlide>
                    
                    
                
                </Swiper>
          </div>
        </div>



        </div>
       


        


        

        
      
      </div>
    </HomeLayout>;
    </>

  ) 
}
