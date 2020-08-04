import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent, EventApi, EventSourceInput } from '@fullcalendar/angular'; // useful for typechecking
import { AppService } from 'src/app/services/app.service';
import { IUser, IEvent} from '../../app.models';
declare const $: any;


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
 // @ViewChild('popoverElementRef', { read: ViewContainerRef }) popoverElementRef: ViewContainerRef;

  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = [];
  calendarUsers: IUser[];



  handleDateClick(arg) {

  }


  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUsers().subscribe((users: IUser[]) => {
      this.calendarUsers = users;
    });
    this.appService.getCalendarEventsAll().subscribe(events => {
      console.log(events);
      this.calendarOptions = {
        // headerToolbar: {
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        // },
        selectable: true,
        themeSystem: 'pulse',
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        weekends: false, // откл сб и вс
        // eventsSet: this.handleEvents.bind(this),
        locale: 'ru',
        firstDay: 1,
        buttonText: {
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День'
        },
        contentHeight: 'auto',
        eventDidMount : (info) => {
          info.el.innerHTML = `${info.event.title} <span class="event-tooltip">${info.event.extendedProps.description}</span>`;
        },
        dayMaxEventRows: 3,
        events,
      };
    });
  }

  selectionChange(value){
    const calendarApi = this.calendarComponent.getApi();
    this.appService.getEventsByUserId(value).subscribe((events: EventSourceInput) => {
      calendarApi.removeAllEvents();
      calendarApi.addEventSource(events);
    });
  }


}
