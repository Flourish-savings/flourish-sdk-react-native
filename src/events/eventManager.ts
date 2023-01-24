import { EventRegister } from 'react-native-event-listeners';

export const emitConfig = { GENERIC_EVENT: 'GENERIC_EVENT' };

export const emitEvent = (event: any) => {
  console.log('Event in emitEvent/EventManager', event);
  EventRegister.emit(emitConfig.GENERIC_EVENT, event);
};

export const onEventReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    console.log('Event in onEventReceived/EventManager', data);
    eventCallback(data);
  });
};

export default onEventReceived;
