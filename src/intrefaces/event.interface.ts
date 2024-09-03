import { IMessage } from "./message.interface";

export interface IEvent {
  event: "updateMessageState" | "updateMessageState" | "messageData";
  data?: IMessage[]
}
