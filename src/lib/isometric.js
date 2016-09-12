export default {
    pointerToIcometric: function(pointer) {
        var x = pointer.x;
        var y = pointer.y;

        //var TILE_WIDTH = 120;
        //var TILE_HEIGHT = 60;
        //var xOffset = 680;
        //var yOffset = 120;


        var TILE_WIDTH = 100;
        var TILE_HEIGHT = 50;

        var xOffset = 680;
        var yOffset = 150;

        return {
            x: (x - y) * (TILE_WIDTH / 2) + xOffset,
            y: (x + y) * (TILE_HEIGHT / 2) + yOffset
        }
    }
}
