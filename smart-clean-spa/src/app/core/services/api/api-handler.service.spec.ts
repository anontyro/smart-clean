import { ProjectModel, ProjectCompleteModel } from './../../../../models/database/project.model';
import { MockProject1, MockProject2, MockProject3, MockCompleteProject1 } from './../../../../testing/mocks/project.mocks';
import { AuthService } from './../auth/auth.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiHandlerService } from './api-handler.service';
import { GlobalVars } from '../../../../data/globalVars';
import { MockLocation1, MockLocation2, MockLocation3 } from '../../../../testing/mocks/location.mocks';
import { LocationModel } from '../../../../models/database/location.model';
import { MockDevice1, MockDevice2 } from '../../../../testing/mocks/device.mocks';
import { DeviceModel } from '../../../../models/database/device.model';

describe('ApiHandlerService', () => {
  let injector: TestBed;
  let service: ApiHandlerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiHandlerService,
        AuthService
      ]
    });

    injector = getTestBed();
    service = injector.get(ApiHandlerService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of projects', () => {
    const url = GlobalVars.apiUri + GlobalVars.project.get.projectList;
    const mockProjectArr = [MockProject1, MockProject2, MockProject3];

    service.getProjectList().subscribe((response: Array<ProjectModel>) => {
      expect(response[0]._id).toBe(MockProject1._id);
      expect(response[2].pid).toBe(MockProject3.pid);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjectArr);
  });

  it('should return a list of locations', () => {
    const url = GlobalVars.apiUri + GlobalVars.location.get.locationListByUser;
    const mockLocationArr = [MockLocation1, MockLocation2, MockLocation3];

    service.getLocationList().subscribe((response: Array<LocationModel>) => {
      expect(response.length).toBe(3);
      expect(response[1].deviceId).toBe(MockLocation2.deviceId);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocationArr);

  });

  it('should return a list of devices', () => {
    const url = GlobalVars.apiUri + GlobalVars.device.get.deviceListByUser;
    const mockDeviceArr = [MockDevice1, MockDevice2];

    service.getDeviceList().subscribe((response: Array<DeviceModel>) => {
      expect(response.length).toBe(2);
      expect(response[1].id).toBe(MockDevice2.id);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockDeviceArr);

  });

  it('should return complete project object', () => {
    const url = GlobalVars.apiUri + GlobalVars.project.get.completeProject + '/' + MockCompleteProject1._id;
    const mockProject = MockCompleteProject1;

    service.getProjectDetail('784534adcxefw3').subscribe((response: any) => {
      expect(response.locations.id).toBe(MockCompleteProject1.locations.id);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);
  });

  it('should post a new project object', () => {
    const url = GlobalVars.apiUri + GlobalVars.project.post.createProject;
    const mockProject = MockProject1;
    const mockResp = {project: mockProject, message: 'Successfully created new project'};

    service.postNewProject(mockProject).subscribe(response => {
      expect(response.project).toBe(mockProject);
      expect(response.message).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(mockResp);

  });

  it('should post a new location object', () => {
    const url = GlobalVars.apiUri + GlobalVars.location.post.createLocation;
    const mockLocation = MockLocation1;
    const mockResp = {location: mockLocation, message: 'Successfully created a new location'};

    service.postNewLocation(mockLocation).subscribe(response => {
      expect(response.location).toBe(mockLocation);
      expect(response.message).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeTruthy();
    req.flush(mockResp);

  });

  it('should post a new device object', () => {
    const url = GlobalVars.apiUri + GlobalVars.device.post.createDevice;
    const mockDevice = MockDevice1;
    const mockResp = {device: mockDevice, message: 'Successfully created a new device'};

    service.postNewDeviceList(mockDevice).subscribe(response => {
      expect(response.device).toBe(mockDevice);
      expect(response.message.length).toBeGreaterThan(20);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.id).toBe(mockDevice.id);
    req.flush(mockResp);

  });

  it('should update an existing project object', () => {
    const url = GlobalVars.apiUri + GlobalVars.project.put.updateProject;
    const mockProject = MockProject2;
    const mockResp = {project: mockProject, message: 'Successfully Updated a project'};

    service.putProjectUpdate(mockProject).subscribe(response => {
      expect(response.project).toBe(mockProject);
      expect(response.message).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeTruthy();
    req.flush(mockResp);
  });

  it('should update an existing location object', () => {
    const url = GlobalVars.apiUri + GlobalVars.location.put.updateLocation;
    const mockLocation = MockLocation1;
    const mockResp = {location: mockLocation, message: 'Successfully updated location'};

    service.putLocationUpdate(mockLocation).subscribe(response => {
      expect(response.location).toBe(mockLocation);
      expect(response.message).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeTruthy();
    req.flush(mockResp);
  });

  it('should update an existing device object', () => {
    const url = GlobalVars.apiUri + GlobalVars.device.put.updateDevice;
    const mockDevice = MockDevice1;
    const mockResp = {device: mockDevice, message: 'Successfully updated device'};

    service.putDeviceUpdate(mockDevice).subscribe(response => {
      console.log(response);
      expect(response).toBeTruthy();
      expect(response.message).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResp);
  });

});
