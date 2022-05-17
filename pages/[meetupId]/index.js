import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";

const DynamicMeetup = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv://isroiljon:12ab34sd@cluster0.enpgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  connectedClient.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const connectedClient = await MongoClient.connect(
    "mongodb+srv://isroiljon:12ab34sd@cluster0.enpgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = connectedClient.db();

  const meetupsCollection = db.collection("meetups");

  const selected = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
          id: selected._id.toString(),
          title: selected.title,
          address: selected.address,
          image: selected.image,
          description: selected.description
      },
    },
  };
}

export default DynamicMeetup;
