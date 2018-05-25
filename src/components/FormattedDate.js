import moment from 'moment';

const defaultFormat = 'MMMM Do YYYY, h:mm:ss a';

const FormattedDate = ({ date, format = defaultFormat }) => moment(date).format(format);

export default FormattedDate
