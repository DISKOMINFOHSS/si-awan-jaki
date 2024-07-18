function formatDateToIndonesia(date) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('id-ID', options);
    const formattedDate = formatter.format(date);

    return formattedDate;
}

export default formatDateToIndonesia;
