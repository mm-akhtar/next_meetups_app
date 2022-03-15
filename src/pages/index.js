import { MongoClient } from 'mongodb'
// import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'

function Homepage(props) {
  return (
      <MeetupList meetups={props.meetups} />
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  // fetch data from API
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    }
  }
}



export default Homepage