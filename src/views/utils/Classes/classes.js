import { MONTHS, WEEK } from "../../../store/constants";

export class ChatDate {
  constructor(date) {
    const _inputDate = new Date(date);
    this.minutes = _inputDate.getMinutes();
    this.hours = _inputDate.getHours();
    this.date = _inputDate.getDate();
    this.month = MONTHS[_inputDate.getMonth()];
    this.day = WEEK[_inputDate.getDay()];
    this.isPmOrAM = this.hours >= 12 ? "PM" : "AM";
    if (this.minutes < 10) this.minutes = `0${this.minutes}`;
  }
  getDate() {
    return `${this.hours}:${this.minutes},${this.date} ${this.month}, ${this.day}`;
  }
  getDateWithTime() {
    return `${this.hours}:${this.minutes} ${this.isPmOrAM}, ${this.day}`;
  }
}

export class Message {
  constructor(id, date, sendDate, text) {
    this.id = id;
    this.date = date;
    this.sendDate = sendDate;
    this.text = text;
  }
}

export class FromMessage extends Message {
  constructor(id, type, date, sendDate, text) {
    super(id, date, sendDate, text);
    this.type = type;
  }
}

export class ToMessage extends Message {
  constructor(id, userId, type, date, sendDate, text) {
    super(id, date, sendDate, text);
    this.type = type;
    this.userId = userId;
  }
}

export class User {
  constructor(id, email, login, photoUrl, status) {
    this.id = id;
    this.email = email;
    this.login = login;
    this.status = status;
    this.photoUrl = photoUrl;
  }
}
