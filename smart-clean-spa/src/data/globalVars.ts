export const GlobalVars = {
    apiUri : ' https://os034igan7.execute-api.ap-southeast-1.amazonaws.com/production/',
    tokenStorage: 'smartCleanUser',
    auth: {
        login: 'login',
        register: 'register',
    },
    project: {
        get: {
            projectList: 'projects',
            completeProject: 'project',
        },
        post : {
            createProject: 'project'
        },
        put: {
            updateProject: 'project'
        }

    },
    location: {
        get: {
            locationListByUser: 'location/user',
            /** require projectId to be added to find the location */
            locationListByProject: 'location/project/',
        },
        post : {
            createLocation: 'location'
        },
        put: {
            updateLocation: 'location'
        }
    },
    device: {
        get: {
            deviceListByUser: 'device/user',
            /** Require locationId to find the devices at that location */
            deviceListByLocation: 'device/location/',
        },
        post : {
            createDevice: 'device'
        },
        put: {
            updateDevice: 'device'
        }
    }
};
