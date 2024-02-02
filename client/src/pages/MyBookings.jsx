import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHospital,
    faUserMd,
    faClock,
    faStethoscope,
    faCalendarAlt,
    faCheckCircle,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { BookingCard } from '../components';

const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const Heading = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const BookingCardContainer = styled.div`
    flex: 0 0 calc(50% - 20px); /* Set card width to 50% of the container minus margin */
    margin-bottom: 20px; /* Margin between rows */
`;

// Loader function
export const loader = async () => {
    try {
        const user = await customFetch.get('/users/current-user');
        const userId = user.data.user._id;
        const { data } = await customFetch.get(`/bookings/user/${userId}`);
        return data;
    } catch (error) {
        // Handle errors here
        console.error('Error loading data:', error);
        return null;
    }
};

const MyBookings = () => {
    const data = useLoaderData();
    console.log(data)

    if (!data) {
        // Handle the case where data is undefined or loading
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Heading>My Bookings</Heading>
            <CardContainer>
                {data.map((booking) => (
                    <BookingCardContainer key={booking._id}>
                        <BookingCard
                            _id = {booking._id}
                            applicantNo={booking.applicantNumber}
                            hospitalName={booking.hospitalId.hospital}
                            doctorLastName={booking.DoctorId.lastName}
                            doctorName={booking.DoctorId.name}
                            schedule={booking.schedule}
                            issueDescription={booking.issueDescription}
                            bookedByName={booking.bookedBy.name}
                            report={booking.report}
                            applicationStatus={booking.applicationStatus}
                            key={booking._id}
                        />
                    </BookingCardContainer>
                ))}
            </CardContainer>
        </Container>
    );
};

export default MyBookings;
