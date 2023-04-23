export const findId = async request => {
    const { nextUrl: { search } } = request;
    const urlSearchParams = new URLSearchParams(search);
    const { id } = Object.fromEntries(urlSearchParams.entries());
    return id;
}

export const formatDate = (date) => {
    const utcDate = new Date(date);
    const ISTOffset = 330; // IST is UTC+5:30
    const ISTDate = new Date(utcDate.getTime() + (ISTOffset * 60 * 1000));
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const ISTDateString = ISTDate.toLocaleDateString('en-IN', options);
    return ISTDateString;
}