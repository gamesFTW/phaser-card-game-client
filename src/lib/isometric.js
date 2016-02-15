export default {
    pointerToIcometric: function(pointer) {
        var x = pointer.x;
        var y = pointer.y;

        var TILE_WIDTH = 60;
        var TILE_HEIGHT = 30;

        var xOffset = 540;
        var yOffset = -75;

        return {
            x: (x - y) * (TILE_WIDTH / 2) + xOffset,
            y: (x + y) * (TILE_HEIGHT / 2) + yOffset
        }
    }
}
