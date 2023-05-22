import { EventRegister } from 'react-native-event-listeners';
import { sdkStore } from '../index';
import { authenticate } from '../index';

export const emitConfig = { GENERIC_EVENT: 'GENERIC_EVENT' };

export const emitEvent = (event: any) => {
  if (event?.data?.code === 'FE0003') {
    const { customerCode } = sdkStore.getState();
    const userCode: string = customerCode !== undefined ? customerCode : '';
    sdkStore.setState({
      ...sdkStore.getState(),
      isError: true,
    });
    authenticate(userCode);
  }
  EventRegister.emit(emitConfig.GENERIC_EVENT, event);
};

export const onEventReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    eventCallback(data);
  });
};

export default onEventReceived;
