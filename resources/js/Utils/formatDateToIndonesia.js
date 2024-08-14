function formatDateToIndonesia(date) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}

export default formatDateToIndonesia;
