import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () =>{
    const router = useRouter();
    const  addMeetupHandeler = async(enteredData) =>{
        console.log(enteredData);
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.json();

        console.log(data);
        router.push('/');
    };

    return <NewMeetupForm onAddMeetup={addMeetupHandeler} />
};

export default NewMeetupPage;