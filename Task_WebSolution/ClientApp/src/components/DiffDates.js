export default function DiffDates(day_one, day_two) {
    if ((day_one - day_two) / (60 * 60 * 24 * 1000) <= 1)
    return 1;
    
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
}
