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

const onGenericEventReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    eventCallback(data);
  });
};

const onBackButtonReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'BACK_BUTTON_PRESSED') eventCallback(data);
  });
};

const onHomeBackButtonReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'HOME_BACK_BUTTON_PRESSED') eventCallback(data);
  });
};

const onTriviaGameFinishedReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'TRIVIA_GAME_FINISHED') eventCallback(data);
  });
};

const onTriviaClosedReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'TRIVIA_CLOSED') eventCallback(data);
  });
};

const onMissionActionReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'MISSION_ACTION') eventCallback(data);
  });
};

const onReferralCopyReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'REFERRAL_COPY') eventCallback(data);
  });
};

const onHomeBannerActionReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'HOME_BANNER_ACTION') eventCallback(data);
  });
};

const onGiftCardCopyReceived = (eventCallback: (arg: any) => any) => {
  EventRegister.removeAllListeners();
  EventRegister.addEventListener(emitConfig.GENERIC_EVENT, (data) => {
    if (data.eventName === 'GIFT_CARD_COPY') eventCallback(data);
  });
};

export {
  onGenericEventReceived,
  onBackButtonReceived,
  onHomeBackButtonReceived,
  onTriviaGameFinishedReceived,
  onMissionActionReceived,
  onTriviaClosedReceived,
  onReferralCopyReceived,
  onHomeBannerActionReceived,
  onGiftCardCopyReceived,
};
