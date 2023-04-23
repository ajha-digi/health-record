export const findId = async request => {
    const { nextUrl: { search } } = request;
    const urlSearchParams = new URLSearchParams(search);
    const { id } = Object.fromEntries(urlSearchParams.entries());
    return id;
}

export const formatDate = (date) => {
    const utcDate = new Date(date);
    const options = {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      const ISTDateString = utcDate.toLocaleDateString('en-IN', options);
      return ISTDateString;
}
