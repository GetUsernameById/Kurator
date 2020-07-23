import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPlaceItem, IDepartment, IEventType, IQuestion} from '../app.models';
import { Observable } from 'rxjs';



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



  getEventTypes() {
    const url = environment.api_url + 'event-types';
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



  getEvents(id) {
    const url = environment.api_url + 'events/' + id;
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


  getQuestions(id) {
    const url = environment.api_url + 'questions/' + id;
    return this.http.get(url, this.httpOptions);
  }

  addQuestion(question: IQuestion) {
    question.blockId = +question.blockId;
    question.minScore = +question.minScore;
    question.maxScore = +question.maxScore;
    question.passScore = +question.passScore;
    question.rankId = +question.rankId;
    const url = environment.api_url + 'questions/add';
    return this.http.post(url, question, {withCredentials: false});
  }

  editQuestion(question: IQuestion) {
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

}
