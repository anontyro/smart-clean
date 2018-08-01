import { ProjectCompleteModel } from './../../models/database/project.model';
import { ProjectModel } from '../../models/database/project.model';
import { MockDevice1, MockDevice2 } from './device.mocks';

export const MockProject1: ProjectModel = {
    _id: '136573432asd',
    userId: ['123', '456', '789'],
    pid: 'A Project',
    display_name: 'This is a project',
    created: new Date(),
    locationId: ['111', '222', '333']
};

export const MockProject2: ProjectModel = {
    _id: '784534adcxefw3',
    userId: ['56', '45', '234'],
    pid: 'A totally different project',
    display_name: 'This is not a project',
    created: new Date(),
    locationId: ['334', '23', '56']
};

export const MockProject3: ProjectModel = {
    _id: '234fdgh7658dfg',
    userId: ['555', '4536', '782349'],
    pid: 'A Different Project',
    display_name: 'This is gold',
    created: new Date(),
    locationId: ['985', '234', '57']
};


export const MockCompleteProject1: any = {
    _id: '784534adcxefw3',
    pid: 'A totally different project',
    display_name: 'This is not a project',
    created: new Date(),
    locations: [{
        id: 'a location',
        display_name: 'The Location',
        devices: [MockDevice1, MockDevice2]
    }]
};
