export interface DeltaPacket {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}