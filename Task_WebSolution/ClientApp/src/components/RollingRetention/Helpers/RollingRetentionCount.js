export default function RollingRetentionCount(userData, day) {
    let countOfUsersInDay = 0;

        userData.forEach((element) => {
            if (element.y >= day) {
                countOfUsersInDay++;
            }
        })

    return Math.round((countOfUsersInDay / userData.length) * 100)
}
