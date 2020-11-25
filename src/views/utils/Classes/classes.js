import { MONTHS, WEEK } from "../../../store/constants";

export class ChatDate {
  constructor(date) {
    const _inputDate = new Date(date);
    this.minutes = _inputDate.getMinutes();
    this.hours = _inputDate.getHours();
    this.date = _inputDate.getDate();
    this.month = MONTHS[_inputDate.getMonth()];
    this.day = WEEK[_inputDate.getDay()];
    if (this.minutes < 10) return `0${this.minutes}`;
    this.isPmOrAM = this.hours >= 12 ? "PM" : "AM";
  }
  getDate() {
    return `${this.hours}:${this.minutes},${this.date} ${this.month}, ${this.day}`;
  }
  getDateWithTime() {
    return `${this.hours}:${this.minutes} ${this.isPmOrAM}, ${this.day}`;
  }
}
