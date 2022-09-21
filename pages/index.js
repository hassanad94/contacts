import Head from "next/head";
import Image from "next/image";
import ContactList from "../components/ContactList";

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
    revalidate: 1, // In seconds
  };
}

export default function Home({ contactList }) {
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
          <div className="col-span-3 col-start-1 justify-center flex sm:col-span-2 sm:col-start-2">
            <ContactList list={contactList} />
          </div>
        </div>
      </div>
    </>
  );
}
