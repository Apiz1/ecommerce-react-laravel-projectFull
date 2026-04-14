import React, {useContext, useState} from 'react'
import Layout from "./common/Layout";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Checkoutform from './Checkoutform';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from './common/http';
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Checkout = () => {
    

  return (
    <Layout>
    <Elements stripe={stripePromise}>   
        <Checkoutform/>
    </Elements>
    </Layout>
  )
}

export default Checkout