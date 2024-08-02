export interface NewFermRequest {
  name: string;
  saveScenario: boolean;
  tgChatId: string;
  sendTgNotify: boolean;
  userId: number;
}

export interface newSensorDataRequest {
  ferma_id: number;
  device_id: number;
  subty: number;
  value: number;
}
