function formatDateToIndonesia(date) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}

function formatDateWithWeekdayToIndonesia(date) {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };

      return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}

export {
    formatDateToIndonesia,
    formatDateWithWeekdayToIndonesia,
}
