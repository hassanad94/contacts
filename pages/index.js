import Head from "next/head";
import Image from "next/image";
import ContactList from "../components/ContactList";
import ModalOpenButton from "../components/ModalOpenButton";
import { useStateContext } from "../context/settingContext";

// I would use something like this, but since im developing locally i can not use API CALLS

// export async function getStaticProps() {
//   const allContactAPIRoute = "http://localhost:3000/api/contacts/getAll";

//   const contactList = await (
//     await fetch(allContactAPIRoute, { method: "POST" })
//   ).json();

//   return {
//     props: {
//       contactList,
//     },
//     // - At most once every 60 seconds
//     revalidate: 60, // In seconds
//   };
// }

export default function Home() {
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
          <div className="button justify-end pr-[10%] items-center flex back">
            <Image
              src="/img/back-icon.png"
              width={20}
              height={20}
              alt="back icon"
            />
          </div>
          <div className="border-x col-start-2 col-end-4 text-center h-[100%]">
            <div className="max-w-[770px] p-[0_3%] m-[auto] flex flex-col sm:flex-row h-[100%] sm:justify-between items-center justify-center">
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
                <ModalOpenButton
                  modalTitle="Add Contact"
                  add={true}
                  title="Add new"
                />
              </div>
            </div>
          </div>
          <div className="col-start-4 button justify-start p-[10%] items-center flex back ">
            <Image
              width={20}
              height={20}
              src="/img/light.svg"
              alt="switch theme"
            />
          </div>
        </div>
        <div className="row grid grid-cols-[15%_1fr_1fr_15%]  row-start-3">
          <div className="border-x contact-list-container col-span-2  col-start-2 justify-center flex">
            <ContactList list={contacts} />
          </div>
        </div>
      </div>
    </>
  );
}
