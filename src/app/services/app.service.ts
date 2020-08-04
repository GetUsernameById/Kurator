import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPlaceItem, IDepartment, IEventType, IQuestionPool, IEvent, IQuestionStack, IRank, IPlaceGroup, IAnswer} from '../app.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  items = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor( private http: HttpClient) { }

  getPlaces(page: number = 0, offset: number = 0, sort: string = null, order: string = 'asc') {
    const url = environment.api_url + 'places';
    const sortOrder = sort && order ? `${sort}_${order}` : null ;
    const requestUrl = `${url}?&page=${page}&offset=${offset}&sortOrder=${sortOrder}`;
    return this.http.get(requestUrl, this.httpOptions);
  }

  editPlace(place: IPlaceItem){
    place.groupId = +place.groupId;
    place.codeSm = +place.codeSm;
    place.latitude = +place.latitude;
    place.longitude = +place.longitude;

    const url = environment.api_url + 'places/edit';
    return this.http.post(url, place, {withCredentials: false});
  }

  deletePlace(id){
    const url = environment.api_url + 'places/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }

  addPlace(place: IPlaceItem){
    place.groupId = +place.groupId;
    place.codeSm = +place.codeSm;
    place.latitude = +place.latitude;
    place.longitude = +place.longitude;

    const url = environment.api_url + 'places/add';
    return this.http.post(url, place, {withCredentials: false});
  }



  getDepartments(){
    const url = environment.api_url + 'departments';
    return this.http.get(url, this.httpOptions);
  }
  addDepartment(department: IDepartment) {
    const url = environment.api_url + 'departments/add';
    return this.http.post(url, department, {withCredentials: false});
  }

  editDepartment(department: IDepartment) {
    const url = environment.api_url + 'departments/edit';
    return this.http.post(url, department, {withCredentials: false});
  }

  deleteDepartment(id: number) {
    const url = environment.api_url + 'departments/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }



  getEventTypes(id = null) {
    let url: string;
    if (id !== null && id !== undefined){
      url = environment.api_url + `event-types/${id}`;
    }else{
      url = environment.api_url + 'event-types';
    }
    console.log(url);

    return this.http.get(url, this.httpOptions);
  }

  addEventType(eventType: IEventType) {
    const url = environment.api_url + 'event-types/add';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  editEventType(eventType: IEventType) {
    const url = environment.api_url + 'event-types/edit';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  deleteEventType(id: number) {
    const url = environment.api_url + 'event-types/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }


  getCalendarEventsAll(){
    const url = environment.api_url + 'events';
    return this.http.get(url, this.httpOptions).pipe(
      map((data: IEvent[]) => {
        return data.map((event: IEvent) => {
          return {
            title: event.name,
            start: event.startFact,
            end: event.endFact,
            description: event.name,
            color: 'green',
            editable: false,
            allDay: true
          };
        });
      }),
    );
  }

  getTableEventsAll(){
    const url = environment.api_url + 'events';
    return this.http.get(url, this.httpOptions);
  }

  getEvents(id) {
    const url = environment.api_url + 'events/' + id;
    return this.http.get(url, this.httpOptions);
  }

  getEventsByUserId(id) {
    const url = environment.api_url + 'events-by-user/' + id;
    return this.http.get(url, this.httpOptions).pipe(
      map((data: IEvent[]) => {
        return data.map((event: IEvent) => {
          return {
            title: event.name,
            start: event.startFact,
            end: event.endFact,
            description: event.name,
            color: 'green',
            editable: false,
            allDay: true
          };
        });
      }),
    );
  }

  getUsers() {
    const url = environment.api_url + 'users';
    return this.http.get(url, this.httpOptions);
  }

  /*addEvent(eventType: IEventType) {
    const url = environment.api_url + 'events/add';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  editEvent(eventType: IEventType) {
    const url = environment.api_url + 'events/edit';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  deleteEvent(id: number) {
    const url = environment.api_url + 'events/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }*/

  getQuestions(page: number = 0, offset: number = 0, sort: string = null, order: string = 'asc') {
    const url = environment.api_url + 'questions';
    const sortOrder = sort && order ? `${sort}_${order}` : null ;
    const requestUrl = `${url}?&page=${page}&offset=${offset}&sortOrder=${sortOrder}`;
    return this.http.get(requestUrl, this.httpOptions);
  }

  getQuestionSets(id) {
    const url = environment.api_url + `question-sets/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  addQuestion(question: IQuestionPool) {
    // questionStack.questionPool.blockId = +questionStack.questionPool.blockId;
    question.minScore = +question.minScore;
    question.maxScore = +question.maxScore;
    question.passScore = +question.passScore;
    question.rankId = +question.rankId;
    const url = environment.api_url + 'questions/add';
    return this.http.post(url, question, {withCredentials: false});
  }

  editQuestion(question: IQuestionPool) {
    question.blockId = +question.blockId;
    question.minScore = +question.minScore;
    question.maxScore = +question.maxScore;
    question.passScore = +question.passScore;
    question.rankId = +question.rankId;
    const url = environment.api_url + 'questions/edit';
    return this.http.post(url, question, {withCredentials: false});
  }

  deleteQuestion(id: number) {
    const url = environment.api_url + 'questions/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }

  deleteQuestionSet(id: number) {
    const url = environment.api_url + 'questions/delete-set';
    return this.http.post(url, {id}, {withCredentials: false});
  }


  getQuestionsBlocks() {
    const url = environment.api_url + 'questions-blocks';
    return this.http.get(url, this.httpOptions);
  }

  addQuestionBlock(eventType: IEventType) {
    const url = environment.api_url + 'questions-blocks/add';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  editQuestionBlock(eventType: IEventType) {
    const url = environment.api_url + 'questions-blocks/edit';
    return this.http.post(url, eventType, {withCredentials: false});
  }

  deleteQuestionBlock(id: number) {
    const url = environment.api_url + 'questions-blocks/delete';
    return this.http.post(url, {id}, {withCredentials: false});
  }



  getRanks() {
    const url = environment.api_url + 'ranks';
    return this.http.get(url, this.httpOptions);
  }

  addRank(rank: IRank) {
    rank.weight = +rank.weight;
    const url = environment.api_url + 'ranks/add';
    return this.http.post(url, rank, {withCredentials: false});
  }


  getPlaceGroups() {
    const url = environment.api_url + 'places-groups';
    return this.http.get(url, this.httpOptions);
  }

  addPlaceGroup(placeGroup: IPlaceGroup) {
    placeGroup.departmentId = +placeGroup.departmentId;
    const url = environment.api_url + 'places-groups/add';
    return this.http.post(url, placeGroup, {withCredentials: false});
  }


  getAnswerByQuestionSetId(id: number){
    const url = environment.api_url + `answers/question-id/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  editAnswerByQustion(answer: IAnswer) {
    answer.eventId = +answer.eventId;
    answer.setId = +answer.setId;
    answer.score = +answer.score;
    const url = environment.api_url + 'answers/edit-by-question/';
    return this.http.post(url, answer, {withCredentials: false});
  }

  editAnswerByEvent(answer: IAnswer) {
    answer.eventId = +answer.eventId;
    answer.setId = +answer.setId;
    answer.score = +answer.score;
    const url = environment.api_url + 'answers/edit-by-event/';
    return this.http.post(url, answer, {withCredentials: false});
  }

}
