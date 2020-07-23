export interface IPlaceItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  groupId: number;
  codeSm: number;
  code1C: string;
  mail: string;
}

export interface IPlaceItemResponse {
  totalCount: number;
  items: IPlaceItem[];
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IEventType {
  id: number;
  departmentId?: number;
  departmentName: string;
  name: string;
}

export interface IEvent {
  id: number;
  name: string;
  eventTypeId: number;
  userId: number;
  placeId: number;
  startPlan: string;
  startFact: string;
  endFact: string;
  longitudeStart: number;
  latitudeStart: number;
  longitudeEnd: number;
  latitudeEnd: number;
  userName?: string;
  placeName?: string;
}

export interface IQuestion {
  id: number;
  blockId: number;
  text: string;
  action: string;
  minScore: number;
  maxScore: number;
  passScore: number;
  rankId: number;
  isActive: boolean;
}

export interface IQuestionBlock {
  id: number;
  name: string;
  isActive: boolean;
}
