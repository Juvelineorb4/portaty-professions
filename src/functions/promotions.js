import { API, Auth } from 'aws-amplify'
import { createPromotionViews } from '@/graphql/CustomMutations/Promotions'
import { listPromotionViews } from '@/graphql/CustomQueries/Promotions'
export const savePromotionView = async (userID, promotionID) => {
    try {
        // verificar si existe ya un registro de vista 
        const isView = await API.graphql({
            query: listPromotionViews,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
                filter: {
                    and: [
                        { "userID": { eq: userID } },
                        { "promotionID": { eq: promotionID } }
                    ]
                }
            }
        })

        if (isView?.data?.listPromotionViews?.items.length === 0) {
            // guardar vista del usuario
            const result = await API.graphql({
                query: createPromotionViews,
                authMode: "AMAZON_COGNITO_USER_POOLS",
                variables: {
                    input: {
                        userID, promotionID
                    }
                }
            })
            console.log("SE GUARDAR LA VISTA DE PROMOCION: ", result)
        } else {
            console.log("ya lo vio")
        }

    } catch (error) {
        console.log("error al guardar vista de promocion", error)
    }
}