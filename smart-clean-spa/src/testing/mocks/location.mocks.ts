import { LocationModel } from './../../models/database/location.model';

export const MockLocation1: LocationModel = {
    id: 'location1',
    display_name: 'up a road',
    userId: ['233', '342', '123'],
    deviceId: ['6634', '2342', '234'],
    created: new Date()
};

export const MockLocation2: LocationModel = {
    id: 'location2',
    display_name: 'next to a building',
    userId: ['235', '456', '876'],
    deviceId: ['234', '752', '44'],
    created: new Date()
};

export const MockLocation3: LocationModel = {
    id: 'location3',
    display_name: 'beside a tree',
    userId: ['876', '234', '934'],
    deviceId: ['1234', '2432', '3453'],
    created: new Date()
};
