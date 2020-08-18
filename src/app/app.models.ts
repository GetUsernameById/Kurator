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
  color?: string;
  editable?: boolean;
  allDay?: boolean;
}

export interface IEventResponse {
  totalCount: number;
  items: IEvent[];
}

export interface IQuestionPool{
  id: number;
  blockId: number;
  blockName?: string;
  text: string;
  action: string;
  minScore: number;
  maxScore: number;
  passScore: number;
  rankId: number;
  rank: IRank;
  isActive: boolean;
  questionSets?: IQuestionSet[];
}

export interface IQuestionResponse {
  totalCount: number;
  items: IQuestionPool[];
}

export interface IQuestionSet {
  id?: number;
  eventTypeId?: number;
  questionPoolId?: number;
  isActive?: boolean;
}

export interface IQuestionStack {
  questionPool: IQuestionPool;
  questionSets: IQuestionSet[];
}

export interface IQuestionBlock {
  id: number;
  name: string;
  isActive: boolean;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IRank {
  id: number;
  name: string;
  weight: number;
}

export interface IPlaceGroup {
  id: number;
  name: string;
  departmentId: number;
}

export interface IAnswer {
  id: number;
  setId: number;
  eventId: number;
  score: number;
  timestamp: number;
}

export interface IAttachment{
  id: number;
  name: string;
  type: string;
  blob: any;
  url?: string;
}
