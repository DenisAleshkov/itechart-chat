import { MONTHS, WEEK } from "../../../store/constants";

export class ChatDate {
  constructor(date) {
    const _inputDate = new Date(date);
    this.minutes = _inputDate.getMinutes();
    if (this.minutes < 10) {
      this.minutes = `0${this.minutes}`;
    }
    this.hours = _inputDate.getHours();
    this.date = _inputDate.getDate();
    this.month = MONTHS[_inputDate.getMonth()];
    this.day = WEEK[_inputDate.getDay()];
  }
  outputDate() {
    return `${this.hours}:${this.minutes},${this.date} ${this.month}, ${this.day}`;
  }
}
