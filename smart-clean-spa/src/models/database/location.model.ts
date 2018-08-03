import { DeviceModel } from './device.model';

export class LocationBase {
    public _id?: string;
    public id: string;
    public display_name: string;

}

export class LocationModel extends LocationBase {
    public userId?: Array<string>;
    public deviceId: Array<string>;
    public created?: Date;
}

export class LocationCompleteModel extends LocationBase {
    public devices: Array<DeviceModel>;
}
