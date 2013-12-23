function NetworkGraph(el) {
    this.addNode = function (id, name, chassis) {
        nodes.push({"id":id, "name":name, "group":1, "chassis":chassis});
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = this.findNode(id);

        while (i < links.length) {
          if ((links[i]['source'] == n)||(links[i]['target'] == n)) { links.splice(i,1); }
          else { i++; }
        }

        nodes.splice(findNodeIndex(id),1);
        update();
    };

    this.removeConnection = function(connection) {
        var i = 0;

        while (i < links.length) {
          if ((links[i]['connection'] == connection) { 
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

    var getNoun = function(type) {
      var default_image = "https://github.com/favicon.ico";
      var switch_image = "assets/icon_22677.png";
      var node_image = "assets/icon_17655.png";
      debugger; 

      switch (type) {
        case: 'switch'
          return switch_image;
          break;
        case: 'node'
          retun node_image; 
          break;
        default:
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
        .gravity(0.05)
        .distance(300)
        .charge(-100)
        .size([w, h]);

    var nodes = force.nodes(),
        links = force.links();

    var update = function () {
        var link = vis.selectAll("line.link").data(links, function(d) { return d.source.id + "-" + d.target.id; });

        link.attr("class", function(data) { 
          return "link " + data.connection.state; 
        });

  
        link.enter().insert("line").attr("class", "link");
        link.exit().remove();

        var node = vis.selectAll("g.node").data(nodes, function(d) { return d.id;});
        var nodeEnter = node.enter().append("g").attr("class", "node").call(force.drag);

        nodeEnter.append("image")
            .attr("xlink:href", function(data) { getNoun(data.chassis.type); } "https://github.com/favicon.ico")
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 64)
            .attr("height", 64);

        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", "5em")
            .text(function(d) {return d.id;});

        node.exit().remove();

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        force.start();
    };

    // Make it all go
    update();
}
