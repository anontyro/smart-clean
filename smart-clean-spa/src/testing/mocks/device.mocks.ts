import { DeviceModel } from './../../models/database/device.model';

export const MockDevice1: DeviceModel = {
    id: 'device 1',
    deviceType: 'sensor',
    userId: ['1232'],
    locationId: '5432',
    display_name: 'A device',
    created: new Date()
};

export const MockDevice2: DeviceModel = {
    id: 'device 2',
    deviceType: 'controller',
    userId: ['6453'],
    locationId: '123',
    display_name: 'A new item device',
    created: new Date()
};

export const MockDevice3: DeviceModel = {
    id: 'device 3',
    deviceType: 'LED',
    userId: ['7653'],
    locationId: '333',
    display_name: 'An older device',
    created: new Date()
};
