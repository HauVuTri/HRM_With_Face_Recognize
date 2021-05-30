export default {
    data() {
        return {

        }
    },
    props: [

    ],
    methods: {
        /**
         * Lấy giờ phút giây từ date
         * @param {Date} date 
         * @returns 
         */
        getHourMinuteSecond(date){
            
            if (date)
            {
                let tempDate = new Date(date)
                // return null
                return `${tempDate.getHours()}h${tempDate.getMinutes()}m${tempDate.getSeconds()}s`
            }
        },
        /**
         * Chuyển ngày ở datepicker về dạng ngày tháng năm
         */
        formatDateToDayMonthYear(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        convertDateTimeToDayMonthYear(datetimeString) {
            var dateReturn;
            if (datetimeString) {
                dateReturn = new Date(datetimeString);
                let day = dateReturn.getDate();
                let month = dateReturn.getMonth() + 1;
                let year = dateReturn.getFullYear();
                console.log(`${year}/${month}/${day}`);
                return `${day}/${month}/${year}`;

            }
            return null;
        },
        /**
         * Chuyển từ datetime sang dạng iso time format 
         */
        convertDateTimeToISOTime(datetimeString) {
            var dateReturn;
            console.log(1888887)
            if (datetimeString) {
                dateReturn = new Date(datetimeString);
                let day = dateReturn.getDate();
                let month = dateReturn.getMonth() + 1;
                let year = dateReturn.getFullYear();
                console.log(`${year}/${month}/${day}`);
                return `${year}-${month}-${day}`;

            }
            return null;
        },
        /**
         * Chuyển từ dạng iSOTIME sang dạng datetime
         * @param {String} isotime 
         * @returns 
         */
        convertISOTimeToDateTime(isotime) {
            // var dateReturn;
            if (isotime) {
                var date = new Date(isotime)
                return date.toJSON();
            }
            return null;
        },
    }
}