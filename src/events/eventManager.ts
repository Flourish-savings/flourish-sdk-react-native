import { EventRegister } from 'react-native-event-listeners';

export const emitConfig = { GENERIC_EVENT: 'GENERIC_EVENT' };

export const emitEvent = (event: any) => {
  EventRegister.emit(emitConfig.GENERIC_EVENT, event);
};

export const onEventReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    eventCallback(data);
  });
};

export default onEventReceived;
