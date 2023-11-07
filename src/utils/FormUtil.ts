export class FormUtil {
  public static getDirtyValues = (values: any, initialValues: any) => {
    const editedFields: any = {};
    for (const key in values) {
      if (values[key] !== initialValues[key]) {
        editedFields[key] = values[key];
      }
    }
    return editedFields;
  };
}
