function add(a, b){
  return a + b;
}

function sum(list){
  return _.reduce(list, add);
}

NetSim.IP = (function(){

  function Address(network, mask, node){
    this.network = Network.init(network, mask);
    this.node = node;
  }

  _.extend(Address.prototype, {

  });

  function Network(str){
    if(str) this.parse(str);
  }

  _.extend(Network, {
    init: function init(opts){
      return _.extend(new Network, opts);
    },

    str_to_bin_network: function(networkStr, mask){
      //for 0 - 3 octets as n
      //  memo += octets[n] * 2 ^ (4 - n) 
      var octets = networkStr.split('.');
      var octets = sum(_.times(4, function(n){
        return parseInt(octets[n] || '0', 10) * Math.pow(2, 4 - n);
      }));

      return network & mask;
    },

    mask_num_to_bin_mask: function(maskStr){
      return ~ Math.pow(2,32 - parseInt(maskStr,10)) - 1;
    }

  });

  _.extend(Network.prototype,{
    parse: function(str){
      var self = this, NETWORK= 0, BITMASK=1;
      var parts = str.split('/');
      this.mask = Network.mask_num_to_bin_mask(parts[BITMASK]);
      this.network = Network.str_to_bin_network(parts[NETWORK], this.mask);

    }
  });


  function RouteEntry(destination, gateway, interface, expiration, metric){
    this.destination = destination;
  }

  _.extend(RouteEntry.prototype, {

  });

  return {
    Address:Address,
    RouteEntry:RouteEntry
  }
})();