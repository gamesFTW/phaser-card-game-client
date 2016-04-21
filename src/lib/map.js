/**
 * 
 * @param {Number} w
 * @param {Number} h
 * @param {{x: Number, y:Number}} center
 * @param {Number} radius
 * @returns {{x: Number, y:Number}[]}
 */
exports.findCellsInRadius = (w, h, center, radius) => {
    let cellsInRadius = [];
    let { x: centerX, y: centerY} = center;

    _.range(w).forEach((x) => {
        let rangeX = Math.abs(centerX - x);

        rangeX <= radius && _.range(h).forEach((y) => {
            if (!(centerX == x && centerY == y)) {
                let rangeY = Math.abs(centerY - y);

                (rangeY + rangeX) <= radius && cellsInRadius.push({x,y});
            }
        });
    });

    return cellsInRadius;
};