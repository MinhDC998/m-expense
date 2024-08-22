import { Catch } from '@nestjs/common';
import {
  I18nValidationException,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';

@Catch(I18nValidationException)
export class HttpExceptionFilter extends I18nValidationExceptionFilter {
  constructor() {
    super({
      errorFormatter: (errors) => this.customValidationMessage(errors),
    });
  }

  private customValidationMessage(errors: I18nValidationException['errors']) {
    const messages: Record<string, string> = {};
    for (let i = 0; i < errors.length; i++) {
      const errorKey = Object.keys(errors[i].constraints)[0];
      if (!errorKey) continue;

      const errorMessage = errors[i].constraints[errorKey] || '';
      const fieldName = errors[i].property;
      if (errorMessage) messages[fieldName] = errorMessage;
    }
    return messages;
  }
}
