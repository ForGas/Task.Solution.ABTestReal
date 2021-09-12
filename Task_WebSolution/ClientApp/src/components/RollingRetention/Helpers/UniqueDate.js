export default function UniqueDate(users) {
    let uniqueDateArr = [];

    const set = new Set(users.map((item) => {
        return item.dateRegistration
    }))

    set.forEach((item) => {
        uniqueDateArr.push({value: item, label: item});
    })

    return uniqueDateArr;
}
