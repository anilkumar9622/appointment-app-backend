import { CronJob } from "cron";


export async function cronService() {
    
    new CronJob(
        '59 23 * * *', // cronTime
        function () {
            console.log('You will see this message at 11:58 PM IST');
        },
        null,
        true,
        'Asia/Kolkata'
    );
}