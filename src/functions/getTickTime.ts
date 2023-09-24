import { level } from '../components/infoComponents/level'

function getTickTime(){
    const mysteryNumber = 1.1;
    const minimum = 100;
    return minimum + 400 ** ((100 - level.current * mysteryNumber) / 100)
}

export { getTickTime }