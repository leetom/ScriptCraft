'use strict';
/*global require, Packages*/
var Drone = require('./drone').Drone,
    blocks = require('blocks');
var bedDirections = {
  0:3, // east
  1:0, // south
  2:1, // west
  3:2  // north
};
function bed(){
  this.then(function(){
    var foot = this.setBlock(blocks.bed, bedDirections[this.dir], 0,0,0, false);
    var head = this.setBlock(blocks.bed, bedDirections[this.dir] + 8, 0,0,1, false);
    if (Drone.bountiful){
      var prop = require('blockhelper').property;
      var BedHalf = Packages.net.canarymod.api.world.blocks.properties.BlockPropertyEnums.BedHalf;
      prop(foot)
	.set('facing',this.dir)
	.set('part', BedHalf.FOOT);
      prop(head)
	.set('facing',this.dir)
	.set('part', BedHalf.HEAD);
    }
    foot.update();
    head.update();
  });

}
Drone.extend( bed );
