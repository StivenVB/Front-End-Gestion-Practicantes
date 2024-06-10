export class GeneralFunctions {
    static formatDate(date: string | Date | undefined): string {
      if (!date) {
        return '';
      }
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    static getTextState(isActive: boolean): string {
      return isActive ? 'Verdadero' : 'Falso';
    }
  }