import { API, Auth } from 'aws-amplify'
import { updateUsers } from '@/graphql/CustomMutations/functions/Users'
export const saveUserLocation = async (userAuth, location) => {
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
    } catch (error) {
        console.log("Error al guardar location ", error)
    }
}