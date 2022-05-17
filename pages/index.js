import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import {Fragment} from 'react';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta name='description' content="Browse huge list" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return  {
//         props: {
//             meetups: DUMMY_DATA
//         }
//     }
// }

export async function getStaticProps() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv://isroiljon:12ab34sd@cluster0.enpgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  connectedClient.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
