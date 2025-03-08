/* Haversine Formula to calculate distance between a school and user */

const getDistance = (userLat: number, userLon: number, schLat: number, schLon: number): number => {
    const R = 6371;
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const dLat = toRadians(schLat - userLat);
    const dLon = toRadians(schLon - userLon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(userLat)) * Math.cos(toRadians(schLat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export default getDistance;
