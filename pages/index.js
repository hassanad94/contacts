import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import ContactList from "../components/ContactList";
import ModalOpenButton from "../components/ModalOpenButton";
import { useStateContext } from "../context/settingContext";

export async function getStaticProps() {
  const allContactAPIRoute = "http://localhost:3000/api/contacts/getAll";

  const contactList = await (
    await fetch(allContactAPIRoute, { method: "POST" })
  ).json();

  return {
    props: {
      contactList,
    },
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  };
}

export default function Home({ contactList }) {
  const { contacts } = useStateContext();

  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <div className="main-container grid grid-rows-[13%_13%_auto] m-[auto] h-screen">
        <div className="row row-start-1 grid grid-cols-[15%_1fr_1fr_15%]  items-center">
          <div className="spacer border-x col-span-2 col-start-2 h-[100%]"></div>
        </div>
        <div className="row border-y grid row-start-2 grid-cols-[15%_1fr_1fr_15%]  items-center">
          <div className="button justify-center items-center flex back">
            <Image
              src="/img/back-icon.png"
              width={20}
              height={20}
              alt="back icon"
            />
          </div>
          <div className="border-x flex flex-col pl-[3%] h-[100%] items-center justify-center col-start-2 col-end-4 text-center">
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
              <ModalOpenButton add={true} title="Add new" />
            </div>
          </div>
        </div>
        <div className="row grid grid-cols-[15%_1fr_1fr_15%]  row-start-3">
          <div className="border-x contact-list-container col-span-2 pl-[3%] col-start-2 justify-center flex">
            <ContactList list={contacts.length ? contacts : contactList} />
          </div>
        </div>
      </div>
    </>
  );
}
