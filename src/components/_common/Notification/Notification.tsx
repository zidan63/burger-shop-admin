import { NotificationError } from "./NotificationError";
import { NotificationSuccess } from "./NotificationSuccess";
import { NotificationWarning } from "./NotificationWarning";

export const Notification = () => {
  return (
    <>
      <NotificationSuccess />
      <NotificationWarning />
      <NotificationError />
    </>
  );
};
