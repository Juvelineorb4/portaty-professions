import { API, Auth } from 'aws-amplify'
import { updateUsers } from '@/graphql/CustomMutations/functions/Users'
export const saveUserLocation = async (location) => {
    const userAuth = await Auth.currentAuthenticatedUser();
    try {
        await API.graphql({
            query: updateUsers,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
                input: {
                    id: userAuth?.attributes["custom:userTableID"],
                    lastLocation: location
                }
            }
        })
        await Auth.updateUserAttributes(userAuth, {
            "custom:lastLocation": JSON.stringify(location),
        });
        console.log("ULTIMA UBICACION GUARDADAA")
    } catch (error) {
        console.log("ERROR AL GUARDAD LA ULTIMA UBICACION ", error)
    }
}