import { MongoClient, ObjectId } from 'mongodb'
import React from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'
function MeetupDetals(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
  )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, {_id:1}).toArray()
  client.close()
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({params:{meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    //fethc data
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
    client.close()
    return {
        props: {
            meetupData: {
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                id: selectedMeetup._id.toString()
            }
        }
    }
}

export default MeetupDetals