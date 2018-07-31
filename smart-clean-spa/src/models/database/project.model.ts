import { LocationCompleteModel } from './location.model';

export class BaseProject {
    public _id: string;
    public pid: string;
    public display_name: string;
    public created: Date;

}

export class ProjectModel extends BaseProject {
    public userId: Array<string>;
    public locationId: Array<string>;
}

export class ProjectCompleteModel extends BaseProject {
    public locations: Array<LocationCompleteModel>;
}
