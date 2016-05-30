export default {
    pointerToIcometric: function(pointer) {
        var x = pointer.x;
        var y = pointer.y;

        var TILE_WIDTH = 60;
        var TILE_HEIGHT = 30;

        var xOffset = 680;
        var yOffset = 220;

        return {
            x: (x - y) * (TILE_WIDTH / 2) + xOffset,
            y: (x + y) * (TILE_HEIGHT / 2) + yOffset
        }
    }
}
