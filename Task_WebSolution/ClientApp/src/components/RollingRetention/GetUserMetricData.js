import moment from "moment";

export default function GetUserMetricData(day, users) { 
    let countOfUsersInDay = 0;

    users.forEach((user) => {
        const dateLastActivity = moment(user.dateLastActivity, "D/M/YYYY");
        const dateRegistration = moment(user.dateRegistration, "D/M/YYYY");

        const userLifeActivity= dateLastActivity.diff(dateRegistration, 'days');

        if (userLifeActivity >= day) {
            countOfUsersInDay++;
        }
    })

    return Math.round((countOfUsersInDay / users.length) * 100)
}
