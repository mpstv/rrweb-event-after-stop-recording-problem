import { Component } from "@angular/core";
import { record } from "rrweb";
import { eventWithTime, listenerHandler } from "rrweb/typings/types";

@Component({
  selector: "app-root",
  template: `
    <div class="content">
      <h1>Welcome to {{ title }}!</h1>

      <div>
        <button (click)="startRecord()">Start record</button>
        <button (click)="stopRecord()">Stop record</button>
      </div>

      <p>
        {{ recordingSession ? "record on" : "record off" }}
      </p>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "rrweb-event-after-stop-recording-problem";

  recordingSession: listenerHandler;
  events: eventWithTime[] = [];

  startRecord() {
    console.warn("start recording");
    this.recordingSession = record({
      emit: (event) => {
        this.events.push(event);
        console.log(
          `event added! type: [${event.type}], timestamp: [${event.timestamp}], delay: [${event.delay}]`
        );
      },
    });
  }

  stopRecord() {
    if (this.recordingSession) {
      this.recordingSession();
      this.recordingSession = null;
      this.events = [];
      console.warn("stop recording");
    }
  }
}
