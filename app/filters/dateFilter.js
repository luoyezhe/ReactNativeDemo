import util from '@app/utils/utils.js';
import moment from 'moment';
const dateFilter = (date, type = 2) => {
    if (util.testTimeStr2(date) && type === 1) {
        return moment(date).format('YYYY/MM/DD');
    }
    if (util.testTimeStr2(date) && type === 2) {
        return moment(date).format('YYYY-MM-DD');
    }
    if (util.testTimeStr2(date) && type === 3) {
        return moment(date).format('YYYY-MM-DD HH:mm');
    }
    if (util.testTimeStr2(date) && type === 4) {
        let dateArr = moment(date)
            .format('YYYY-MM-DD')
            .split('-');
        return dateArr[1] + '-' + dateArr[2];
    }
    if (util.testTimeStr2(date) && type === 5) {
        return moment(date).format('MM-DD');
    }
    return date;
};

export default dateFilter;
