export interface Notification {
    type: "error" | "success" | "warning";
    visible: boolean;
    content: string;
}