_.extend(NetworkGraph.prototype, Backbone.Events);

function NetworkGraph(el) {
    var self = this;
    this.addNode = function (id, name, chassis) {
        nodes.push({"id":id, "name":name, "group":1, "chassis":chassis});
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);

        while (i < links.length) {
          if ((links[i]['source'] == n)||(links[i]['target'] == n)) { links.splice(i,1); }
          else { i++; }
        }

        nodes.splice(findNodeIndex(id),1);
        update();
    };

    this.removeLink = function(connection) {
        var i = 0;

        while (i < links.length) {
          if (links[i]['connection'] == connection) { 
            links.splice(i,1); 
          } else { 
            i++; 
          }
        }
    };

    this.addLink = function (source, target, connection) {
        links.push({"source":findNode(source),"target":findNode(target), "connection":connection});
        update();
    };

    this.update = function() {
      update();
    }

    var findNode = function(id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
        }
    };
  
    var findNodeIndex = function(id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return i;
        }
    };

    var getNoun = function(data) {
      var default_image = "https://github.com/favicon.ico";
      var switch_image = "assets/icon_22677.png";
      var node_image = "assets/icon_17655.png";
      var type = data.chassis.type
        
      if (type == 'switch') {
          return switch_image;
      } else if (type == "terminal") {
          return node_image; 
      } else {
          return default_image;
      }
    }

    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
        h = $(el).innerHeight();

    var vis = this.vis = d3.select(el).append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    var force = d3.layout.force()
        .gravity(0)
        .linkDistance(300)
        .size([w, h]);

    var nodes = force.nodes(),
        links = force.links();

    var update = function () {


        var node = vis.selectAll("g.node").data(nodes, function(d) { return d.id;});
        var nodeEnter = node.enter().append("g").attr("class", "node").attr("width", 64).attr("height", 64).call(force.drag);

        nodeEnter.append("circle")
            .attr("fill", "white")
            .attr("x", -32)
            .attr("y", -32)
            .attr("r", 32);

        nodeEnter.append("image")
            .attr("xlink:href", function(data) { return getNoun(data); })
            .attr("x", -32)
            .attr("y", -32)
            .attr("width", 64)
            .attr("height", 64);

        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", "5em")
            .text(function(d) {return d.id;});

        node.exit().remove();

        var link = vis.selectAll("line.link").data(links, function(d) { return d.source.id + "-" + d.target.id; });

        link.attr("class", function(data) { 
          return "link " + data.connection.state; 
        });

  
        link.enter().insert("line").attr("class", "link");
        link.exit().remove();

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        node.on("click", function(data) {
            self.trigger("editChassis", data.chassis);
        });

        force.start();
    };

    // Make it all go
    update();
}
