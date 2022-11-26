import { Metric } from "./metric.entity";

export class DeviceMessage {
    agent: string;
    metrics: Metric;
}