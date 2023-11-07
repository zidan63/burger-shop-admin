export class NotificationUtil {
  private static setStateSuccess: (message: string) => void = () => {};
  private static setStateWarning: (message: string) => void = () => {};
  private static setStateError: (messages: string[]) => void = () => {};

  public static configSuccess(setStateSuccess: (message: string) => void) {
    NotificationUtil.setStateSuccess = setStateSuccess;
  }

  public static configWarning(setStateWarning: (message: string) => void) {
    NotificationUtil.setStateWarning = setStateWarning;
  }

  public static configError(setStateError: (messages: string[]) => void) {
    NotificationUtil.setStateError = setStateError;
  }

  public static success(message: string) {
    NotificationUtil.setStateSuccess(message);
  }

  public static accept() {}
  public static cancel() {}

  public static async warning(message: string) {
    NotificationUtil.setStateWarning(message);
    return new Promise<boolean>((resolve, reject) => {
      NotificationUtil.accept = () => {
        resolve(true);
      };
      NotificationUtil.cancel = () => {
        reject(false);
      };
    });
  }

  public static error(messages: string[]) {
    NotificationUtil.setStateError(messages);
  }
}
