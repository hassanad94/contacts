import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import List from "@mui/material/List";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <div className="main-container grid grid-rows-[1fr_1fr_10fr] h-screen">
        <div className="row grid row-start-2 grid-cols-4 items-center">
          <div className="back-container">
            <div className="button justify-center flex back">
              <Image
                src="/img/back-icon.png"
                width={20}
                height={20}
                alt="back icon"
              />
            </div>
          </div>
          <div className="col-start-2 col-end-4 text-center">
            <h1 className="">Contacts</h1>
            <div className="settings inline-flex items-center">
              <div className="setting button mr-[8px]">
                <Image
                  src="/img/settings-icon.png"
                  width={20}
                  height={20}
                  alt="setting icon"
                />
              </div>
              <div className="profile mr-[8px] button">
                <Image
                  src="/img/profile-icon.png"
                  width={20}
                  height={20}
                  alt="profil icon"
                />
              </div>
              <div className="add-new button button-gradrient w-[120px] rounded-full p-[8px_16px_8px_12px]">
                <span className="text-[18px] mr-[6px] md:mr-[8px]">+</span> Add
                new
              </div>
            </div>
          </div>
        </div>
        <div className="row grid grid-cols-4 row-start-3 pt-[25px]">
          <div className="col-span-2 col-start-2">
            <List>"mapp through contacts"</List>
          </div>
        </div>
      </div>
    </>
  );
}
