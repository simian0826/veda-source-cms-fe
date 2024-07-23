/**
 * @description: reservation status set
 */
export enum ReservationStatusEnum {
  TO_BE_ASSIGNED = 10,
  TO_BE_RECEIVED = 20,
  CURRENT_DAY_CONTACT_FAILED = 30,
  CUSTOMER_CANCELED = 40,
  OVERDUE_UNPROCESSED = 50,
  RECEIVED = 60,
}

export enum SceneReservationEnum {
  LEADS_TO_FOLLOW_UP = 1,
  REQUEST_FOLLOW_UP = 2,
  CANNOT_CREATE_RESERVATION = 3,
  HISTORICAL_DEFEAT_LEADS = 4,
  NO_CLUE_EXISTS = 5,
}
