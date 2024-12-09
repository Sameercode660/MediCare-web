import React from 'react'
import ImageSlider from '@/components/ImageSlider' 
import AppointmentButton from '@/components/AppointmentButton'
import ServiceCard from '@/components/ServiceCard'

function Page() {
    return (
        <>
            <ImageSlider></ImageSlider>
            <AppointmentButton></AppointmentButton>
            <ServiceCard></ServiceCard>
        </>
    )
}

export default Page
