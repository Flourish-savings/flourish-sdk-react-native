export type PageName =
  | 'onboarding'
  | 'pendingRewards'
  | 'dailyRewards'
  | 'welcomeMission'
  | 'home'
  | 'help'
  | 'missions'
  | 'missionDetail'
  | 'progress'
  | 'missionHistory'
  | 'voucherHistory'
  | 'activityHistory'
  | 'cashback'
  | 'cashbackCategory'
  | 'wheel'
  | 'wheelGameplay'
  | 'trivia'
  | 'triviaGameplay'
  | 'triviaFinish'
  | 'giftCardHistory'
  | 'giftCard';

export const PAGE_MAPPER: Record<PageName, string> = {
  onboarding: 'ONBOARDING',
  pendingRewards: 'PENDING_REWARDS',
  dailyRewards: 'DAILY_REWARDS',
  welcomeMission: 'WELCOME_MISSION',
  home: 'HOME',
  help: 'HELP',
  missions: 'MISSIONS',
  missionDetail: 'MISSION_DETAIL',
  progress: 'PROGRESS',
  missionHistory: 'MISSION_HISTORY',
  voucherHistory: 'VOUCHER_HISTORY',
  activityHistory: 'ACTIVITY_HISTORY',
  cashback: 'CASHBACK',
  cashbackCategory: 'CASHBACK_CATEGORY',
  wheel: 'WHEEL',
  wheelGameplay: 'WHEEL_GAMEPLAY',
  trivia: 'TRIVIA',
  triviaGameplay: 'TRIVIA_GAMEPLAY',
  triviaFinish: 'TRIVIA_FINISH',
  giftCardHistory: 'GIFT_CARD_HISTORY',
  giftCard: 'GIFT_CARD',
};

/**
 * @param pageName
 * @returns
 */
export const mapPageName = (pageName?: PageName): string | undefined => {
  if (!pageName) return undefined;
  return PAGE_MAPPER[pageName];
};
