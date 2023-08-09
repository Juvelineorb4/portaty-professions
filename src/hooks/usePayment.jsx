
import React, { useState } from 'react'
import { API } from 'aws-amplify'
const usePayment = () => {

    const onCreatePaymentIntent = async ({ amount, metadata }) => {
        const api = "api-gateway-dev"
        const path = '/paymentIntent';
        const params = {
            headers: {},
            body: {
                amount: amount,
                metadata: metadata 
            }
        };
        try {
            const response = await API.post(api, path, params);
            return response
        } catch (error) {
            return {
                error: error
            }
        }
    }

    return [
        onCreatePaymentIntent
    ]
}

export default usePayment
